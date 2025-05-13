This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Styling with Tailwind CSS

This project uses [Tailwind CSS](https://tailwindcss.com/) for utility-first styling. You can use Tailwind classes in your components. The main CSS file is located at `src/app/globals.css`.

## Running Tests with Vitest

This project uses [Vitest](https://vitest.dev/) for unit and component testing. To run tests, use:

```bash
npm test
```

or

```bash
npm run test
```

Vitest is configured to work with React Testing Library and jsdom for DOM-based tests.

## Running End-to-End Tests with Playwright

This project uses [Playwright](https://playwright.dev/) for end-to-end browser testing. To run E2E tests, use:

```bash
npm run test:e2e
```

Playwright will launch browsers and run tests located in the default `tests/` directory. You can configure Playwright further by editing `playwright.config.ts` if needed.
