# dbeat

Fleet scheduling platform for transport companies. This repository holds the working prototype: a single static page (`index.html`) with sample data, in English and Hindi.

## What it does
- Fleet view: each vehicle with fuel, vehicle documents, driver nickname and live trip state
- Earning vs empty run tracking, with a time split per trip
- Vehicle documents and hire contracts, each with its own status
- Vehicle types for people and cargo, drivers with license and ID details
- English / Hindi switch

## Run it locally
Open `index.html` in a browser. There is no build step. Data is sample data kept in the browser's local storage.

## Environments and releases
Two environments, each with its own database, so test data never touches customers.

| | Branch | Address | Database |
|---|---|---|---|
| Production (customers) | `main` | https://dbeat.co.in | Supabase project for customers |
| Staging (testing) | `staging` | https://staging.dbeat.co.in | separate Supabase staging project (set in `CFG` in `index.html`) |

Deploys are automatic. Vercel is connected to this GitHub repository and a check (`.github/workflows/check.yml`) runs on every push.

Release flow:
1. Work on the `staging` branch and push. Staging updates by itself.
2. Test on the staging address.
3. Open a pull request from `staging` into `main` and merge it. Production updates by itself.

Any address other than the production ones runs against the staging database, shows a "STAGING" badge, and asks search engines not to index it.

## Deploy by hand (only if needed)
```
npx vercel deploy --prod --yes
```

## Next
Real backend with company accounts and login, then GPS data (see project notes).
