// POST /api/checkout  (Authorization: Bearer <Supabase session token>)
// Creates a Dodo Payments checkout for the signed-in owner's company and returns { url }.
const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const DODO_KEY = process.env.DODO_PAYMENTS_API_KEY;
const PRODUCT_ID = process.env.DODO_PRODUCT_ID;
const SITE_URL = process.env.SITE_URL || 'https://dbeat.co.in';
const DODO_BASE = process.env.DODO_ENV === 'live' ? 'https://live.dodopayments.com' : 'https://test.dodopayments.com';

const sbHeaders = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` };

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  if (!SUPABASE_URL || !SERVICE_KEY || !DODO_KEY || !PRODUCT_ID) return res.status(500).json({ error: 'Billing is not set up yet.' });
  try {
    const token = (req.headers.authorization || '').replace(/^Bearer /, '');
    if (!token) return res.status(401).json({ error: 'Sign in first.' });
    const who = await fetch(`${SUPABASE_URL}/auth/v1/user`, { headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${token}` } });
    if (!who.ok) return res.status(401).json({ error: 'Sign in again.' });
    const user = await who.json();

    const m = await fetch(`${SUPABASE_URL}/rest/v1/members?user_id=eq.${user.id}&role=eq.owner&select=company_id,companies(name)&limit=1`, { headers: sbHeaders });
    const rows = m.ok ? await m.json() : [];
    if (!rows.length) return res.status(403).json({ error: 'Only the company owner can subscribe.' });

    const r = await fetch(`${DODO_BASE}/checkouts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${DODO_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_cart: [{ product_id: PRODUCT_ID, quantity: 1 }],
        customer: { email: user.email, name: rows[0].companies?.name || user.email },
        metadata: { company_id: rows[0].company_id },
        return_url: `${SITE_URL}/?billing=return`,
      }),
    });
    const out = await r.json().catch(() => ({}));
    if (!r.ok || !out.checkout_url) { console.error('dodo checkout failed', r.status, out); return res.status(502).json({ error: 'Could not start checkout. Try again.' }); }
    return res.status(200).json({ url: out.checkout_url });
  } catch (e) {
    console.error('checkout error', e);
    return res.status(500).json({ error: 'Something went wrong. Try again.' });
  }
};
