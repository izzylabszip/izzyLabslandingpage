import { NextResponse, type NextRequest } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { sendContactEmail } from "@/lib/mail";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; start: number }>();

/** Best-effort per-instance rate limit. Enough to stop casual abuse. */
function isLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(ip, { count: 1, start: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isLimited(ip)) {
    return NextResponse.json(
      { error: "Too many transmissions. Try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
      },
      { status: 400 },
    );
  }

  // Honeypot filled: pretend success, deliver nothing.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const { delivered } = await sendContactEmail(parsed.data);
    return NextResponse.json({ ok: true, delivered });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      { error: "Transmission failed. Try again or reach us directly." },
      { status: 500 },
    );
  }
}
