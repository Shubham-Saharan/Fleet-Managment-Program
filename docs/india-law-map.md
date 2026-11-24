# India law map for dbeat (internal)

Researched 24 Nov 2026 from government and law-firm pages. This explains our position; it is not legal advice. "Check" means ask a lawyer or CA.
Confidence: **Sure** = read on an official page. **Likely** = law-firm sources agree. **Check** = from general knowledge, not verified here.

## 1. What dbeat is, in legal terms
- A business-to-business software service (SaaS) sold by subscription to transport companies.
- For account data (staff emails, company names) dbeat is the **data fiduciary** (decides why data is used).
- For fleet and driver data, the customer company is the data fiduciary and dbeat is the **data processor**. The DPA covers this.
- dbeat has no legal entity yet. Until one exists, the owner is personally responsible for everything below.

## 2. Data protection

### Now (until 13 May 2027): IT Act 2000 and SPDI Rules 2011 (Likely)
- Section 43A: a company that handles sensitive personal data (passwords, financial details and similar) must keep reasonable security practices, or pay compensation for the loss it causes.
- SPDI Rules 2011: publish a privacy policy, get written consent for sensitive data, name a grievance officer, answer within one month.
- Section 72A: up to 3 years in prison for sharing personal data without consent or against a contract.
- Section 43A is removed when the DPDP duties start (DPDP Act s.44).

### From 13 May 2027: DPDP Act 2023 and DPDP Rules 2025 (Sure)
Rules notified 14 Nov 2025. Phased: Data Protection Board rules at once, consent managers after 12 months, the main duties after 18 months. Source: PIB note and the Rules text on meity.gov.in.

| Rule | What it asks of dbeat | Where we stand |
|---|---|---|
| Rule 3 notice | A clear, separate notice saying what data, why, how to withdraw consent, how to complain | Privacy Policy covers it. Add a short notice at sign-up (done: "By continuing, you agree..."). |
| Rule 6 security | Encryption, masking or similar safeguards; access control; **keep logs and personal data for at least 1 year** | Safeguards good. **Log retention is a gap** (Vercel Hobby and Supabase free keep logs for days). |
| Rule 7 breach | Tell each affected person without delay; send the Board a description at once and full details within 72 hours | Procedure in `docs/incident-response.md`. |
| Rule 9 contact | Publish the contact of a person who can answer questions about personal data | A shared email today. Name a person. |
| Rule 14 rights | Access, correct, update, erase, nominate; answer within **90 days** | We promise 30 days. Keep the 30. |
| Rule 15 transfers | Sending data abroad is allowed unless the government restricts the country | Supabase is in Ireland. Watch for restrictions. |
| Rules 10, 11 | Parent consent for children | dbeat is for business users aged 18+. The Terms say so. |
| Rule 8 | Erase after 3 years' inactivity | Only for very large e-commerce, gaming and social media. Not us. |
| Penalties | Up to Rs 250 crore for security failure; Rs 200 crore for missing breach notices; Rs 50 crore for other breaches | The size of these figures is for the largest firms, but the rule applies to everyone. |

- **Startup exemption:** the Act (s.17(3)) lets the government exempt classes of startups from some duties. I found no notification doing this. Check before relying on it.

### CERT-In directions, 28 April 2022 (Sure)
- Report listed cyber incidents to CERT-In **within 6 hours** of noticing them.
- Keep ICT system logs for a rolling **180 days** within India (a copy in India is accepted; Likely).
- Applies to service providers, intermediaries, data centres and body corporates. A small startup is not clearly outside it. Treat it as applying.
- Source: cert-in.org.in Directions under section 70B.

## 3. Contracts: the Terms of Service

### Limitation of liability (Sure, from law-firm guides citing the Contract Act)
- Indian Contract Act 1872 s.73: damages cover losses that arise naturally from a breach, not remote or indirect ones. So excluding lost profit and indirect loss is normally accepted between businesses.
- s.74: a fixed sum for breach must be a reasonable pre-estimate; a penalty is cut down to reasonable compensation.
- s.28: a contract cannot absolutely bar going to court or shorten the legal time limit. A cap on money is fine. A clause that stops a customer from suing at all is not.
- s.23: a clause that defeats the purpose of the law or public policy is void. Courts have refused to enforce caps against fraud, wilful misconduct and gross negligence.
- What we did: kept the 12-months-of-fees cap and the exclusion of indirect loss, and **added a carve-out for fraud, wilful misconduct and gross negligence**.
- Check: whether a cap equal to 12 months of fees is "reasonable" for a transport customer who loses a day of scheduling. Small subscription prices make the cap small, which courts accept in principle.

### Courts and arbitration
- A contract may choose which competent court hears disputes (Likely). We chose the courts at Gurugram, Haryana. Check that this still holds once the real entity and address exist.
- Arbitration (Arbitration and Conciliation Act 1996) is an option; not added. Check if a customer asks.

### Click-to-accept
- The IT Act s.10A says electronic contracts are valid. Showing the Terms link next to the sign-up button, with "By continuing, you agree...", is the usual method (Likely). A tick box is stronger, but not required.

### Consumer law
- The Consumer Protection Act 2019 protects "consumers", which excludes buying for a commercial purpose. Fleet operators buy for business. A very small one-truck owner could still argue they are a consumer. Check.

## 4. Copyright and takedown (Likely)
- Copyright Act 1957 s.52(1)(c): a host that stores material temporarily or incidentally is protected if it disables access within 21 days on a written complaint, unless a court order follows. Copyright Rules 2013 r.75 say acting within 36 hours of the notice.
- IT Act s.79 and the Intermediary Rules 2021: safe harbour for intermediaries who act on court or government orders. Check whether a private B2B tool counts as an "intermediary" and whether a named grievance officer is needed.
- The US DMCA safe harbour is not part of Indian law. The Copyright page says so.

## 5. Tax and money
- **GST (Sure, CBIC):** services below Rs 20 lakh yearly turnover do not need GST registration (Rs 10 lakh in special-category states). Haryana is not special-category. This covers inter-state services and sales through e-commerce platforms too.
- **GST rate (Likely):** software subscriptions are taxed at 18%.
- **Check, important:** Dodo Payments is a "merchant of record". That means Dodo, not you, may be the seller in the invoice. Ask a CA and Dodo: who issues the invoice to an Indian customer, whether the customer can claim input tax credit (transport companies will ask for a GST invoice), how Dodo's payouts to you are taxed, and whether you must register for GST at all.
- **Cards for subscriptions (Check):** RBI rules require extra authentication and a pre-debit notice for card auto-renewals. Dodo handles these; test a live renewal later.
- **Income tax:** your income from dbeat is taxable. Keep records. A CA should set this up when the entity exists.

## 6. Business registration
| Option | Notes (Check all) |
|---|---|
| Sole proprietorship | No registration needed. You are personally liable. Cheapest start. |
| LLP | Partners need DSC; liability limited. |
| Private Limited / One Person Company | Strongest for investors; MCA registration, annual filings. |
- **DPIIT "Startup India" recognition** may bring tax benefits and could matter for the DPDP startup exemption.
- **Udyam (MSME) registration** is free and online.
- **Registered office (Companies Act s.12):** a company must have one, and must file proof. If the premises belong to someone else you need their no-objection consent and a recent utility bill. A false address is an offence under the Act. This is why Masters' Union's written permission is a blocker.
- **Trademark (Trademarks Act 1999):** file "dbeat" in class 9 and 42. A search first.

## 7. Vendor terms (Check, but important)
- **Vercel Hobby plan is for personal, non-commercial use.** Charging customers needs the Pro plan. Not in law, but a breach of Vercel's terms could suspend the site.
- Supabase free projects pause after a week of inactivity and have no backups. Use Pro for paying customers.

## 8. Sources
- DPDP Rules, 2025, full text: meity.gov.in (static/uploads/2025/11/53450e6e...pdf)
- PIB press note "DPDP Rules, 2025 Notified", 17 Nov 2025: static.pib.gov.in
- CERT-In Directions 28.04.2022: cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf
- CBIC GST registration threshold: cbic-gst.gov.in (GST Council decisions, FAQ)
- Limitation of liability in India: cms.law expert guide; Legal 500; Lexology judicial survey
- SPDI to DPDP transition: Taxmann, Linklaters Data Protected India, DLA Piper
- Masters' Union address: mastersunion.org (campus pages)
