import { getSession } from "@/lib/auth";
import { getChats } from "@/lib/db/queries";

export async function GET() {
  const session = await getSession();
  if (!session?.user) {
    return Response.json("Unauthorized", { status: 401 });
  }
  const chats = await getChats({ userId: session.user.id });
  return Response.json(chats);
}
