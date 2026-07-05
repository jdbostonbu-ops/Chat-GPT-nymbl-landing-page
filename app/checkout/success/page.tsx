import { getPlan } from "../../plans";

type CheckoutSuccessPageProps = {
  searchParams: Promise<{ plan?: string; session_id?: string }>;
};

export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  const query = await searchParams;
  const plan = query.plan ? getPlan(query.plan) : undefined;
  const bookingUrl = process.env.NEXT_PUBLIC_CAL_LINK ?? process.env.NEXT_PUBLIC_CALCOM_URL ?? "#";

  return (
    <main className="checkout-page">
      <nav className="nav checkout-nav">
        <a className="brand" href="/" aria-label="Nymbl home">
          <span className="bolt">⚡</span>
          <span>Nymbl</span>
        </a>
        <a className="button button-blue" href="/">
          Back home
        </a>
      </nav>

      <section className="checkout-hero checkout-success section-reveal">
        <div className="checkout-copy">
          <p className="eyebrow yellow-text">Demo payment complete</p>
          <h1>The checkout successfully pretended.</h1>
          <p>
            This was not a real transaction. No real money moved, no real subscription should be
            considered active, and your card did not just join a gym.
          </p>
        </div>

        <aside className="checkout-panel">
          <p className="eyebrow pink-text">Next step</p>
          <h2>{plan ? `${plan.name} is queued up.` : "Your demo plan is queued up."}</h2>
          <p className="checkout-summary">
            Book a 15-minute call and paste in the script you generated so the setup conversation starts with useful context.
          </p>
          <div className="checkout-actions">
            <a className="button button-yellow full-width" href={bookingUrl} target="_blank" rel="noreferrer">
              Book the setup call
            </a>
            <a className="button button-blue full-width" href="/#script-builder">
              Back to script builder
            </a>
          </div>
          <small>Test mode note: this success page is for demo flow only, not proof of a real payment.</small>
        </aside>
      </section>
    </main>
  );
}
