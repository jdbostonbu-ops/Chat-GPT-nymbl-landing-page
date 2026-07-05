# Nymbl Landing Page Outline

## Identity

**Name:** Nymbl  
**Category:** Broad marketing automation service  
**Showcase:** AI social video is the featured demo, not the whole offer  
**Primary audience:** Time-starved owner-operators who are too busy running the business to market it.

## Audience List

- Realtors
- Insurance agents
- Solar agents
- Landscapers
- Roofers
- Skydiving/dropzone operators
- Scuba shops
- Watersports operators
- Handmade jewelry makers
- Clothing makers
- Boutiques
- Other local owner-operators

## Core Pain

The owner is already doing the selling, scheduling, servicing, fulfillment, customer support, and operations. Marketing keeps getting pushed aside because the business itself is demanding their attention.

## Hero Message

**Headline:** We automate your marketing—so you don’t have to.  
**Subhead:** Nymbl turns offers, updates, and ideas into consistent marketing systems while you keep running your business.  
**Primary CTA:** Book a 15-min call  
**Secondary CTA:** See the AI clip builder

## Visual Direction

High-energy, bright, media/AI feel. Not calm, spa-like, cinematic, purple, violet, or neon green.

## Approved Color Palette from Mockup

- Electric Blue: `#063BFF`
- Deep Blue: `#031B8E`
- Cyan: `#00D7E8`
- Hot Pink / Magenta: `#FF0A78`
- Amber / Yellow: `#FFC400`
- Dark Ink: `#06111F`
- White: `#FFFFFF`
- Soft Cloud: `#F3F8FF`

## Section Outline

### 1. Navigation

- Nymbl logo
- Primary CTA: Book a 15-min call
- CTA uses Cal.com via `NEXT_PUBLIC_CALCOM_URL`

### 2. Hero

- Big headline with dramatic type scale
- Bright blue media-gradient background
- CTA buttons
- Trust line for owner-operators

### 3. Audience Ticker

Scrolling strip of business types so visitors quickly recognize themselves.

### 4. What We Automate

Feature cards:

- AI social video showcase
- Lead capture
- Team alerts
- Weekly blogs
- Booking flows
- Custom automations
- 9,000+ app connections

Important copy rule: do not say “9,000+ AI video apps.”

### 5. AI Clip Builder Demo

Interactive form fields:

- What are you promoting?
- Vibe
- Presenter style
- Main selling point

Output:

- 60-second social media script

The demo generates a 60-second script draft using OpenAI. It does not deliver final production directly.

### 6. AI Video Screenshot Placeholder

Placeholder area where a screenshot of an AI video can be added later.

Button text:

- Watch on YouTube

Button destination:

- `NEXT_PUBLIC_YOUTUBE_URL`

### 7. Pricing

Stripe test-mode checkout subscriptions:

- Kickstart — $50/mo — 5 services
- Cruise Control — $150/mo — 10 services — Most Popular
- Full Throttle — $500/mo — 20 services

Each plan button opens a themed local demo checkout page, then `/api/checkout` creates a Stripe Checkout subscription session with server-side test credentials:

- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_KICKSTART`
- `STRIPE_PRICE_CRUISE`
- `STRIPE_PRICE_THROTTLE`

### 8. Testimonials

Varied owner-operator personas:

- Realtor
- Dropzone owner
- Jewelry maker
- Landscaper

### 9. Final CTA

Large closing section:

**Your business is moving. Your marketing should move too.**

CTA:

- Book a 15-min call

### 10. Footer

- Nymbl
- demo · test mode

## Stack

- Next.js
- TypeScript
- CSS
- Vercel deployment

## Integrations

- Cal.com booking link
- Stripe Test Mode Payment Links
- OpenAI for script generation
- YouTube social/video destination
- Automation webhook optional behind the scenes

## Coding Constraints

- No `any`
- No `var`
- Prefer typed functions and typed responses
- Use API routes for secret keys
- Never expose `OPENAI_API_KEY` to the client
- Keep vendor names off the public landing page except user-approved visible destinations such as Cal.com/YouTube only where needed by links
- No purple or violet
- No neon green or lime green
- No “view video” section wording
- No “configure video” wording
- Do not mention backend automation vendors on the landing page
