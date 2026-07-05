import { NextRequest, NextResponse } from "next/server";

type ScriptRequest = {
  promotion: string;
  vibe: string;
  presenter: string;
  sellingPoint: string;
};

type ScriptPreview = {
  script: string;
};

type OpenAIResponse = {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
};

function cleanInput(value: unknown, maxLength: number): string {
  return String(value || "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLength);
}

function fallbackScript(input: ScriptRequest): ScriptPreview {
  const promotion = input.promotion || "your offer";
  const vibe = input.vibe || "fast, bright, and clear";
  const presenter = input.presenter || "friendly expert";
  const sellingPoint = input.sellingPoint || "save time and win more attention";

  return {
    script: `If you have been looking for a better way to talk about ${promotion}, here is your sign. With a ${vibe} feel, this post starts by meeting your audience where they are, then clearly explains why the offer matters. A ${presenter} can say: "${promotion} is built for people who want to ${sellingPoint}. It keeps the message simple, makes the value easy to understand, and gives your audience a clear reason to take action today. If this sounds like what you need, reach out, book a time, or send a message and let us help you take the next step."`,
  };
}

function getOpenAIText(data: OpenAIResponse): string {
  if (typeof data.output_text === "string") {
    return data.output_text;
  }

  return data.output
    ?.flatMap((item) => item.content || [])
    .find((content) => content.type === "output_text" && typeof content.text === "string")
    ?.text || "";
}

function isScriptPreview(value: unknown): value is ScriptPreview {
  if (!value || typeof value !== "object") {
    return false;
  }

  const preview = value as Partial<ScriptPreview>;
  return typeof preview.script === "string";
}

function parseScriptPreview(value: string): ScriptPreview | null {
  try {
    const parsed = JSON.parse(value) as unknown;
    return isScriptPreview(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<ScriptRequest>;

  const input: ScriptRequest = {
    promotion: cleanInput(body.promotion, 140),
    vibe: cleanInput(body.vibe, 80),
    presenter: cleanInput(body.presenter, 80),
    sellingPoint: cleanInput(body.sellingPoint, 140),
  };

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(fallbackScript(input));
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "system",
            content:
              "Create one complete 60-second spoken social media script for a small business based on the user's fields. Return only valid JSON with a single script string. The script should be natural for one presenter, about 125 to 150 spoken words, and include a strong opening, the offer, the main selling point, and a clear call to action. Do not include section labels, markdown, captions, hashtags, or extra fields. Do not mention automation vendor names.",
          },
          {
            role: "user",
            content: JSON.stringify(input),
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "social_script",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                script: { type: "string" },
              },
              required: ["script"],
            },
          },
        },
      }),
    });

    if (!response.ok) {
      return NextResponse.json(fallbackScript(input));
    }

    const data = (await response.json()) as OpenAIResponse;
    const parsed = parseScriptPreview(getOpenAIText(data));

    return NextResponse.json(parsed || fallbackScript(input));
  } catch {
    return NextResponse.json(fallbackScript(input));
  }
}
