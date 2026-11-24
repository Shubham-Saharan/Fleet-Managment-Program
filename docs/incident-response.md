# Incident response (internal)

Use this when something may have exposed or damaged customer data: a leaked key, a suspected break-in,
a wrong-company data leak, a provider breach notice, or a researcher's report.

## 1. First hour: contain
1. Write down the time you found out and what you saw. Do not delete anything.
2. Rotate the affected secret straight away:
   - Supabase service key: Supabase -> Project Settings -> API Keys -> roll the secret key; update `SUPABASE_SERVICE_ROLE_KEY` in Vercel; redeploy.
   - Dodo API key / webhook secret: Dodo -> Developer; create new, update Vercel (`DODO_PAYMENTS_API_KEY`, `DODO_PAYMENTS_WEBHOOK_KEY`); disable the old one.
   - Google client secret: Google Cloud -> Clients -> add a new secret; update Supabase; disable the old one.
3. If an account is being abused: Supabase -> Authentication -> Users -> ban or delete the user.
4. If the site itself is compromised: Vercel -> Deployments -> Instant Rollback to a known-good deploy.

## 2. Find out what happened
- Supabase -> Logs (Auth, API, Postgres). Vercel -> Logs. Check `git log` for unexpected commits.
- Which companies and which data (accounts, fleet data, driver IDs) were exposed, and for how long?

## 3. Tell people
| Who | When | What |
|---|---|---|
| Affected customers | Without undue delay, aim within 72 hours of confirming | What happened, what data, what we did, what they should do |
| Regulators | Where the law requires (India: Data Protection Board under the DPDP Act; EU/UK: supervisory authority within 72 hours if GDPR applies) | Facts known so far; follow-up when complete |
| Payment provider | If payment keys or webhooks were involved | Same day |
Customers are controllers of their drivers' data. Give them the facts so they can inform drivers.

## 4. Fix and learn
- Fix the root cause, add a test or a check so it cannot repeat, and record: timeline, cause, data affected, who was told, what changed.
- Keep the written record for at least 3 years.

## Contacts
- Owner / data protection contact: see the public Privacy Policy.
- Supabase support, Vercel support, Dodo support: via each dashboard.
