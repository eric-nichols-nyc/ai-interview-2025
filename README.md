This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Overview

**InterviewAI** is an AI-powered web application for job interview preparation. Users can practice real interview scenarios with an intelligent AI interviewer, receive personalized feedback, and track their progress—all in a modern, interactive interface.

### How It Works

1. **Create Your Profile:** Enter your experience, target role, and interview goals.
2. **Generate Interview Sessions:** The app generates tailored interview questions (technical or behavioral) using AI.
3. **Practice Interviews:** Engage in realistic, voice-based interview sessions with an AI interviewer. The AI adapts to your responses, asks follow-up questions, and simulates a real interview environment.
4. **Get Feedback:** After each answer, receive instant, AI-generated feedback on your response, communication, and areas for improvement.
5. **Track Progress:** Review past interviews, scores, and feedback to monitor your growth over time.

### Key Features

- **AI Interviewer:** Voice-based, adaptive interviewer powered by OpenAI and Vapi.
- **Custom Question Generation:** Interview questions are generated based on your chosen role and preferences.
- **Personalized Feedback:** Each answer is analyzed and critiqued by AI for actionable improvement tips.
- **Modern UI:** Built with Next.js, Tailwind CSS, and a suite of reusable, animated components.
- **Testing:** Robust unit and E2E tests with Vitest and Playwright.

### AI Text-to-Speech Integration

This project leverages [Vapi](https://vapi.ai/) to deliver realistic, real-time voice interactions during interview practice sessions. Vapi's developer-friendly API enables the application to convert AI-generated interview questions and feedback into natural-sounding speech, creating an immersive, conversational experience for users.

By integrating Vapi's text-to-speech (TTS) capabilities, the AI interviewer can:
- **Ask questions out loud** using high-quality, human-like voices.
- **Provide spoken feedback** after each answer, simulating a real interview environment.
- **Support multiple languages and voices** for a customizable user experience.

Vapi's TTS is highly configurable, allowing the project to select different voices, adjust speech parameters, and even bring your own models or API keys for transcription and synthesis. This flexibility ensures the voice AI feels natural and engaging, closely mirroring real-world interview scenarios.

For more details on how Vapi's text-to-speech works and how it can be integrated into developer projects, see:
- [Vapi blog: Text-to-Speech for Builders](https://vapi.ai/blog/text-to-speech-for-builders)
- [Vapi AI Voice Assistant Integration Guide (Mobisoft Infotech)](https://mobisoftinfotech.com/resources/blog/vapi-ai-voice-assistant-integration-guide)

### Authentication with Supabase

This project uses [Supabase Auth](https://supabase.com/docs/guides/auth) to handle user authentication and authorization. Supabase provides a secure, scalable authentication system that supports multiple sign-in methods, including email/password, magic links, and social logins (OAuth).

Key features of Supabase Auth in this project:
- **User Registration & Login:** Users can sign up and log in securely using their email and password or supported social providers.
- **Session Management:** Supabase manages user sessions using secure JSON Web Tokens (JWTs), allowing users to stay logged in across sessions.
- **Authorization:** The app uses Supabase's built-in authorization features to control access to user-specific data and resources.
- **Integration with Database:** Auth data is seamlessly integrated with the Supabase Postgres database, enabling row-level security and fine-grained access control.

Supabase Auth is easy to integrate with modern JavaScript frameworks like Next.js and React, and provides a robust foundation for user management in this application.

For more details, see the [Supabase Auth documentation](https://supabase.com/docs/guides/auth) and [freeCodeCamp's guide to Supabase Auth](https://www.freecodecamp.org/news/set-up-authentication-in-apps-with-supabase/).

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
