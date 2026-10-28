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

## Deploy
The site is hosted on Vercel (project `dbeat`). From this folder:

```
npx vercel deploy --prod --yes
```

## Next
Real backend with company accounts and login, then GPS data (see project notes).
