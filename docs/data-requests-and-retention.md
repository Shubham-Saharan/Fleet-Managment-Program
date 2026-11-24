# Data requests and retention (internal)

Matches what the public Privacy Policy and Data Processing Agreement promise. Change both together.

## Retention schedule
| Data | Keep | Then |
|---|---|---|
| Account and fleet data | While the account is active | Delete on closure request within 30 days |
| Backups (only if Supabase Pro backups are on) | Provider cycle | Must age out within 30 days after deletion |
| Billing records | As long as tax/accounting law requires | Then delete |
| Server and security logs | Days today (provider default). **Needs to become 1 year by 13 May 2027** (DPDP Rule 6(1)(e)) and 180 days in India now (CERT-In) | Choose a log store before then; see `docs/compliance-calendar.md` |
| Analytics (Clarity) | Provider setting; only with consent | Reduce retention in Clarity settings |
| Inactive accounts (no sign-in, no active subscription for 12 months) | 12 months | Email warning, then delete 30 days later |
| Suspended-for-nonpayment accounts | 30 days minimum | Then delete if unpaid |

## Handling a request (access, correction, deletion, export, withdraw consent)
1. Reply within 30 days from the email in the Privacy Policy. Confirm the requester controls the account (reply from the account email, or sign-in proof).
2. If the request is about a driver's data held by a customer company, send it to that company (the controller) and tell the requester.
3. **Export:** in Supabase SQL Editor run
   `select data from fleet_state where company_id = '<id>';` and send the result to the account owner.
4. **Deletion:** after confirming, run
   `delete from companies where id = '<id>';`
   (members and fleet_state go with it). Then Authentication -> Users -> delete the user(s). Then, if there was a subscription, cancel it in Dodo.
5. Record the date, request type and outcome. Keep the record for 3 years without the deleted data itself.

## Before real customers
- [ ] Turn Clarity masking to **Strict** (Clarity -> Settings -> Masking). The Cookie Policy says this.
- [ ] Run `supabase/security.sql` in the main project.
- [ ] Decide whether to upgrade Supabase to Pro (backups, no auto-pause) and update the retention text if backups exist.
