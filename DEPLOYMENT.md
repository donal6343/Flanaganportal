# Deploying Flanagan Portal to Railway

This repo contains two apps that deploy as **two separate Railway services** in the same project:

| Service | Root Directory | What it is | What you see in a browser |
|---|---|---|---|
| Backend | `flanagan-backend` | Medusa 2 API + admin | Admin dashboard at `/app` (nothing at `/` — it's a headless API) |
| Storefront | `flanagan-backend-storefront` | Next.js shop | **The demo** — the customer-facing store |

Each app directory contains a `railway.json` that pins its build and start commands.

## 1. Backend service

In Railway → backend service → **Settings → Root Directory**: `flanagan-backend`.

**Variables** (use Railway *reference variables* for the database — never paste the
literal connection string, the `*.railway.internal` hostname only resolves inside
Railway's private network anyway):

```
DATABASE_URL=${{Postgres.DATABASE_URL}}
REDIS_URL=${{Redis.REDIS_URL}}            # optional but recommended; add a Redis service
JWT_SECRET=<long random string>
COOKIE_SECRET=<long random string>
MEDUSA_BACKEND_URL=https://flanaganportal-production.up.railway.app
ADMIN_CORS=https://flanaganportal-production.up.railway.app
AUTH_CORS=https://flanaganportal-production.up.railway.app,https://<storefront-domain>
STORE_CORS=https://<storefront-domain>
```

Do **not** set `DISABLE_MEDUSA_ADMIN` (it must be unset/false so the admin
dashboard is built and served at `/app`).

## 2. Seed the database (one-off, after first successful backend deploy)

Using the Railway CLI linked to the backend service:

```bash
railway run pnpm seed                                   # regions (UK/IE), sales channel, publishable key
railway run npx medusa user -e you@example.com -p <password>   # admin login
```

Then log in at `https://flanaganportal-production.up.railway.app/app`,
go to **Settings → Publishable API Keys**, and copy the key (`pk_...`).

## 3. Storefront service

Create a second service from this same GitHub repo.
**Settings → Root Directory**: `flanagan-backend-storefront`.

**Variables:**

```
MEDUSA_BACKEND_URL=https://flanaganportal-production.up.railway.app
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_...        # from step 2
NEXT_PUBLIC_DEFAULT_REGION=gb                    # seed creates gb + ie only ("us" default would 404)
NEXT_PUBLIC_BASE_URL=https://<storefront-domain>
```

Generate a public domain for this service (**Settings → Networking →
Generate Domain**). That URL is the demo to share.

## 4. Close the CORS loop

Once the storefront domain exists, fill it into the backend's `STORE_CORS`
and `AUTH_CORS` (step 1) and redeploy the backend.

## Troubleshooting

- **Storefront build fails immediately** → `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`
  is missing (the build hard-fails without it, see `check-env-variables.js`).
- **Storefront shows "Error fetching regions"** → database not seeded, or
  `MEDUSA_BACKEND_URL` wrong. Note this starter uses `MEDUSA_BACKEND_URL`,
  *not* `NEXT_PUBLIC_MEDUSA_BACKEND_URL`.
- **Blank page at the backend root URL** → expected; use `/app` (admin) or
  `/health`.
- **CORS errors in the browser console** → storefront domain missing from
  `STORE_CORS`/`AUTH_CORS` on the backend.
