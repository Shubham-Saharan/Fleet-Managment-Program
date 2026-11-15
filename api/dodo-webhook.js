// POST /api/dodo-webhook  — Dodo Payments tells us a subscription started, renewed, or ended.
// Verifies the signature (Standard Webhooks: HMAC-SHA256 over "id.timestamp.body"), then updates the company.
const crypto = require('crypto');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SECRET = process.env.DODO_PAYMENTS_WEBHOOK_KEY;
const GRACE_MS = 3 * 864e5; // keep access 3 days past the billing date so a late debit does not lock a customer out
const sbHeaders = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, 'Content-Type': 'application/json' };

function verify(raw, h, secret = SECRET, now = Date.now()) {
  const id = h['webhook-id'], ts = h['webhook-timestamp'], sig = h['webhook-signature'];
  if (!id || !ts || !sig || !secret) return false;
  if (Math.abs(now / 1000 - Number(ts)) > 300) return false; // replayed or stale
  const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
  const want = crypto.createHmac('sha256', key).update(`${id}.${ts}.${raw}`).digest();
  return sig.split(' ').some(s => {
    const got = Buffer.from(s.replace(/^v1,/, ''), 'base64');
    return got.length === want.length && crypto.timingSafeEqual(got, want);
  });
}

const readRaw = req => new Promise((ok, no) => { const c = []; req.on('data', d => c.push(d)); req.on('end', () => ok(Buffer.concat(c).toString('utf8'))); req.on('error', no); });

async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const raw = await readRaw(req);
  if (!verify(raw, req.headers)) return res.status(401).json({ error: 'Invalid signature' });
  const event = JSON.parse(raw), d = event.data || {};
  try {
    const dup = await fetch(`${SUPABASE_URL}/rest/v1/billing_events`, { method: 'POST', headers: { ...sbHeaders, Prefer: 'return=minimal' }, body: JSON.stringify({ webhook_id: req.headers['webhook-id'], type: event.type }) });
    if (dup.status === 409) return res.status(200).json({ ok: true, duplicate: true });
    if (!dup.ok) throw new Error('could not record event ' + dup.status);

    const companyId = d.metadata?.company_id;
    const status = { 'subscription.active': 'active', 'subscription.renewed': 'active', 'subscription.cancelled': 'cancelled', 'subscription.on_hold': 'on_hold', 'subscription.expired': 'expired', 'subscription.failed': 'failed' }[event.type];
    if (!status) return res.status(200).json({ ok: true, ignored: event.type });
    if (!companyId) { console.error('webhook without company_id', event.type, d.subscription_id); return res.status(200).json({ ok: true, skipped: 'no company_id' }); }

    const patch = { subscription_status: status, dodo_customer_id: d.customer?.customer_id, dodo_subscription_id: d.subscription_id };
    if (status === 'active' && d.next_billing_date) patch.paid_until = new Date(new Date(d.next_billing_date).getTime() + GRACE_MS).toISOString();
    const u = await fetch(`${SUPABASE_URL}/rest/v1/companies?id=eq.${companyId}`, { method: 'PATCH', headers: { ...sbHeaders, Prefer: 'return=minimal' }, body: JSON.stringify(patch) });
    if (!u.ok) throw new Error('could not update company ' + u.status);
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('webhook error', e);
    await fetch(`${SUPABASE_URL}/rest/v1/billing_events?webhook_id=eq.${req.headers['webhook-id']}`, { method: 'DELETE', headers: sbHeaders }).catch(() => {}); // let Dodo retry
    return res.status(500).json({ error: 'Failed, will retry' });
  }
}

module.exports = handler;
module.exports.config = { api: { bodyParser: false } };
module.exports.verify = verify;
