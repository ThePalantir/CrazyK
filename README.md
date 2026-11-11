# Crazy K’s website rebuild

Review date: November 11, 2026. Original: https://www.crazykskaraoke.com/ . Design reference: https://kj-lehigh-website.truecore.services/ .

The authoritative static source is `site/`. Run `npm ci` and `npm run build` to copy it to `dist/`, then serve `dist/` as the web root. The build has no third-party npm dependencies. For a local Windows preview, double-click `Open Website Preview.cmd`. The existing `dist/` is also included as a convenience snapshot; rebuild it after source changes.

## TrueCore Droplet dashboard handoff

- Repository: `ThePalantir/CrazyK`; intended branch and commit must be selected explicitly in the dashboard.
- Manifest: `static-site.yaml`, using the dashboard's `operations-project` schema and `vite-static` profile. This is not a DigitalOcean App Platform specification.
- Root directory: `.`; install: `npm ci`; build: `npm run build`; output: `dist/`; health path: `/`. The manifest health text matches the page title.
- No environment variables, application server, or additional services are needed for this static site. The dashboard supplies static serving, routing, and HTTPS; verify its capabilities and supported Node version before setup.
- This is a review build: `noindex,nofollow` is present but does not restrict access. Configure and independently verify preview access controls in the host.
- Record the dashboard project, preview hostname, build logs, deployed commit, external HTTPS and functional checks, and a verified rollback target. A GitHub push or successful local build does not establish that a Droplet release occurred.
- Production launch requires separate approval and the content, form, SEO, privacy, accessibility, and verification checks below. The inquiry prepares an email in the visitor's app; it is not a durable server-side submission.

## Content migration map

| Original page | New destination | Preserved content |
|---|---|---|
| Home | Hero, introduction, karaoke, awards, contact | Business identity, event sizes, service area, music/karaoke library claim, microphones artwork, working awards and credit-card graphic |
| About Us | Meet Kevin; venue/equipment disclosures; recommendations | Kevin Dean, 20+ years, reliability, promptness/presentation, personality, full venue list, equipment brands, backup equipment, licensed music purchasing, options/referral message, phone and email, all distinct recommended businesses |
| Wedding Packages | Weddings | Introduction, planning consultations, planner download link, Basic/Silver/Gold prices and inclusions, overtime/travel terms, all custom event rates and add-ons, nonprofit/school discounts |
| Photobooth | Photo booth | Capacity, configurations, graphics/props, all four packages and inclusions, all add-ons, postcard conditions, available original photography |
| Contact | Plan your party | Name/email/subject/message, copy option, wedding navigation; event fields added |

Wording has been edited for spelling and readability while preserving the business details. Repeated entries such as Saucon Valley Acres and Woodstone are consolidated. Unavailable images are documented in the audit rather than rendered as broken placeholders. The original audio widget has no audio/source element in the observed DOM and is not recreated as a nonworking control.

## Working behavior

- Package buttons populate the package and occasion in the inquiry.
- Karaoke button selects the karaoke occasion.
- Mobile menu, Escape-to-close, anchors, disclosures, phone and email links.
- Email-preparation form validates required fields using native browser validation and builds a mailto with the inquiry and optional CC. It does not send email on a server. The visitor must review and send from their email app. An explicit link to the original online form is provided; its delivery is unverified.
- Original wedding planner URL remains available; download availability requires verification.
- Legacy paths are redirected to their matching anchors in `_redirects` on compatible hosts. Equivalent Nginx rules are in `nginx-redirects.conf`.

## Before replacing the original domain

Confirm Kevin’s current package prices, promotional eligibility, business name, partner URLs and award claims. The original wedding rate sheet is dated 2025, and the different photo booth offers must not be merged into one price. Replace email-preparation with a tested server-side email service if native form delivery is required. Confirm production privacy wording based on the actual mail/data flow. Obtain missing image originals if Kevin wants those particular graphics restored. Verify the planner download and every partner destination. Configure the final domain, remove preview `noindex`, add canonical/social metadata for that exact domain, configure HTTPS and old-path redirects, and run deployment-specific accessibility/performance/form-delivery checks. No live crazykskaraoke.com changes were made.
