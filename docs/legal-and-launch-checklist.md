# Legal and launch checklist (internal)

The policies on the website are drafts written to be accurate about how dbeat works today. They are not legal advice.
Items below need a person (owner or lawyer), not code.

## Must do before real customers
- [ ] A lawyer reads Terms, Privacy Policy, Cookie Policy, DPA, Copyright page. Ask specifically about: DPDP Act obligations and the DPDP Rules, limits of liability, governing-law and court wording, GST on subscriptions.
- [ ] Decide the legal entity that operates dbeat (sole proprietor, LLP, company) and add its name and registered address to the Terms and Privacy Policy.
- [ ] Register the business and the domain contact details correctly (GoDaddy WHOIS contact must be real).
- [ ] GST registration if turnover requires it; issue GST invoices (Dodo is merchant of record, check who invoices Indian customers).
- [ ] Trademark search and filing for "dbeat" (India, class 9 / 42).
- [ ] Decide the grievance contact: DPDP and IT Rules expect a named contact. The public email is used today.
- [ ] Switch Clarity masking to Strict.
- [ ] Run `supabase/security.sql` and `supabase/billing.sql` in the main project.
- [ ] Rotate the Google client secret that appeared in a screenshot.

## Apple App Store and Google Play (only if mobile apps are built later)
- A privacy policy URL is required (the website page works), plus data-safety / privacy-label forms.
- Apple requires a standard EULA or its default one; our Terms can be used as a custom EULA if it includes the required clauses.
- In-app purchases must use the store billing for digital subscriptions sold inside the app, unless an exception applies. Check before building.

## If customers are in the EU or UK
- GDPR applies: consider an EU/UK representative (Art. 27) and sign-on of standard contractual clauses for transfers on request.

## US DMCA agent
- Not registered, because dbeat does not operate from or target the US. Register (about USD 6 with the US Copyright Office) only if that changes.

## Ongoing
- Review the sub-processor list whenever a vendor is added; give customers 14 days' notice.
- Update the "Last updated" date on any page you change.
- Check dependencies and the pinned supabase-js version every quarter.
