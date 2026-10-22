import { contactSchema } from "@/lib/contact-schema";
export const runtime = "nodejs";
const attempts = new Map<string, { count: number; reset: number }>();
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host)
    return Response.json(
      { error: "This request is not allowed." },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return Response.json(
      { error: "Expected a JSON request." },
      { status: 415 },
    );
  const text = await request.text();
  if (text.length > 10000)
    return Response.json({ error: "Message too large." }, { status: 413 });
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success)
    return Response.json(
      { error: "Please check your name, email, and message." },
      { status: 400 },
    );
  if (
    !process.env.RESEND_API_KEY ||
    !process.env.CONTACT_TO ||
    !process.env.CONTACT_FROM
  )
    return Response.json(
      {
        error:
          "Email delivery is not configured yet. Please use a direct contact link when available.",
      },
      { status: 503 },
    );
  const now = Date.now();
  for (const [key, value] of attempts)
    if (value.reset < now) attempts.delete(key);
  // Email based throttling also works behind proxies without trusting spoofable IP headers.
  const key = parsed.data.email.toLowerCase();
  const recent = attempts.get(key);
  if (recent && recent.reset > now && recent.count >= 3)
    return Response.json(
      { error: "Please wait a few minutes before sending another message." },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  attempts.set(key, {
    count: (recent?.count || 0) + 1,
    reset: recent?.reset || now + 600000,
  });
  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM,
        to: [process.env.CONTACT_TO],
        reply_to: parsed.data.email,
        subject: `Portfolio inquiry from ${parsed.data.name}`,
        text: `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\n\n${parsed.data.message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!result.ok) throw new Error("Delivery provider rejected the request");
    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "Your message could not be delivered. Please try again later." },
      { status: 502 },
    );
  }
}
