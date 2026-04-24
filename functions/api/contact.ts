type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  locale?: string;
  projectType?: string;
  projectPurpose?: string;
  websiteType?: string;
  traffic?: string;
  pageCount?: string;
  languages?: string;
  modules?: string;
  note?: string;
};

type Env = {
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  RESEND_API_KEY?: string;
  CONTACT_ALLOWED_ORIGIN?: string;
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function sanitizeSingleLine(value: unknown, maxLength: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .slice(0, maxLength)
    .trim();
}

function sanitizeMultiLine(value: unknown, maxLength: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .replace(/\r\n/g, "\n")
    .slice(0, maxLength)
    .trim();
}

function isEmailValid(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatFields(payload: Required<ContactPayload>) {
  return [
    ["Name", payload.name],
    ["Company", payload.company],
    ["Email", payload.email],
    ["Locale", payload.locale],
    ["Project Type", payload.projectType],
    ["Project Purpose", payload.projectPurpose],
    ["Website Type", payload.websiteType],
    ["Traffic", payload.traffic],
    ["Page Count", payload.pageCount],
    ["Languages", payload.languages],
    ["Modules", payload.modules],
    ["Note", payload.note]
  ];
}

async function sendWithResend(env: Env, payload: Required<ContactPayload>) {
  const to = sanitizeSingleLine(env.CONTACT_TO_EMAIL, 160);
  const from = sanitizeSingleLine(env.CONTACT_FROM_EMAIL, 160);
  const apiKey = sanitizeSingleLine(env.RESEND_API_KEY, 200);

  if (!to || !from || !apiKey) {
    return { configured: false };
  }

  const fields = formatFields(payload);
  const text = fields.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
      <h2>New contact request</h2>
      <table style="border-collapse:collapse;width:100%;max-width:720px">
        <tbody>
          ${fields
            .map(
              ([label, value]) =>
                `<tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:700;width:180px">${escapeHtml(
                  label
                )}</td><td style="padding:8px;border:1px solid #e5e7eb">${escapeHtml(value)}</td></tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "terkib23-contact/1.0"
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New lead from ${payload.name}`,
      html,
      text,
      reply_to: payload.email
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend error ${response.status}: ${errorText}`);
  }

  return { configured: true };
}

function isAllowedOrigin(request: Request, env: Env) {
  const originHeader = request.headers.get("Origin");

  if (!originHeader) {
    return true;
  }

  const requestOrigin = new URL(request.url).origin;
  const configuredOrigin = sanitizeSingleLine(env.CONTACT_ALLOWED_ORIGIN, 200);

  if (configuredOrigin) {
    return originHeader === configuredOrigin;
  }

  return originHeader === requestOrigin;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    if (!isAllowedOrigin(context.request, context.env)) {
      return json({ ok: false, error: "forbidden_origin" }, 403);
    }

    const payload = (await context.request.json()) as ContactPayload;
    const normalized: Required<ContactPayload> = {
      name: sanitizeSingleLine(payload.name, 80),
      company: sanitizeSingleLine(payload.company, 100),
      email: sanitizeSingleLine(payload.email, 120),
      locale: sanitizeSingleLine(payload.locale, 12) || "-",
      projectType: sanitizeSingleLine(payload.projectType, 40) || "-",
      projectPurpose: sanitizeSingleLine(payload.projectPurpose, 120) || "-",
      websiteType: sanitizeSingleLine(payload.websiteType, 120) || "-",
      traffic: sanitizeSingleLine(payload.traffic, 80) || "-",
      pageCount: sanitizeSingleLine(payload.pageCount, 80) || "-",
      languages: sanitizeSingleLine(payload.languages, 240) || "-",
      modules: sanitizeSingleLine(payload.modules, 240) || "-",
      note: sanitizeMultiLine(payload.note, 2000) || "-"
    };

    if (!normalized.name || !normalized.company || !isEmailValid(normalized.email)) {
      return json({ ok: false, error: "invalid_payload" }, 400);
    }

    const emailResult = await sendWithResend(context.env, normalized);

    if (!emailResult.configured) {
      return json({ ok: false, error: "provider_unconfigured" }, 501);
    }

    return json({ ok: true });
  } catch (error) {
    console.error(JSON.stringify({ scope: "contact_form", error: String(error) }));
    return json({ ok: false, error: "internal_error" }, 500);
  }
}

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS"
    }
  });
}
