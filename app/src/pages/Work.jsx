import { Reveal, Item } from '../lib/motion'
import { Icon } from '../components/ui'
import { CTA, PageHero, Testimonials } from '../components/Sections'

const caseStudies = [
  {
    logo: '/assets/krisha-logo.jpg',
    logoW: 600,
    logoH: 403,
    name: 'Krisha Mechatronics',
    category: 'Field Service Management',
    summary:
      'A field service platform with dedicated customer and staff apps — replacing phone-call coordination with real-time visibility.',
    challenge:
      'Field jobs were coordinated by phone and memory. Customers had no visibility, technicians worked off scattered instructions, and jobs slipped through the cracks.',
    built: [
      'Separate customer and staff mobile apps',
      'Job scheduling and assignment',
      'On-site service tracking with live status',
      'Secure cloud backend with real-time sync',
    ],
    outcome:
      'Customers and technicians now work from the same source of truth, and every job is tracked from request to completion.',
    tags: ['Customer & staff apps', 'Scheduling', 'Live tracking'],
  },
  {
    logo: '/assets/marriotz-logo.png',
    logoW: 434,
    logoH: 149,
    name: 'Marriotz Electromech',
    category: 'Commercial Document System',
    summary:
      'A full commercial document platform that turned hours of manual quoting and invoicing into minutes — with GST handled automatically.',
    challenge:
      'Quotations, invoices and purchase orders were prepared by hand — slow, inconsistent and error-prone, with GST adding constant complexity.',
    built: [
      'Quotations → proforma & tax invoices, POs, debit/credit notes',
      'GST-aware tax engine (IGST vs CGST/SGST)',
      'Instant, on-brand PDF generation',
      'Master data, document numbering & templates',
      'Role-based access with a full audit trail',
    ],
    outcome:
      'Documents that used to take hours now take minutes, nothing slips through, and every figure is precise and traceable.',
    tags: ['Quotations & invoices', 'GST engine', 'PDF export'],
  },
]

function CaseStudies() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-container mx-auto px-4 md:px-12 space-y-16 md:space-y-24">
        {caseStudies.map((c, i) => (
          <Reveal key={c.name} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Visual panel */}
            <Item className={i % 2 ? 'md:order-2' : ''}>
              <div className="relative bg-card rounded-2xl shadow-float p-8 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-sky/10 blur-3xl" aria-hidden="true" />
                <div className="relative">
                  <div className="h-16 flex items-center mb-6">
                    <img src={c.logo} alt={`${c.name} logo`} loading="lazy" width={c.logoW} height={c.logoH} className="max-h-12 w-auto object-contain" />
                  </div>
                  <span className="inline-flex bg-cyan-pale text-[#015e74] rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider mb-5">
                    {c.category}
                  </span>
                  <p className="text-body text-slate-muted mb-6">{c.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span key={t} className="text-caption text-slate-muted border border-mist px-3 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Item>

            {/* Narrative */}
            <Item className={i % 2 ? 'md:order-1' : ''}>
              <h2 className="text-heading font-light tracking-tight text-ink mb-6">{c.name}</h2>
              <div className="space-y-5">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-forest-teal mb-1.5">The challenge</div>
                  <p className="text-body text-slate-muted">{c.challenge}</p>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-forest-teal mb-2">What we built</div>
                  <ul className="space-y-2">
                    {c.built.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-body text-slate-muted">
                        <Icon name="check_circle" className="text-forest-teal mt-0.5 shrink-0" size={18} /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-forest-teal mb-1.5">The outcome</div>
                  <p className="text-body text-ink">{c.outcome}</p>
                </div>
              </div>
            </Item>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default function WorkPage() {
  return (
    <>
      <PageHero
        badge="Our work"
        title="Real software,"
        highlight="delivered for real businesses."
        subtitle="Production platforms built end-to-end — understood first, engineered for precision, and supported well past delivery."
      />
      <CaseStudies />
      <Testimonials />
      <CTA />
    </>
  )
}
