<p align="center">
  <img src="public/nymbl-logo.svg" alt="Nymbl Logo" width="300" />
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-0657FF?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="OpenAI" src="https://img.shields.io/badge/OpenAI-07111F?style=for-the-badge&logo=openai&logoColor=white" />
  <img alt="Stripe Test Mode" src="https://img.shields.io/badge/Stripe-Test_Mode-00B8D9?style=for-the-badge&logo=stripe&logoColor=white" />
  <img alt="Cal.com" src="https://img.shields.io/badge/Cal.com-FFB000?style=for-the-badge&logo=calendar&logoColor=07111F" />
  <img alt="Zapier" src="https://img.shields.io/badge/Zapier-Automation-FF5A3D?style=for-the-badge&logo=zapier&logoColor=white" />
</p>

# Nymbl Landing Page

Next.js + TypeScript landing page scaffold for **Nymbl**, a bold automation-focused landing page demonstrating how a business can showcase marketing automation, AI video generation, booking flows, and subscription testing in one polished demo experience.

Nymbl is positioned as an automation business landing page that highlights AI social video as the showcase feature while communicating a broader automation service for busy owner-operators.

## Author

<p>
  <a href="https://github.com/jdbostonbu-ops">
    <img src="https://github.com/jdbostonbu-ops.png" width="80" alt="Author profile image" />
  </a>
</p>

Created by [jdbostonbu-ops](https://github.com/jdbostonbu-ops)

Live link: [https://chat-gpt-nymbl-landing-page.vercel.app/](https://chat-gpt-nymbl-landing-page.vercel.app/)

## Stack

- Next.js
- TypeScript
- CSS
- OpenAI for script generation
- Zapier for automation workflows
- Cal.com for 15-minute booking calls
- Stripe test-mode subscriptions
- Vercel-ready deployment

## What this landing page demonstrates

- Automation business landing page
- AI video generation showcase
- OpenAI-powered script writing
- Cal.com booking CTA
- Stripe payment testing subscriptions
- Zapier-connected automation workflow
- Bright, high-energy brand direction
- No purple
- No lime green
- Bold electric blue, cyan, hot pink, amber, and dark ink palette

## Run locally

```bash
npm install
npm run dev
```

## Environment Variables

Add these values to your `.env` file locally or to your Vercel Project Environment Variables.

```env
NEXT_PUBLIC_CAL_LINK=
NEXT_PUBLIC_YOUTUBE_URL=

OPENAI_API_KEY=

STRIPE_SECRET_KEY=
STRIPE_PRICE_KICKSTART=
STRIPE_PRICE_CRUISE=
STRIPE_PRICE_THROTTLE=

ZAPIER_WEBHOOK_URL=
```

> **Note:** The included `.env` file in this repository is intentionally empty and should never be committed with secrets.

---

## Notes

- The public landing page intentionally does **not** mention any automation vendors.
- Automation workflows are handled behind the scenes with Zapier.
- The primary call-to-action ("Book a 15-minute Call") is connected through `NEXT_PUBLIC_CAL_LINK`.
- Subscription plans use **Stripe Test Mode** Checkout via the `/api/checkout` endpoint.
- AI script generation is powered by **OpenAI** through the `/api/script` endpoint.
- AI video generation is demonstrated as part of the marketing experience while keeping implementation details private.
- The landing page is designed to showcase a modern automation business for busy owner-operators.
- The project is built with **Next.js**, **TypeScript**, and is optimized for deployment on **Vercel**.

---

## ⭐ Star This Project

If you found this project helpful or inspiring, please consider giving it a **⭐ Star** on GitHub. It helps support future development and lets others discover the project.

Thank you for your support!
