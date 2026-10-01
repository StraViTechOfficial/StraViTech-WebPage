// Generates contact cards from contacts/<slug>.json:
//   public/c/<slug>.vcf        vCard 3.0 served at /c/<slug>.vcf (shareable link)
//   contacts/qr/<slug>.svg|png  with --qr: print-ready QR that holds the vCard
//                               itself, so scanners show "Add contact" directly
// Runs before `dev` and `build`. Exits non-zero on any invalid contact so a
// broken card never deploys. Outputs are gitignored — edit the JSON, not these.

import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(ROOT, 'contacts')
const OUT = join(ROOT, 'public', 'c')
const QR_OUT = join(SRC, 'qr')

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

function toVCard(c, { foldLines = true } = {}) {
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
  return (foldLines ? lines.map(fold) : lines).join('\r\n') + '\r\n'
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
for (const [slug, c] of contacts) writeFileSync(join(OUT, `${slug}.vcf`), toVCard(c))
console.log(`✓ contacts: generated ${contacts.length} vCard(s) → /c/{${contacts.map(([s]) => s).join(',')}}.vcf`)

if (process.argv.includes('--qr')) {
  // Unfolded lines: some scanner apps don't unfold RFC 2426 continuation lines.
  // Error correction M + 4-module quiet zone is the print standard.
  const QRCode = (await import('qrcode')).default
  const opts = { errorCorrectionLevel: 'M', margin: 4, color: { dark: '#000000', light: '#ffffff' } }
  rmSync(QR_OUT, { recursive: true, force: true })
  mkdirSync(QR_OUT, { recursive: true })
  for (const [slug, c] of contacts) {
    const data = toVCard(c, { foldLines: false })
    writeFileSync(join(QR_OUT, `${slug}.svg`), await QRCode.toString(data, { ...opts, type: 'svg' }))
    await QRCode.toFile(join(QR_OUT, `${slug}.png`), data, { ...opts, width: 1200 })
  }
  console.log(`✓ contacts: QR codes → contacts/qr/{${contacts.map(([s]) => s).join(',')}}.{svg,png}`)
}
