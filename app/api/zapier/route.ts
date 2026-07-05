import { NextRequest, NextResponse } from "next/server";

type ZapierLeadPayload = {
  name?: string;
  business?: string;
  email?: string;
  phone?: string;
  script?: string;
  requestType?: string;
  date?: string;
  scriptInput?: {
    promotion?: string;
    vibe?: string;
    presenter?: string;
    sellingPoint?: string;
  };
  submittedAt?: string;
};

function cleanInput(value: unknown, maxLength: number): string {
  return String(value || "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLength);
}

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({ ok: false, error: "Zapier webhook URL is not configured" }, { status: 200 });
  }

  const body = (await request.json()) as ZapierLeadPayload;
  const submittedAt = cleanInput(body.submittedAt, 40);
  const date = cleanInput(body.date, 40);
  const payload = {
    name: cleanInput(body.name, 120),
    business: cleanInput(body.business, 140),
    email: cleanInput(body.email, 160),
    phone: cleanInput(body.phone, 40),
    script: cleanInput(body.script, 3000),
    promotion: cleanInput(body.scriptInput?.promotion, 1000),
    vibe: cleanInput(body.scriptInput?.vibe, 80),
    presenter: cleanInput(body.scriptInput?.presenter, 80),
    sellingPoint: cleanInput(body.scriptInput?.sellingPoint, 1000),
    requestType: cleanInput(body.requestType, 80),
    date: date || submittedAt.slice(0, 10),
    submittedAt,
    source: "nymbl-ai-script-builder",
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({ ok: response.ok }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
