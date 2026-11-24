# dbeat compliance calendar (read this each month)

A GitHub issue with this list is opened on the 1st of every month by `.github/workflows/reminders.yml`. Tick items off in the issue.
Not legal advice. Sources and reasons are in `docs/india-law-map.md`.

## Blockers: do not put the policies live until these are done
- [ ] Written permission (an email or letter) from Masters' Union to use its DLF Cyber Park address for correspondence. Keep a copy. Without it, remove the address from the policy pages.
- [ ] A lawyer has read Terms, Privacy Policy, Cookie Policy, DPA and Copyright pages.
- [ ] `supabase/security.sql` has run in the main Supabase project.
- [ ] Vercel plan: Hobby is for personal, non-commercial use. Move to Pro before charging customers.
- [ ] Clarity masking is set to Strict.
- [ ] A dbeat-owned email address replaces the college address on the pages (the college address stops working when you leave).
- [ ] GitHub repository is private.

## Fixed dates
| Date | What | Action |
|---|---|---|
| 13 Nov 2026 | DPDP consent-manager rules start | Nothing for dbeat. |
| **13 May 2027** | Main DPDP duties start (notice, security, 1-year logs, breach reporting, rights, published contact) | Be ready by April 2027. See the DPDP list below. |
| Every 3 months | Dependencies, pinned `supabase-js`, sub-processor list, backups restore test | Do the quarterly list below. |

## DPDP readiness list (finish before May 2027)
- [ ] Keep security and access logs for at least 1 year (Rule 6(1)(e)). Vercel Hobby and Supabase free keep logs for hours or days only. Choose a place to store logs (a Vercel log drain or a small logs table) and update the Privacy Policy retention text.
- [ ] CERT-In: keep ICT logs for a rolling 180 days (a copy in India is enough) and be able to report an incident within 6 hours. See `docs/incident-response.md`.
- [ ] Publish the named contact for personal-data questions (Rule 9). Today it is a shared email.
- [ ] Breach procedure tested once on paper: tell affected people without delay, send the Board full details within 72 hours (Rule 7).
- [ ] Reply to access, correction and erasure requests within 90 days at the latest. We promise 30.
- [ ] Decide where data lives. Supabase is in Ireland. Transfers abroad are allowed unless the government restricts a country (Rule 15). Check for any new restriction each quarter.

## Triggers: when X happens, do Y
| When | Do |
|---|---|
| A customer is in the US and asks for it, or dbeat lets users share files or pages publicly | Register a DMCA agent with the US Copyright Office (about USD 6, renew every 3 years) and add the agent to the Copyright page. |
| First customer is in the EU or UK | Add the GDPR representative and standard contractual clauses (see the checklist). |
| Turnover (all your sales, in India) nears Rs 20 lakh in a year | Register for GST before you cross it. Ask a CA now how Dodo's invoicing works (see law map). |
| You start sending marketing email | Add a separate consent tick box and an unsubscribe link first. |
| You build a mobile app | Apple and Google privacy forms, store billing rules, update Terms section on app stores. |
| You hire anyone or use a freelancer who sees customer data | Written confidentiality and data-handling agreement first. |
| You add a new vendor that touches personal data | Add to the sub-processor list in the DPA and give customers 14 days' notice. |
| The legal entity is registered | Put its name, CIN or registration number and registered office on all pages. Update Dodo, Google Cloud and Supabase account owner. |
| A person asks to see, fix or delete their data | Follow `docs/data-requests-and-retention.md`. |
| Any suspected leak or break-in | Follow `docs/incident-response.md` at once. |

## Quarterly (Jan, Apr, Jul, Oct)
- [ ] Update `supabase-js` pin and check Dependabot or `npm audit` style alerts.
- [ ] Restore test of a Supabase backup (Pro plan).
- [ ] Re-read vendor terms for Vercel, Supabase, Dodo, Clarity for changes.
- [ ] Rotate API keys that were ever pasted in chat or screenshots.
- [ ] Update the "Last updated" date on any policy you change.
