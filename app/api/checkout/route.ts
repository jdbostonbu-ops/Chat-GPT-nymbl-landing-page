import { NextRequest, NextResponse } from "next/server";
import { getPlan, type MarketingPlan } from "../../plans";

type StripeCheckoutSession = {
  url?: string;
};

function redirectToPlan(request: NextRequest, plan: MarketingPlan, reason: string): NextResponse {
  const url = new URL(`/checkout/${plan.slug}`, request.url);
  url.searchParams.set("stripe", reason);
  return NextResponse.redirect(url, { status: 303 });
}

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const planSlug = String(form.get("plan") || "");
  const plan = getPlan(planSlug);

  if (!plan) {
    return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env[plan.stripePriceEnv];

  if (!secretKey || !priceId) {
    return redirectToPlan(request, plan, "missing-config");
  }

  if (!secretKey.startsWith("sk_test_")) {
    return redirectToPlan(request, plan, "live-key");
  }

  const origin = request.nextUrl.origin;
  const params = new URLSearchParams();

  params.append("mode", "subscription");
  params.append("line_items[0][price]", priceId);
  params.append("line_items[0][quantity]", "1");
  params.append("success_url", `${origin}/checkout/success?plan=${plan.slug}&session_id={CHECKOUT_SESSION_ID}`);
  params.append("cancel_url", `${origin}/checkout/${plan.slug}?canceled=1`);
  params.append("client_reference_id", plan.slug);
  params.append("payment_method_types[0]", "card");
  params.append("allow_promotion_codes", "true");
  params.append("metadata[plan]", plan.slug);
  params.append("metadata[demo_payment]", "true");
  params.append("subscription_data[metadata][plan]", plan.slug);
  params.append("subscription_data[metadata][demo_payment]", "true");
  params.append("custom_text[submit][message]", "Demo mode: this is not a real transaction. Real cards can sit this one out.");
  params.append("branding_settings[background_color]", "#06111f");
  params.append("branding_settings[button_color]", "#063bff");
  params.append("branding_settings[border_style]", "rounded");
  params.append("branding_settings[display_name]", "Nymbl Demo Checkout");
  params.append("branding_settings[font_family]", "inter");

  try {
    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      console.error("Stripe checkout session failed", await response.text());
      return redirectToPlan(request, plan, "stripe-error");
    }

    const session = (await response.json()) as StripeCheckoutSession;

    if (!session.url) {
      return redirectToPlan(request, plan, "stripe-error");
    }

    return NextResponse.redirect(session.url, { status: 303 });
  } catch (error) {
    console.error("Stripe checkout session error", error);
    return redirectToPlan(request, plan, "stripe-error");
  }
}
