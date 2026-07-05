# Prompts Used for the Nymbl Landing Page

## Original User Prompt

You are a software developer who is an expert at building landing pages that catches the audiences attention. Mock me up, no purple, no neon green, no cinematic, bold colored sections, you cannot say view video in sections or configure video because I use zapier, you cannot mention the vendors I use on the landing page, also create a placeholder section where I will add a screenshot of an ai video along with a view button that sends them to a youtube social media page to watch the video.

Nymbl Landing Page — Full Outline

Identity

Name: Nymbl

What it is: broad automation service; AI social video is the showcase, not the whole offer

Audience: time-starved owner-operators — realtors, insurance/solar agents, landscapers, roofers, skydiving/scuba/watersports, handmade jewelry & clothing makers, boutiques, and more

Core pain headline driver: "too busy running the business to market it"

Look & Feel

High-energy, bright, media/AI — NOT calm/spa

NO purple/violet

Palette lean: electric blue, cyan, hot magenta/pink, amber/orange, lime accents

Large + small font contrast

One long scroll page

Words fade in on scroll

Animated gradient signature

Build Stack

Next.js + TypeScript + CSS, deployed on Vercel

Constraints: no any, no var, closures, textContent for user input, lean-but-quality

Page Sections

Nav — Nymbl logo + primary CTA "Book a 15-min call"

Hero — headline "We automate your marketing—so you don't have to." + value-prop subhead + primary CTA + secondary CTA + trust line

Audience ticker — scrolling strip of business types

What we automate — grid: AI social video featured, plus lead capture, team alerts, weekly blogs, booking flow, custom automations, "9,000+ apps"

AI video demo — interactive form generates preview script; capped at generation, not delivered

Pricing — 3 tiers, Stripe Test Mode Payment Links:

Kickstart $50/mo — 5 services

Cruise Control $150/mo — 10 services — Most Popular

Full Throttle $500/mo — 20 services

Testimonials — varied personas

Final CTA — Book a 15-min call

Footer — Nymbl + "demo · test mode"

CTAs

Primary: Cal.com 15-min call

Secondary: demo form

Copy / Claims

Headline sells automation broadly; demo spotlights AI social video

Stats: "distributed across 9,000+ apps" / no vendors named

Never "9,000+ AI video apps"

Value prop written from customer's side

Integrations to wire

Cal.com booking

Stripe Test Mode Payment Links x3

Demo form → script generation using OpenAI

Proof embeds later

Go-Live Checklist

YouTube privacy → public

Stripe test keys to live keys only when truly selling

## Render Prompt

Render a high-energy Nymbl landing page screenshot using electric blue, cyan, hot pink/magenta, amber/yellow, deep ink, and white. No purple, no neon green, no cinematic look. Include nav, hero, audience ticker, automation grid, AI script builder for businesses, AI video screenshot placeholder with YouTube button, pricing cards, testimonials, final CTA, and footer.

## Current Packaging Prompt

Create a zip file with the scaffold and all files, including `.gitignore`, an empty `.env`, `outline.md`, and this `prompts.md`. Include the full landing page outline, selected colors, Cal.com 15-minute booking, Stripe test subscriptions, OpenAI script generation, and the coding/integration constraints.

## Footer Phone Prompt

Add a phone number at the bottom of the landing page. If visitors want to get in contact immediately, tell them to call 333-333-3333 and make it funny.

## Favicon Prompt

Add a favicon that looks like the logo next to the Nymbl wordmark at the top left of the landing page.

## SVG Logo Prompt

Create an SVG logo file with the logo mark and the Nymbl wordmark.

## Webhook Sequence Fix Prompt

The generate 60 second script caused the script to go to the webhook but that is not the sequence. It is supposed to be:

1. User clicks the script button.
2. OpenAI creates the script.
3. User decides if they want to generate a video.
4. User clicks generate video.
5. That script and info goes to the webhook.

When I clicked the script button and then the generate video button, the entries in Sheets went in twice instead of once. It should only go to webhooks when user clicks generate video.

## Coding Constraints Audit Prompt

Coding constraints: no `any`, no `var`, closure-based functions, user input must be `textContent` to prevent XSS. Check the last code you coded to make sure you did not violate coding constraints.

## Script Builder Spacing Prompt

Create some space above: "Enter a few details and generate a 60-second social media script for your next business post. Copy and paste it into your message when you book a call." because it is too close to the above heading, maybe 5-10px of space.

## Script Builder Larger Spacing Prompt

Create a lot of space because you pushed it against the heading.

## Webhook Date Field Prompt

The form that is sent to webhooks is not sending the date when the form was completed. That is another column in Sheets.
