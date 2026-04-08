# Sisters are Sassy Studio — Website

**Pipeline B** · Client-facing portfolio and booking website  
Solo photo studio in Tacloban City, Leyte, Philippines · Active since 2013

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Components | shadcn/ui-style (components/ui/) |
| Database | Neon (PostgreSQL) via Prisma |
| Email | Resend + React Email |
| QR Code | react-qr-code |
| Booking Token | nanoid |
| SEO | next-sitemap + Next.js Metadata API + JSON-LD |
| Hosting | Vercel |

---

## Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- A [Neon](https://neon.tech) account (free tier works)
- A [Resend](https://resend.com) account (free tier: 3,000 emails/month)

---

## Local Development

### 1. Clone and install

```bash
git clone <repo-url>
cd sisters-are-sassy-studio
pnpm install
```

### 2. Environment variables

```bash
cp .env.local.example .env.local
```

Fill in the values in `.env.local`:

| Variable | Where to get it |
|---|---|
| `DATABASE_URL` | Neon dashboard → your project → Connection string |
| `RESEND_API_KEY` | [resend.com/api-keys](https://resend.com/api-keys) |
| `FROM_EMAIL` | `bookings@sistersaresassystudio.com` (requires domain verification) or `onboarding@resend.dev` for local testing |
| `STUDIO_NOTIFICATION_EMAIL` | Studio owner's Gmail address |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` for local dev |

### 3. Database setup

```bash
# Generate the Prisma client
pnpm db:generate

# Push the schema to Neon (first time) or run migrations
pnpm db:migrate
# or for quick development:
pnpm db:push
```

### 4. Portfolio images

Copy all 25 portfolio images from `test-photos/` into `public/portfolio/`:

```bash
# Windows
xcopy test-photos\* public\portfolio\ /E /I

# macOS / Linux
cp test-photos/* public/portfolio/
```

### 5. Logo

Place the studio logo SVG at `public/logo.svg`. This file is required for the NavBar and Footer.

### 6. Start the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Database (Neon PostgreSQL)

This project uses [Neon](https://neon.tech) — a serverless PostgreSQL provider with a free tier.

1. Create a Neon account and a new project
2. Copy the **Connection string** from the Neon dashboard
3. Paste it as `DATABASE_URL` in `.env.local`
4. Run `pnpm db:migrate` to create the tables

### Prisma commands

```bash
pnpm db:generate   # regenerate Prisma client after schema changes
pnpm db:migrate    # run pending migrations
pnpm db:push       # push schema without migration (dev only)
pnpm db:studio     # open Prisma Studio (visual DB browser)
```

---

## Email (Resend)

Booking confirmation emails are sent via [Resend](https://resend.com).

**Local testing:** Use `FROM_EMAIL=onboarding@resend.dev` — this sends without domain verification.

**Before launch:** 
1. Register `sistersaresassystudio.com` (or confirm the domain with the client)
2. Add the domain to your Resend account (Settings → Domains)
3. Add the DNS TXT/MX records Resend provides to your domain registrar
4. Once verified, update `FROM_EMAIL=bookings@sistersaresassystudio.com`

The studio owner receives a BCC copy of every booking confirmation. Scope change and reschedule notifications are sent to `STUDIO_NOTIFICATION_EMAIL`.

---

## SEO

Local SEO is built in from day one — not optional.

- **JSON-LD `LocalBusiness` schema** on every page via `app/layout.tsx`
- **`generateMetadata()`** on every page with "Tacloban City, Leyte, Philippines" in titles and descriptions
- **Open Graph** tags on all pages
- **Sitemap** auto-generated via `next-sitemap` (runs on `pnpm build`)
- **`/booking/[token]`** pages are excluded from sitemap and have `noindex`

To configure sitemap, edit `next-sitemap.config.js`.

---

## Deployment (Vercel)

1. Push to GitHub
2. Connect the repo to [Vercel](https://vercel.com)
3. Add all environment variables in the Vercel dashboard (Settings → Environment Variables)
4. Set `NEXT_PUBLIC_SITE_URL` to `https://sistersaresassystudio.com`
5. Deploy

The `postbuild` script runs `next-sitemap` automatically after every Vercel build.

---

## Project Structure

```
sisters-are-sassy-studio/
├── app/
│   ├── layout.tsx              — Root layout (fonts, NavBar, Footer, JSON-LD, Toaster)
│   ├── globals.css
│   ├── page.tsx                — Homepage (/)
│   ├── about/page.tsx
│   ├── portfolio/page.tsx
│   ├── services/page.tsx
│   ├── book/page.tsx           — Booking form
│   ├── booking/
│   │   ├── confirmation/page.tsx — Post-booking confirmation + QR
│   │   └── [token]/page.tsx    — Token-based session management
│   └── api/
│       └── bookings/
│           ├── route.ts        — POST: create booking
│           └── [token]/route.ts — GET: fetch, PATCH: update status
├── components/
│   ├── layout/                 — NavBar, Footer
│   ├── shared/                 — BookingCTA
│   ├── home/                   — HeroSection, PortfolioPreviewGrid, SessionCategoryTeaser
│   ├── portfolio/              — FilterBar, PortfolioGrid, LightboxModal
│   ├── services/               — ServiceCard
│   ├── booking/                — BookingForm, BookingConfirmStep, ConfirmationCard,
│   │                             QRCodeDisplay, BookingDetailCard, BookingStatusBanner,
│   │                             ScopeEditForm, SoftCancelPanel
│   ├── about/                  — StudioStory, TrustSignals
│   └── ui/                     — button, input, select, dialog, badge, card, label, textarea
├── lib/
│   ├── db.ts                   — Prisma singleton
│   ├── utils.ts                — cn(), formatDate(), etc.
│   ├── hooks/archiveHook.ts    — Phase 3 integration hook (DORMANT)
│   ├── constants/packages.ts  — Package definitions
│   ├── constants/portfolio.ts — Portfolio image index
│   └── email/
│       ├── BookingConfirmationEmail.tsx — React Email template
│       └── sendConfirmationEmail.ts    — Resend send functions
├── prisma/schema.prisma
├── public/
│   ├── logo.svg               — Studio logo (add manually)
│   └── portfolio/             — 25 portfolio images (copy from test-photos/)
├── .cursorrules
├── .env.local.example
├── next.config.ts
├── next-sitemap.config.js
├── tailwind.config.ts
└── package.json
```

---

## Phase 3 — Archive Integration (DORMANT)

The `emitToArchive()` hook in `lib/hooks/archiveHook.ts` is called on every booking confirmation. In Phase 2, it logs the payload and does nothing else.

To activate in Phase 3:
1. Add `ARCHIVE_API_URL` and `ARCHIVE_API_KEY` to environment variables
2. Uncomment the `fetch()` call in `lib/hooks/archiveHook.ts`
3. No data model changes required — the field mapping is already correct

---

## Before Launch Checklist

- [ ] Client confirms package names, inclusions, and pricing (`lib/constants/packages.ts`)
- [ ] Domain registered (`sistersaresassystudio.com`)
- [ ] Domain verified with Resend for email sending
- [ ] `FROM_EMAIL` updated to `bookings@sistersaresassystudio.com`
- [ ] `STUDIO_NOTIFICATION_EMAIL` updated to studio owner's actual email
- [ ] Portfolio images copied from `test-photos/` to `public/portfolio/`
- [ ] `public/logo.svg` added
- [ ] Agent 04 copy filled in (all `{COPY: ...}` placeholders)
- [ ] Studio phone number added (JSON-LD, Footer, contact page)
- [ ] Facebook page URL added (Footer, About page, booking pages)
- [ ] All environment variables set in Vercel dashboard
- [ ] `NEXT_PUBLIC_SITE_URL` set to production domain
- [ ] Sitemap verified after first production deploy
