# Terkib23

Minimal, multilingual agency website for Terkib23.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Static export for Cloudflare Pages

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Cloudflare Pages

- Build command: `npm run build`
- Output directory: `out`
- Node.js: `20.19` or newer is recommended because the latest ESLint dependency warns on older Node 20 builds.

## Contact Form

The pricing form now tries the native Cloudflare Pages Function endpoint at `/api/contact` first and falls back to FormSubmit only if the native endpoint is not configured yet.

For the native endpoint to deliver emails, set these secrets in your Cloudflare Pages project:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`

Optional:

- `CONTACT_ALLOWED_ORIGIN`

Recommended `CONTACT_FROM_EMAIL` format:

```txt
Terkib23 <hello@your-domain.com>
```

The `/api/contact` handler lives in [`functions/api/contact.ts`](functions/api/contact.ts) and sends transactional email through the Resend REST API.

## Content

All language copy, package placeholders and reference data live in `src/lib/content.ts`.
