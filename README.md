# Furbz Sparkle — Airo recreation starter

This is a standalone React + Express storefront recreated from the supplied Furbz Sparkle screen recording, with a server-side Paystack flow and a secure admin area.

## What is included

- Mobile-first Furbz Sparkle storefront matching the supplied visual direction.
- Editable products stored in SQLite rather than hard-coded into the UI.
- Cart and checkout flow.
- Paystack initialization on the backend only.
- Paystack verification plus signed webhook verification before an order is marked paid.
- Order statuses: Pending, Paid, Processing, Shipped, Delivered, Cancelled.
- Password-protected admin login using bcrypt password hashing.
- Product create/edit/deactivate, pricing, images, descriptions, categories and stock.
- Orders and payment status management.
- Media Library uploads.
- Customer Inbox with SMTP email replies when SMTP is configured.
- Social/contact URL and WhatsApp settings editable from the dashboard.
- Server-side connector scaffolding for Facebook, Instagram Business and Google Business Profile OAuth.
- Encrypted application-secret storage using AES-256-GCM and `APP_ENCRYPTION_KEY`.
- Responsive storefront and admin UI for phones, tablets and desktops.

## Important limitations before production

The supplied material is a screen recording, not the original Airo source code. Therefore this project recreates the visible experience and builds the requested backend architecture; it cannot literally preserve Airo's private components or backend.

The Facebook/Instagram/Google connector buttons become fully operational after the corresponding developer apps, OAuth redirect URIs, permissions and provider approvals are configured. Google Business Profile API access has eligibility requirements, and Meta permissions may require App Review.

For production, move SQLite/media storage to managed persistent infrastructure if the host is ephemeral (for example Postgres + object storage). The local SQLite/upload implementation is suitable for a conventional Node server or VPS.

## Run locally

1. Copy `.env.example` to `.env`.
2. Set a strong `JWT_SECRET` and a random `APP_ENCRYPTION_KEY`.
3. Set `ADMIN_BOOTSTRAP_PASSWORD` to a strong temporary password.
4. Add Paystack keys. Only the public key may ever be exposed to a browser; the secret key is read by the Express server.
5. Run `npm install`.
6. Run `npm run dev`.
7. Storefront: `http://localhost:5173/`
8. Admin: `http://localhost:5173/admin`

The bootstrap admin email is `admin@furbzsparkle.com`; use the password from `ADMIN_BOOTSTRAP_PASSWORD` and change it after first login.

## Paystack production setup

- Put `PAYSTACK_SECRET_KEY` in the server environment or enter it through the admin Secrets page. It is never sent to `/api/store` or embedded in React.
- Configure Paystack's webhook URL as `https://YOUR_DOMAIN/api/payments/webhook`.
- Set `APP_URL` to the public HTTPS site.
- The webhook validates Paystack's `x-paystack-signature` with HMAC-SHA512 before updating the order.
- The verify endpoint also checks the transaction amount against the server-side order total.

## Social setup

Storefront URLs/number can be entered later under Admin → Social. OAuth management requires:

- Facebook App ID/secret + Page permissions.
- Instagram Business OAuth credentials + current professional-account permissions.
- Google OAuth client credentials + Business Profile API access.
- Correct HTTPS redirect URLs in each provider dashboard.

Never paste provider secrets into client-side JavaScript.
