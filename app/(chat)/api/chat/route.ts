import { convertToCoreMessages, Message, streamText } from "ai";

import { aiModel } from "@/lib/ai";
import {
  checkOrderStatusTool,
  createOrderTool,
  finalizeOrderTool,
  getOrderTool,
  getProductsTool,
  recommendProductsTool,
  refundOrderTool,
  updateOrderTool,
} from "@/lib/ai/tools";
import { getSession } from "@/lib/auth";
import { deleteChat, getChat, saveChat } from "@/lib/db/queries";

export async function POST(request: Request) {
  const { id, messages }: { id: string; messages: Message[] } = await request.json();

  const session = await getSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const coreMessages = convertToCoreMessages(messages).filter((message) => message.content.length > 0);

  const result = await streamText({
    model: aiModel,
    system: `
You are an expert AI assistant that helps users create orders, update orders, check order status, refund orders, and recommend products.
Call the tools whenever you need to perform an action or get information.
Keep your responses limited to a single sentence.
Respond "Sorry, I don't know how to help with that." if you are unable to answer the question using the information provided by the tools.
Ask follow up questions to nudge user into the optimal flow.
Ask for any details you don't know, like IDs, names, quantities, actions, etc.

This is a guide for using tools: \`createOrder\`, \`updateOrder\`, \`finalizeOrder\`, \`checkOrderStatus\`, \`refundOrder\`, \`getOrder\`, \`recommendProducts\`, and \`getProducts\`.

**When to use \`createOrder\`:**
- When the user wants to create an order and start the order process. Call this tool before any action on an order.

**When to use \`updateOrder\`:**
- When the user wants to update an order by increasing, decreasing, or setting the quantity of order items.

**When to use \`finalizeOrder\`:**
- When the user wants to finalize an order by confirming the order items and selecting the delivery method.

**When to use \`checkOrderStatus\`:**
- When the user wants to check the status of an order.

**When to use \`refundOrder\`:**
- When the user wants to refund an order.

**When to use \`getOrder\`:**
- When the system needs to get details of an order.

**When to use \`recommendProducts\`:**
- When the user wants to get product recommendations based on their preferences.

**When to use \`getProducts\`:**
- When the system needs to get product details like ID, name, price, etc.`,
    messages: coreMessages,
    maxSteps: 10,
    tools: {
      checkOrderStatus: checkOrderStatusTool,
      createOrder: createOrderTool,
      finalizeOrder: finalizeOrderTool,
      getOrder: getOrderTool,
      getProducts: getProductsTool,
      recommendProducts: recommendProductsTool,
      refundOrder: refundOrderTool,
      updateOrder: updateOrderTool,
    },
    onFinish: async ({ responseMessages }) => {
      if (session.user?.id) {
        try {
          await saveChat({
            id,
            userId: session.user.id,
            messages: [...coreMessages, ...responseMessages],
          });
        } catch (error) {
          console.error("Failed to save chat");
        }
      }
    },
    experimental_telemetry: {
      isEnabled: true,
      functionId: "stream-text",
    },
  });

  return result.toDataStreamResponse({});
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  if (!id) {
    return new Response("Not Found", { status: 404 });
  }

  const session = await getSession();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const chat = await getChat({ id });
    if (!chat) {
      return new Response("Not Found", { status: 404 });
    }

    if (chat.userId !== session.user.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    await deleteChat({ id });

    return new Response("Chat deleted", { status: 200 });
  } catch (error) {
    return new Response("An error occurred while processing your request", { status: 500 });
  }
}
