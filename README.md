# SpendWise AI — Frontend

SpendWise AI is a personal finance analyzer. This repository contains the Next.js frontend for authentication, the financial dashboard, transactions, accounts, and categories.

## Tech stack

- Next.js (App Router) and React
- TypeScript
- Plain CSS with reusable, dependency-free UI components

## Prerequisites

- Node.js 20 or newer
- npm 10 or newer
- A running SpendWise API server (optional for viewing the sign-in screens, required for real data)

## Getting started

Clone the repository and install its dependencies:

```bash
git clone <repository-url>
cd SpendWiseAI-FE
npm install
```

Create a local environment file from the example:

```bash
cp .env.example .env.local
```

Set the backend API address in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Create an optimized production build. |
| `npm run start` | Run the production build. |
| `npm run typecheck` | Check TypeScript without emitting files. |
| `npm run lint` | Run ESLint. |

## Project structure

```text
src/
├── app/            # Routes, layouts, and global styles
├── components/     # Shared application shell and UI primitives
├── features/       # Feature-specific views and API modules
├── lib/            # API client, auth storage, and utilities
└── types/          # Shared TypeScript types
```

## Backend integration

All HTTP calls go through `src/lib/api.ts`; components should not call `fetch` directly. The client reads `NEXT_PUBLIC_API_URL`, attaches the stored bearer token to authenticated requests, and normalizes client-facing API failures to a safe generic message.

The current frontend expects these endpoints:

```text
POST /auth/login
POST /auth/register
GET  /analytics/summary
GET  /transactions
GET  /accounts
GET  /categories
```

The login and registration responses should include an `accessToken` and the authenticated user. For example:

```json
{
  "accessToken": "<jwt>",
  "user": { "id": "user-id", "email": "person@example.com" }
}
```

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Yes | Base URL of the SpendWise REST API, without a trailing slash. |
