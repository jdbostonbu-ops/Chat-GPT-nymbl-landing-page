export type PlanSlug = "kickstart" | "cruise-control" | "full-throttle";

export type MarketingPlan = {
  slug: PlanSlug;
  name: string;
  price: string;
  services: string;
  label?: string;
  href: string;
  stripePriceEnv: string;
  features: string[];
  summary: string;
  checkoutNote: string;
};

export const plans: MarketingPlan[] = [
  {
    slug: "kickstart",
    name: "Kickstart",
    price: "$50/mo",
    services: "5 services",
    href: "/checkout/kickstart",
    stripePriceEnv: "STRIPE_PRICE_KICKSTART",
    features: ["AI social video showcase", "Lead capture", "Team alerts", "Weekly blogs", "Booking flows"],
    summary: "A focused starter system for getting your marketing moving without adding another job to your day.",
    checkoutNote: "Small but mighty. Like a tiny marketing department with better posture.",
  },
  {
    slug: "cruise-control",
    name: "Cruise Control",
    price: "$150/mo",
    services: "10 services",
    label: "Most Popular",
    href: "/checkout/cruise-control",
    stripePriceEnv: "STRIPE_PRICE_CRUISE",
    features: ["AI social video showcase", "Lead capture", "Team alerts", "Weekly blogs", "Booking flows", "Custom automations"],
    summary: "The balanced plan for owners who want consistent content, lead capture, and follow-up running together.",
    checkoutNote: "The marketing autopilot plan. You still steer. It just stops asking you to juggle twelve tabs before lunch.",
  },
  {
    slug: "full-throttle",
    name: "Full Throttle",
    price: "$500/mo",
    services: "20 services",
    href: "/checkout/full-throttle",
    stripePriceEnv: "STRIPE_PRICE_THROTTLE",
    features: ["AI social video showcase", "Lead capture", "Team alerts", "Weekly blogs", "Booking flows", "Custom automations", "Advanced automations"],
    summary: "A larger automation stack for busy businesses that need more campaigns, workflows, and hands-off momentum.",
    checkoutNote: "This is the big button plan. Still demo mode, so the button is wearing a fake mustache.",
  },
];

export function getPlan(slug: string): MarketingPlan | undefined {
  return plans.find((plan) => plan.slug === slug);
}
