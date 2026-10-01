// Generates digital business cards from contacts/<slug>.json:
//   public/c/<slug>.vcf             the vCard (3.0) the phone imports
//   public/c/<slug>.html            page served at /c/<slug> (redirects to the .vcf)
//   public/c/<slug>/index.html      same page, served at /c/<slug>/
// Runs before `dev` and `build`. Exits non-zero on any invalid contact so a
// broken card never deploys. Output is gitignored — edit the JSON, not these.

import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(ROOT, 'contacts')
const OUT = join(ROOT, 'public', 'c')

const ALLOWED_KEYS = ['firstName', 'lastName', 'organization', 'title', 'phones', 'emails', 'website', 'address', 'note']
const ADDRESS_KEYS = ['street', 'city', 'region', 'postalCode', 'country']
const SLUG_RE = /^[a-z0-9-]+$/
const PHONE_RE = /^\+[0-9 ()-]{7,20}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(slug, c) {
  const errors = []
  if (!SLUG_RE.test(slug)) errors.push(`filename must be lowercase letters, digits or "-" (it becomes the URL)`)
  for (const k of Object.keys(c)) if (!ALLOWED_KEYS.includes(k)) errors.push(`unknown field "${k}"`)
  if (!c.firstName && !c.lastName) errors.push('firstName or lastName is required')
  const phones = c.phones ?? []
  const emails = c.emails ?? []
  if (!Array.isArray(phones) || !Array.isArray(emails)) errors.push('phones and emails must be arrays')
  else if (!phones.length && !emails.length) errors.push('at least one phone or email is required')
  for (const p of Array.isArray(phones) ? phones : []) {
    if (!PHONE_RE.test(p?.number ?? '')) errors.push(`phone "${p?.number}" must be in international format, e.g. +919764830503`)
  }
  for (const e of Array.isArray(emails) ? emails : []) {
    if (!EMAIL_RE.test(e?.address ?? '')) errors.push(`email "${e?.address}" is not valid`)
  }
  if (c.website && !/^https?:\/\//.test(c.website)) errors.push('website must start with http:// or https://')
  if (c.address) {
    for (const k of Object.keys(c.address)) if (!ADDRESS_KEYS.includes(k)) errors.push(`unknown address field "${k}"`)
  }
  return errors
}

// --- vCard 3.0 (RFC 2426) ---

const esc = (s = '') => String(s).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1')

// Fold lines longer than 75 octets without splitting a UTF-8 character.
function fold(line) {
  const out = []
  let cur = ''
  let bytes = 0
  for (const ch of line) {
    const n = Buffer.byteLength(ch)
    const limit = out.length ? 74 : 75 // continuation lines start with a space
    if (bytes + n > limit) {
      out.push(cur)
      cur = ''
      bytes = 0
    }
    cur += ch
    bytes += n
  }
  out.push(cur)
  return out.join('\r\n ')
}

const fullName = (c) => [c.firstName, c.lastName].filter(Boolean).join(' ')

function toVCard(c) {
  const a = c.address
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${esc(c.lastName)};${esc(c.firstName)};;;`,
    `FN:${esc(fullName(c))}`,
    c.organization && `ORG:${esc(c.organization)}`,
    c.title && `TITLE:${esc(c.title)}`,
    ...(c.phones ?? []).map((p) => `TEL;TYPE=${(p.type || 'cell').toUpperCase()}:${p.number.replace(/[^\d+]/g, '')}`),
    ...(c.emails ?? []).map((e) => `EMAIL;TYPE=INTERNET,${(e.type || 'work').toUpperCase()}:${e.address}`),
    c.website && `URL:${c.website}`,
    a && `ADR;TYPE=WORK:;;${esc(a.street)};${esc(a.city)};${esc(a.region)};${esc(a.postalCode)};${esc(a.country)}`,
    c.note && `NOTE:${esc(c.note)}`,
    'END:VCARD',
  ].filter(Boolean)
  return lines.map(fold).join('\r\n') + '\r\n'
}

// --- landing page ---

const html = (s = '') =>
  String(s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch])

function toPage(slug, c) {
  const name = fullName(c)
  const vcf = `/c/${slug}.vcf`
  const phone = c.phones?.[0]?.number.replace(/[^\d+]/g, '')
  const email = c.emails?.[0]?.address
  const role = [c.title, c.organization].filter(Boolean).join(' · ')
  const links = [
    phone && `<a href="tel:${html(phone)}">Call</a>`,
    phone && `<a href="https://wa.me/${html(phone.replace('+', ''))}">WhatsApp</a>`,
    email && `<a href="mailto:${html(email)}">Email</a>`,
    c.website && `<a href="${html(c.website)}">Website</a>`,
  ].filter(Boolean)

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${html(name)} | StraViTech</title>
<link rel="icon" type="image/png" href="/assets/fav-icon.png">
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 24px 16px;
         background: #f5f7fa; color: #001f4b; font: 16px/1.5 system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }
  .card { width: 100%; max-width: 380px; background: #fff; border-radius: 16px; padding: 32px 24px; text-align: center;
          box-shadow: 0 1px 3px rgba(17,26,74,.1), 0 12px 32px rgba(0,0,0,.06); }
  img { height: 40px; margin-bottom: 20px; }
  h1 { margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -.3px; }
  p { margin: 4px 0 24px; color: #5b6b7c; font-size: 15px; }
  .save { display: block; padding: 14px; border-radius: 10px; background: #013e6b; color: #fff;
          font-weight: 600; text-decoration: none; }
  .links { display: flex; justify-content: center; flex-wrap: wrap; gap: 8px 20px; margin-top: 20px; }
  .links a { color: #008aaf; text-decoration: none; font-size: 15px; }
</style>
</head>
<body>
<main class="card">
  <img src="/assets/stravitech_logo.png" alt="StraViTech">
  <h1>${html(name)}</h1>
  ${role ? `<p>${html(role)}</p>` : ''}
  <a class="save" href="${vcf}" download="${html(name.replace(/\s+/g, '-'))}.vcf">Save contact</a>
  <div class="links">${links.join('')}</div>
</main>
<script>location.replace(${JSON.stringify(vcf)})</script>
</body>
</html>
`
}

// --- main ---

const files = readdirSync(SRC).filter((f) => f.endsWith('.json'))
const contacts = []
let failed = false

for (const file of files) {
  const slug = file.slice(0, -'.json'.length)
  let c
  try {
    c = JSON.parse(readFileSync(join(SRC, file), 'utf8'))
  } catch (err) {
    console.error(`✗ contacts/${file}: invalid JSON — ${err.message}`)
    failed = true
    continue
  }
  const errors = validate(slug, c)
  if (errors.length) {
    for (const e of errors) console.error(`✗ contacts/${file}: ${e}`)
    failed = true
    continue
  }
  contacts.push([slug, c])
}

if (failed) process.exit(1)

rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })
for (const [slug, c] of contacts) {
  const page = toPage(slug, c)
  writeFileSync(join(OUT, `${slug}.vcf`), toVCard(c))
  writeFileSync(join(OUT, `${slug}.html`), page)
  mkdirSync(join(OUT, slug), { recursive: true })
  writeFileSync(join(OUT, slug, 'index.html'), page)
}
console.log(`✓ contacts: generated ${contacts.length} card(s) → /c/{${contacts.map(([s]) => s).join(',')}}`)
