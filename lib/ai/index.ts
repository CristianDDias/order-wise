import { createOpenAI } from "@ai-sdk/openai";
import { embed } from "ai";

import { env } from "@/env";

const openai = createOpenAI({
  compatibility: "strict",
  apiKey: env.server.openaiApiKey,
});

export const aiModel = openai("gpt-4o-mini");

export const aiEmbed = async (text: string): Promise<number[]> => {
  const { embedding } = await embed({
    model: openai.embedding("text-embedding-3-small"),
    value: text,
  });
  return embedding;
};
