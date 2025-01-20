"use client";

import { Message } from "ai";
import { useChat } from "ai/react";

import { Input } from "./input";

import { Message as PreviewMessage } from "@/components/custom/message";
import { useScrollToBottom } from "@/components/custom/use-scroll-to-bottom";

export function Chat({ id, initialMessages }: { id: string; initialMessages: Message[] }) {
  const { messages, handleSubmit, input, setInput, isLoading, stop } = useChat({
    id,
    body: { id },
    initialMessages,
    maxSteps: 10,
    onFinish: () => {
      window.history.replaceState({}, "", `/chat/${id}`);
    },
  });

  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();

  return (
    <div className="flex flex-row justify-center pb-4 md:pb-8 h-dvh bg-background">
      <div className="flex flex-col justify-between items-center gap-4">
        <div ref={messagesContainerRef} className="flex flex-col gap-4 h-full w-dvw items-center overflow-y-scroll">
          {messages.map((message) => (
            <PreviewMessage
              key={message.id}
              role={message.role}
              content={message.content}
              toolInvocations={message.toolInvocations}
            />
          ))}

          <div ref={messagesEndRef} className="shrink-0 min-w-[24px] min-h-[24px]" />
        </div>

        <form className="flex flex-row gap-2 relative items-end w-full md:max-w-[500px] max-w-[calc(100dvw-32px) px-4 md:px-0">
          <Input input={input} isLoading={isLoading} stop={stop} setInput={setInput} handleSubmit={handleSubmit} />
        </form>
      </div>
    </div>
  );
}
