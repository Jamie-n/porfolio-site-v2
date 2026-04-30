# Portfolio Website

Personal portfolio site built with **Next.js (App Router)**, **React**, **TypeScript**, and **Tailwind CSS**.

## Tech stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, Tailwind CSS
- **Language**: TypeScript
- **Tooling**: ESLint, Prettier, Husky + lint-staged

## Project structure (high level)

- **App router**: `src/app/`
- **Main route**: `src/app/[[...slug]]/page.tsx`
  - Uses a catch-all route so `/`, `/about`, `/projects`, etc. render the same single-page layout.
  - Sections are composed from `src/app/sections/` and navigated via the sidebar in `src/app/components/`.
- **Static assets**: `public/` and `src/assets/`

## Getting started

Install dependencies:

```bash
npm install
```

## Getting Started

Run the development server (Turbopack):

```bash
npm run dev
```

Open `http://localhost:3000`.

## Production

Build and run locally:

```bash
npm run build
npm run start
```

## Linting / formatting

```bash
npm run lint
```

This repo uses **Husky + lint-staged**, so formatting/linting may run automatically on commit.

## Deployment

This is a standard Next.js app and can be deployed anywhere Next.js is supported (for example, Vercel). Build output is produced by `npm run build`.

## License

All rights reserved unless otherwise stated.
