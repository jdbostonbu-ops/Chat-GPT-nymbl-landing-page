import { notFound } from "next/navigation";
import { getPlan, plans } from "../../plans";

type CheckoutPageProps = {
  params: Promise<{ plan: string }>;
  searchParams: Promise<{ canceled?: string; stripe?: string }>;
};

const stripeMessages: Record<string, string> = {
  "missing-config": "Stripe test mode is not fully wired yet. Add STRIPE_SECRET_KEY and the plan price ID in .env, then try again.",
  "live-key": "This demo refused a live Stripe key. Swap in sk_test_ so nobody accidentally buys the serious version.",
  "stripe-error": "Stripe did not create the demo checkout session. Very dramatic for a test payment, but fixable.",
};

export function generateStaticParams() {
  return plans.map((plan) => ({ plan: plan.slug }));
}

export default async function CheckoutPage({ params, searchParams }: CheckoutPageProps) {
  const { plan: planSlug } = await params;
  const query = await searchParams;
  const plan = getPlan(planSlug);

  if (!plan) {
    notFound();
  }

  const statusMessage = query.stripe ? stripeMessages[query.stripe] : null;
  const canceledMessage = query.canceled
    ? "Checkout canceled. No charge, no shame, no receipt trying to make eye contact."
    : null;

  return (
    <main className="checkout-page">
      <nav className="nav checkout-nav">
        <a className="brand" href="/" aria-label="Nymbl home">
          <span className="bolt">⚡</span>
          <span>Nymbl</span>
        </a>
        <a className="button button-blue" href="/#pricing">
          Back to plans
        </a>
      </nav>

      <section className="checkout-hero section-reveal">
        <div className="checkout-copy">
          <p className="eyebrow cyan-text">Stripe test mode</p>
          <h1>Demo checkout for {plan.name}.</h1>
          <p>
            This is not a real transaction. It is a demo payment, which means your wallet can remain
            dramatically unbothered.
          </p>
        </div>

        <aside className="checkout-panel" aria-label={`${plan.name} checkout summary`}>
          {statusMessage ? <p className="checkout-alert">{statusMessage}</p> : null}
          {canceledMessage ? <p className="checkout-alert">{canceledMessage}</p> : null}

          <p className="eyebrow pink-text">Pretend purchase, real polish</p>
          <h2>{plan.name}</h2>
          <p className="checkout-price">{plan.price}</p>
          <p className="checkout-summary">{plan.summary}</p>
          <p className="checkout-joke">{plan.checkoutNote}</p>

          <ul className="checkout-list">
            {plan.features.map((feature) => (
              <li key={feature}>✓ {feature}</li>
            ))}
          </ul>

          <form action="/api/checkout" method="post" className="checkout-form">
            <input type="hidden" name="plan" value={plan.slug} />
            <button className="button button-yellow full-width" type="submit">
              Open the demo payment portal
            </button>
          </form>

          <small>
            Stripe opens next in test mode. Use Stripe test card details only. Real cards deserve the day off.
          </small>
        </aside>
      </section>
    </main>
  );
}
