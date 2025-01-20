import { randomUUID } from "crypto";

import { Chat } from "@/components/custom/chat";

export default async function Page() {
  const id = randomUUID();
  return <Chat key={id} id={id} initialMessages={[]} />;
}
