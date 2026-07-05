"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { plans } from "./plans";

type ScriptPreview = {
  script: string;
};

type LeadDetails = {
  name: string;
  business: string;
  email: string;
  phone: string;
};

const audiences: string[] = [
  "Realtors",
  "Insurance Agents",
  "Solar Teams",
  "Landscapers",
  "Roofers",
  "Dropzones",
  "Scuba Shops",
  "Watersports",
  "Jewelry Makers",
  "Boutiques",
  "Clothing Makers",
];

const automations: Array<{ title: string; body: string; icon: string }> = [
  {
    title: "AI social video showcase",
    body: "Turn an offer or update into a scroll-stopping social concept.",
    icon: "▶",
  },
  {
    title: "Lead capture",
    body: "Capture leads from multiple channels and keep your pipeline full.",
    icon: "●",
  },
  {
    title: "Team alerts",
    body: "Real-time notifications so nothing slips through the cracks.",
    icon: "!",
  },
  {
    title: "Weekly blogs",
    body: "Fresh, SEO-friendly content written and published for you.",
    icon: "✎",
  },
  {
    title: "Booking flows",
    body: "Automated scheduling and follow-ups that fill your calendar.",
    icon: "□",
  },
  {
    title: "Custom automations",
    body: "Tailored workflows built around how your business actually runs.",
    icon: "⚙",
  },
  {
    title: "9,000+ app connections",
    body: "Powerful automations across the tools your business already uses.",
    icon: "⚡",
  },
];

const fallbackPreview: ScriptPreview = {
  script:
    "Your business is moving fast, and your marketing should keep up. If you have an offer, product, or service people need to hear about, Nymbl helps turn that message into clear social content that gets attention. Share what you are promoting, the vibe you want, who should present it, and the strongest reason someone should care. Then use this script as a strong starting point for your next post. Keep it direct, make the benefit obvious, and close by telling viewers exactly what to do next: book, buy, message you, or learn more.",
};

const defaultYoutubeUrl = "https://youtu.be/5cO9hsgMTUg";

function getPublicUrl(value: string | undefined, fallback: string): string {
  return value && value.length > 0 ? value : fallback;
}

export default function Home() {
  const [preview, setPreview] = useState<ScriptPreview>(fallbackPreview);
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoSending, setIsVideoSending] = useState(false);
  const [videoMessage, setVideoMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const bookingUrl = useMemo(
    () => getPublicUrl(process.env.NEXT_PUBLIC_CAL_LINK ?? process.env.NEXT_PUBLIC_CALCOM_URL, "#"),
    [],
  );

  const youtubeUrl = useMemo(
    () => getPublicUrl(process.env.NEXT_PUBLIC_YOUTUBE_URL, defaultYoutubeUrl),
    [],
  );

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(".section-reveal"));

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  function getFormPayload(form: HTMLFormElement) {
    const formData = new FormData(form);
    const lead: LeadDetails = {
      name: String(formData.get("name") || ""),
      business: String(formData.get("business") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
    };
    const scriptInput = {
      promotion: String(formData.get("promotion") || ""),
      vibe: String(formData.get("vibe") || ""),
      presenter: String(formData.get("presenter") || ""),
      sellingPoint: String(formData.get("sellingPoint") || ""),
    };

    return { lead, scriptInput };
  }

  async function sendZapierLead(
    lead: LeadDetails,
    scriptInput: Record<string, string>,
    script: string,
  ) {
    try {
      const submittedAt = new Date();
      const response = await fetch("/api/zapier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lead,
          script,
          scriptInput,
          requestType: "video_generation",
          date: submittedAt.toLocaleDateString("en-US"),
          submittedAt: submittedAt.toISOString(),
        }),
      });
      const data = (await response.json()) as { ok?: boolean };
      return Boolean(data.ok);
    } catch {
      // The preview should still work if the automation handoff is unavailable.
      return false;
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const { scriptInput } = getFormPayload(event.currentTarget);

    try {
      const response = await fetch("/api/script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scriptInput),
      });

      if (!response.ok) {
        throw new Error("Script preview failed");
      }

      const data = (await response.json()) as ScriptPreview;
      setPreview(data);
    } catch {
      setPreview(fallbackPreview);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVideoRequest() {
    const form = formRef.current;

    if (!form) {
      return;
    }

    if (!form.reportValidity()) {
      return;
    }

    setIsVideoSending(true);
    setVideoMessage("");

    const { lead, scriptInput } = getFormPayload(form);
    const sent = await sendZapierLead(lead, scriptInput, preview.script);

    setVideoMessage(sent ? "Video request sent." : "Video request could not be sent. Please try again.");
    setIsVideoSending(false);
  }

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#top" aria-label="Nymbl home">
          <img src="/nymbl-logo.svg" alt="Nymbl" />
        </a>
        <a className="button button-blue" href={bookingUrl} target="_blank" rel="noreferrer">
          Book a 15-min call
        </a>
      </nav>

      <section id="top" className="hero section-reveal">
        <div className="hero-copy">
          <p className="eyebrow cyan-text">Marketing automation for busy owners</p>
          <h1>We automate your marketing—so you don’t have to.</h1>
          <p className="hero-subhead">
            Nymbl turns offers, updates, and ideas into consistent marketing systems—while you keep running your business.
          </p>
          <div className="action-row">
            <a className="button button-yellow" href={bookingUrl} target="_blank" rel="noreferrer">
              Book a 15-min call
            </a>
            <a className="button button-outline" href="#script-builder">
              Try the AI script builder
            </a>
          </div>
          <p className="trust-line">★★★★★ Trusted by owner-operators like you</p>
        </div>
        <div className="signature-gradient" aria-hidden="true" />
        <div className="hero-light" aria-hidden="true" />
      </section>

      <section className="ticker" aria-label="Business types">
        <div className="ticker-track">
          {[...audiences, ...audiences].map((audience, index) => (
            <span key={`${audience}-${index}`}>{audience}</span>
          ))}
        </div>
      </section>

      <section className="section white-section section-reveal">
        <p className="eyebrow pink-text">What we automate</p>
        <h2>More results. Less busywork.</h2>
        <div className="automation-grid">
          {automations.map((item) => (
            <article className="automation-card" key={item.title}>
              <div className="icon-box">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="script-builder" className="section pink-section section-reveal">
        <div className="builder-grid">
          <div>
            <p className="eyebrow yellow-text">AI script builder for businesses</p>
            <h2>Generate a social script built around your offer.</h2>
            <p className="builder-intro">
              Enter a few details and generate a 60-second social media script for your next business post.
              Copy and paste it into your message when you book a call.
            </p>
          </div>

          <form className="builder-form" ref={formRef} onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                Name
                <input name="name" placeholder="e.g. Jordan Lee" maxLength={120} required />
              </label>
              <label>
                Business
                <input name="business" placeholder="e.g. Lee Realty Group" maxLength={140} required />
              </label>
            </div>
            <div className="form-row">
              <label>
                Email
                <input name="email" type="email" placeholder="e.g. jordan@example.com" maxLength={160} required />
              </label>
              <label>
                Phone number
                <input name="phone" type="tel" placeholder="e.g. 555-123-4567" maxLength={40} required />
              </label>
            </div>
            <label>
              What are you promoting?
              <input name="promotion" placeholder="e.g. Summer home selling special" maxLength={1000} />
            </label>
            <label>
              Vibe
              <input name="vibe" placeholder="e.g. Bold, fun, high energy" maxLength={80} />
            </label>
            <label>
              Presenter style
              <input name="presenter" placeholder="e.g. Friendly expert, on-camera" maxLength={80} />
            </label>
            <label>
              Main selling point
              <input name="sellingPoint" placeholder="e.g. We sell homes 2x faster" maxLength={1000} />
            </label>
            <button className="button button-yellow" type="submit">
              {isLoading ? "Generating..." : "Generate 60-second script"}
            </button>
          </form>

          <div className="preview-column">
            <article className="preview-card" aria-live="polite">
              <p className="eyebrow yellow-text">Your 60-second script</p>
              <p className="script-output">{preview.script}</p>
              <small>Use this as a first draft for a social media post.</small>
            </article>

            <div className="video-request-actions" aria-live="polite">
              <button
                className="button button-yellow video-request-button"
                type="button"
                onClick={handleVideoRequest}
                disabled={isVideoSending || isLoading}
              >
                {isVideoSending ? "Sending..." : "Generate my video"}
              </button>
              {videoMessage ? <small className="video-request-message">{videoMessage}</small> : null}
            </div>
          </div>
        </div>
      </section>

      <section className="section yellow-section section-reveal">
        <div className="video-placeholder-grid">
          <div>
            <p className="eyebrow ink-text">AI video example</p>
            <h2>Here’s what an AI-powered video could look like.</h2>
            <a className="button button-dark video-link" href={youtubeUrl}>
              Watch on YouTube
            </a>
          </div>
          <div className="video-placeholder">
            <div className="video-mockup" aria-label="AI-powered video screenshot preview">
              <div className="video-mockup-topbar">
                <span />
                <span />
                <span />
              </div>
              <div className="video-mockup-frame">
                <div className="video-subject">
                  <span>Offer</span>
                  <strong>Ready for social</strong>
                </div>
                <div className="video-caption">Fresh script. Clear CTA. Built for busy owners.</div>
                <a className="video-play-button" href={youtubeUrl} aria-label="Watch the AI video example on YouTube">
                  ▶
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="section white-section section-reveal">
        <p className="eyebrow pink-text">Simple, transparent pricing</p>
        <h2>Choose the plan that fits your growth.</h2>
        <div className="pricing-grid">
          {plans.map((plan) => (
            <article className={`price-card ${plan.label ? "featured" : ""}`} key={plan.name}>
              {plan.label ? <span className="plan-label">{plan.label}</span> : null}
              <h3>{plan.name}</h3>
              <p className="price">{plan.price}</p>
              <p>{plan.services}</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>
              <a className="button button-blue full-width" href={plan.href}>
                Open demo checkout
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section cloud-section section-reveal">
        <p className="eyebrow blue-text">From owner-operators like you</p>
        <div className="testimonial-grid">
          <blockquote>
            “I finally had marketing moving while I was showing houses.”
            <cite>— Jessica M., Realtor</cite>
          </blockquote>
          <blockquote>
            “We stayed visible without pulling staff away from the dropzone.”
            <cite>— Mark D., Dropzone Owner</cite>
          </blockquote>
          <blockquote>
            “Product drops stopped feeling like a scramble.”
            <cite>— Lisa K., Jewelry Maker</cite>
          </blockquote>
          <blockquote>
            “Nymbl just runs in the background and gets it done.”
            <cite>— Ryan T., Landscaper</cite>
          </blockquote>
          <blockquote>
            “My insurance agency finally had steady posts going out without me writing everything after hours.”
            <cite>— Dana P., Insurance Agent</cite>
          </blockquote>
          <blockquote>
            “New arrivals used to sit quietly. Now customers hear about them before the weekend rush.”
            <cite>— Maya R., Boutique Owner</cite>
          </blockquote>
          <blockquote>
            “We needed to keep jump slots visible without pulling the team away from guests. Nymbl handled the buzz.”
            <cite>— Cole H., Skydiving Business Owner</cite>
          </blockquote>
          <blockquote>
            “I was making the art, but struggling to build the business. The automation helped me get the word out consistently.”
            <cite>— Elena V., Artist</cite>
          </blockquote>
        </div>
      </section>

      <section className="final-cta section-reveal">
        <h2>Your business is moving. Your marketing should move too.</h2>
        <a className="button button-yellow" href={bookingUrl} target="_blank" rel="noreferrer">
          Book a 15-min call
        </a>
      </section>

      <footer className="footer">
        <a className="brand" href="#top">
          <img src="/nymbl-logo.svg" alt="Nymbl" />
        </a>
        <p className="footer-contact">
          Need us immediately? Call <a href="tel:3333333333">333-333-3333</a>. We will answer faster than your marketing to-do list can multiply.
        </p>
        <span>demo · test mode</span>
      </footer>
    </main>
  );
}
