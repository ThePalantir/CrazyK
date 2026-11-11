# Crazy K’s website rebuild

Review date: November 11, 2026. Original: https://www.crazykskaraoke.com/ . Design reference: https://kj-lehigh-website.truecore.services/ .

Static site in `dist/`. Serve with `python -m http.server 4173 --directory dist`. No npm installation or build is required. Deploy `dist/` as the web root on any static host, including the TrueCore DigitalOcean stack. Preserve the `.openai/hosting.json` identity for Sites deployments.

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
