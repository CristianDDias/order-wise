# Challenge

## Demo

https://challenge-trashlab.vercel.app/

## Installation

```bash
$ pnpm install
```

## Configuration

Create `.env` file and set the environment variables.

```bash
$ cp .env.example .env
```

## Running

```bash
# development mode
$ pnpm dev

# production mode
$ pnpm build
$ pnpm start
```

## Database commands

#### `pnpm db:generate`

Run this command to generate a migration.

#### `pnpm db:migrate`

Run this command to apply the migrations to the database.

#### `pnpm db:seed`

Run this command to seed the database.

## Technical decisions

The project is based on the [Vercel template - Gemini AI Chatbot](https://vercel.com/templates/next.js/gemini-ai-chatbot). The UI/UX is basically the same. I decided to use this template to save time and focus on the main functionalities.

The database is Postgres managed by [Supabase](https://supabase.com/). It uses the `pgvector` extension to store embeddings and perform similarity searches. The ORM is [Drizzle](https://orm.drizzle.team/docs/overview).

The web framework is [Next.js](https://nextjs.org/).

The auth framework is [Better-Auth](https://www.better-auth.com/docs/installation). It's easy to implement and integrate with Next.js. It has a good documentation.

The AI model is OpenAI `gpt-4o-mini`.

The AI framework is [Vercel AI SDK](https://sdk.vercel.ai/docs/introduction). It's easy to implement and integrate with Next.js. It has a good documentation. LangChain/LangGraph is another option, but it's not that easy to implement and integrate with Next.js.
