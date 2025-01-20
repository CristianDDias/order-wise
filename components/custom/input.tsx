"use client";

import React from "react";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

import { ArrowUpIcon, StopIcon } from "./icons";

export function Input({
  input,
  isLoading,
  stop,
  setInput,
  handleSubmit,
}: {
  input: string;
  isLoading: boolean;
  stop: () => void;
  setInput: (value: string) => void;
  handleSubmit: () => void;
}) {
  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  return (
    <div className="relative w-full flex flex-col gap-4">
      <Textarea
        placeholder="Send a message..."
        value={input}
        onChange={handleInput}
        className="min-h-[24px] overflow-hidden resize-none rounded-lg text-base bg-muted border-none"
        rows={3}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            if (isLoading) {
              toast.error("Please wait for the model to finish its response!");
            } else {
              handleSubmit();
            }
          }
        }}
      />
      {isLoading ? (
        <Button
          className="rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5 text-white"
          onClick={(event) => {
            event.preventDefault();
            stop();
          }}
        >
          <StopIcon size={14} />
        </Button>
      ) : (
        <Button
          className="rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5 text-white"
          onClick={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
          disabled={input.length === 0}
        >
          <ArrowUpIcon size={14} />
        </Button>
      )}
    </div>
  );
}
