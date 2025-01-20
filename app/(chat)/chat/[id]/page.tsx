import { CoreMessage } from "ai";
import { notFound } from "next/navigation";

import { Chat } from "@/components/custom/chat";
import { getSession } from "@/lib/auth";
import { getChat } from "@/lib/db/queries";
import { convertToUIMessages } from "@/lib/utils";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const chat = await getChat({ id });
  if (!chat) {
    notFound();
  }

  const session = await getSession();
  if (session?.user.id !== chat.userId) {
    return notFound();
  }

  return <Chat id={chat.id} initialMessages={convertToUIMessages(chat.messages as CoreMessage[])} />;
}
