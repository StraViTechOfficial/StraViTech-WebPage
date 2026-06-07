import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Reveal, Item } from '../lib/motion'
import { Badge, Counter, GhostButton, Icon, PrimaryButton, TiltCard } from './ui'
import { Magnetic, WordReveal, useParallax } from './effects'
import Toast from './Toast'
import { CALENDLY, FORMSPREE_ENDPOINT, WHATSAPP_HREF } from '../lib/links'
import BlocksScene from './BlocksScene'

/* ---------------- Shared section header ---------------- */
function SectionHeader({ badge, title, highlight, subtitle, center = false, className = '' }) {
  return (
    <Reveal className={`max-w-2xl mb-14 ${center ? 'mx-auto text-center' : ''} ${className}`}>
      {badge && (
        <Item>
          <Badge className="mb-5">{badge}</Badge>
        </Item>
      )}
      <Item as="h2" className="text-heading-lg font-light tracking-tight">
        {title} {highlight && <span className="text-fog">{highlight}</span>}
      </Item>
      {subtitle && (
        <Item as="p" className="text-body text-slate-muted mt-4">
          {subtitle}
        </Item>
      )}
    </Reveal>
  )
}

/* ---------------- Page hero (sub-pages) ---------------- */
export function PageHero({ badge, title, highlight, subtitle }) {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-32 pb-12 md:pb-16">
      <div className="absolute inset-0 grid-lines -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000,transparent_75%)]" aria-hidden="true" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[640px] h-[360px] rounded-full bg-sky/10 blur-[120px] -z-10" aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-container mx-auto px-4 md:px-12 text-center"
      >
        <Badge className="mb-5">{badge}</Badge>
        <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.06] font-light tracking-tight mb-4 max-w-3xl mx-auto">
          {title} {highlight && <span className="text-fog">{highlight}</span>}
        </h1>
        {subtitle && <p className="text-body-lg text-slate-muted max-w-2xl mx-auto">{subtitle}</p>}
      </motion.div>
    </section>
  )
}

/* ---------------- Hero ---------------- */
export function Hero() {
  const ref = useRef(null)
  const y = useParallax(ref, 70)

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="absolute inset-0 grid-lines -z-10 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_10%,#000,transparent_78%)]" aria-hidden="true" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-sky/10 blur-[120px] -z-10" aria-hidden="true" />
      <div className="max-w-container mx-auto px-4 md:px-12 pt-16 pb-16 md:pt-20 md:pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:items-start">
        <div className="min-w-0">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <Badge className="mb-7">For manufacturing &amp; engineering businesses</Badge>
          </motion.div>
          <WordReveal
            text="Technology that finally understands your business."
            highlight="understands"
            highlightClass="text-shimmer font-normal"
            className="text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.08] font-light tracking-tight mb-6 text-balance"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-body-lg text-slate-muted max-w-md mb-9"
          >
            We're the growth partner for established manufacturing, engineering and mechanical
            businesses — we understand your world first, then build the systems that make you efficient
            and ready to scale. And we stay with you after delivery.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-3"
          >
            <Magnetic><PrimaryButton href={CALENDLY} newTab>Book a call</PrimaryButton></Magnetic>
            <Magnetic strength={0.3}><GhostButton to="/work">See our work</GhostButton></Magnetic>
          </motion.div>
        </div>

        {/* Hero visual (scroll-parallax) */}
        <motion.div
          className="relative min-w-0"
          style={{ y }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <BlocksScene />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="hidden md:flex justify-center pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-fog"
        >
          <span className="font-mono text-[10px] uppercase tracking-wider">Scroll</span>
          <Icon name="keyboard_arrow_down" size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ---------------- The Gap ---------------- */
const pains = [
  { icon: 'web_asset_off', title: 'Built for namesake', body: 'A website or tool that existed in name only — and that nobody actually ended up using.' },
  { icon: 'translate', title: 'Jargon, not business', body: 'Explanations that made you feel lost, instead of a partner who spoke your language.' },
  { icon: 'running_with_errors', title: 'Slow, then silent', body: 'A firm that took the advance, moved slowly, and went quiet after delivery.' },
]

export function Gap() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-container mx-auto px-4 md:px-12">
        <SectionHeader
          badge="Sound familiar?"
          title="You've probably been"
          highlight="let down before."
          subtitle="The problem was never your interest in technology — you were simply under-served. That stops here."
        />
        <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pains.map((p) => (
            <Item key={p.title}>
              <div className="bg-card rounded-2xl shadow-card p-7 h-full">
                <span className="w-10 h-10 rounded-lg bg-paper flex items-center justify-center mb-5">
                  <Icon name={p.icon} className="text-slate-muted" size={20} />
                </span>
                <h3 className="text-heading-sm font-normal text-ink mb-2">{p.title}</h3>
                <p className="text-body text-slate-muted">{p.body}</p>
              </div>
            </Item>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- The Bridge ---------------- */
export function Bridge() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-container mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
        <Reveal>
          <Item><Badge className="mb-5">The bridge</Badge></Item>
          <Item as="h2" className="text-heading-lg font-light tracking-tight mb-6">
            We carry both worlds <span className="text-fog">in one team.</span>
          </Item>
          <Item as="p" className="text-body-lg text-slate-muted mb-5">
            Most IT firms don't understand a manufacturing or engineering business. Most owners don't have
            the time to translate between the two. We do both.
          </Item>
          <Item as="p" className="text-body text-slate-muted">
            We come from your world and built the technology capability to serve it — so your business is
            understood first, and the right thing gets built second.
          </Item>
        </Reveal>
        <Reveal>
          <Item>
            <div className="relative bg-card rounded-2xl shadow-float p-8 overflow-hidden">
              <div className="absolute -top-16 right-0 w-56 h-56 rounded-full bg-sky/10 blur-3xl" aria-hidden="true" />
              <div className="relative flex items-center gap-4">
                <div className="flex-1 text-center bg-paper rounded-xl p-5">
                  <Icon name="precision_manufacturing" className="text-indigo-brand" size={28} />
                  <div className="text-body-sm font-medium text-ink mt-2">Your world</div>
                  <div className="text-caption text-slate-muted mt-0.5">Engineering &amp; manufacturing</div>
                </div>
                <Icon name="sync_alt" className="text-forest-teal shrink-0" size={26} />
                <div className="flex-1 text-center bg-paper rounded-xl p-5">
                  <Icon name="memory" className="text-indigo-brand" size={28} />
                  <div className="text-body-sm font-medium text-ink mt-2">Technology</div>
                  <div className="text-caption text-slate-muted mt-0.5">Software, mobile &amp; cloud</div>
                </div>
              </div>
              <div className="relative mt-5 text-center">
                <span className="inline-flex bg-cyan-pale text-[#015e74] rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider">
                  One team · understood first
                </span>
              </div>
            </div>
          </Item>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- What We Do (3 outcomes — hybrid) ---------------- */
const outcomes = [
  {
    icon: 'public',
    title: 'Digital Presence',
    tagline: 'Be found, and look the part.',
    body: 'A professional website and online footprint that make a serious business look serious — and win bigger clients.',
    includes: ['Professional websites', 'Full online presence', 'Performance & SEO', 'Brand-consistent design'],
  },
  {
    icon: 'build',
    title: 'Custom Solutions',
    tagline: 'Systems built around how you actually work.',
    body: 'Software shaped to your operations — from a focused tool to a full platform, across web and mobile.',
    includes: ['ERPs & billing systems', 'Document & invoicing platforms', 'Field-service management', 'Mobile apps'],
  },
  {
    icon: 'speed',
    title: 'Operational Efficiency',
    tagline: 'Save time, remove manual error.',
    body: 'Automation and systems that take the manual, error-prone work off your plate so you can focus on the business.',
    includes: ['Workflow automation', 'GST & compliance, handled', 'Audit-ready records', 'Less manual rework'],
  },
]

export function Outcomes({ detailed = false, showAll = false }) {
  return (
    <section className="py-16 md:py-20" id="services">
      <div className="max-w-container mx-auto px-4 md:px-12">
        <SectionHeader
          badge="What we do"
          title="We help your business"
          highlight="move forward."
          subtitle="Outcomes, not features — here's what actually changes for you."
        />

        {detailed ? (
          <div>
            {outcomes.map((o) => (
              <Reveal key={o.title} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 py-10 border-b border-mist last:border-0">
                <Item className="md:col-span-1">
                  <span className="w-12 h-12 rounded-xl bg-paper flex items-center justify-center mb-4">
                    <Icon name={o.icon} className="text-indigo-brand" size={22} />
                  </span>
                  <h2 className="text-heading-sm font-normal text-ink mb-1">{o.title}</h2>
                  <div className="text-body-sm font-medium text-forest-teal mb-3">{o.tagline}</div>
                  <p className="text-body text-slate-muted">{o.body}</p>
                </Item>
                <Item className="md:col-span-2 grid sm:grid-cols-2 gap-3 self-center">
                  {o.includes.map((d) => (
                    <div key={d} className="flex items-start gap-2.5 bg-card rounded-xl shadow-card p-4">
                      <Icon name="check_circle" className="text-forest-teal mt-0.5 shrink-0" size={18} />
                      <span className="text-body-sm text-ink">{d}</span>
                    </div>
                  ))}
                </Item>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {outcomes.map((o) => (
              <Item key={o.title}>
                <TiltCard max={5} glare className="bg-card rounded-2xl shadow-card hover:shadow-float transition-shadow duration-500 p-7 h-full">
                  <span className="w-10 h-10 rounded-lg bg-paper flex items-center justify-center mb-5">
                    <Icon name={o.icon} className="text-indigo-brand" size={20} />
                  </span>
                  <h3 className="text-heading-sm font-normal text-ink mb-1">{o.title}</h3>
                  <div className="text-body-sm font-medium text-forest-teal mb-2">{o.tagline}</div>
                  <p className="text-body text-slate-muted">{o.body}</p>
                </TiltCard>
              </Item>
            ))}
          </Reveal>
        )}

        {showAll && (
          <Reveal className="mt-8">
            <Item>
              <Link to="/services" className="group inline-flex items-center gap-1.5 text-body-sm font-medium text-indigo-brand">
                Explore all services <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Item>
          </Reveal>
        )}
      </div>
    </section>
  )
}

/* ---------------- Partnership Promise ---------------- */
const commitments = [
  "We never give up on understanding you until you're genuinely satisfied.",
  'We never under-deliver — you get everything you expect, not the convenient minimum.',
  'We never leave your hand — we stay long after launch.',
]

export function Promise() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-container mx-auto px-4 md:px-12">
        <div className="rounded-[28px] bg-[#eaf3f7] p-8 md:p-14">
          <Reveal className="max-w-3xl">
            <Item><Badge className="mb-5">Our promise</Badge></Item>
            <Item as="h2" className="text-heading-lg font-light tracking-tight mb-8">
              We don't disappear. <span className="text-fog">We stay in your corner.</span>
            </Item>
          </Reveal>
          <Reveal className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {commitments.map((c) => (
              <Item key={c}>
                <div className="flex items-start gap-3">
                  <Icon name="check_circle" className="text-forest-teal mt-0.5 shrink-0" size={20} />
                  <p className="text-body text-ink">{c}</p>
                </div>
              </Item>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Metrics ---------------- */
const metrics = [
  { to: 2, suffix: '+', label: 'Products delivered' },
  { to: 400, suffix: '%', label: 'Faster workflows' },
  { to: 100, suffix: '%', label: 'Compliance focus' },
  { to: 24, suffix: '/7', label: 'Support & uptime' },
]

export function Metrics() {
  return (
    <section className="py-16 border-y border-mist" aria-label="Key metrics">
      <Reveal className="max-w-container mx-auto px-4 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {metrics.map((m) => (
          <Item key={m.label}>
            <div className="text-heading-lg font-light text-ink">
              <Counter to={m.to} suffix={m.suffix} />
            </div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-slate-muted mt-2">
              {m.label}
            </div>
          </Item>
        ))}
      </Reveal>
    </section>
  )
}

/* ---------------- Services ---------------- */
const servicesList = [
  {
    icon: 'update',
    title: 'Digital Transformation',
    body: 'Modernizing legacy websites and tech stacks into high-performance, cloud-native architectures.',
    list: ['Cloud migration', 'Legacy modernization'],
  },
  {
    icon: 'terminal',
    title: 'Custom Software',
    body: 'Bespoke ERPs, billing & document systems, field-service and mobile apps — built end-to-end.',
    list: ['Enterprise ERPs & billing', 'Field-service & mobile apps'],
  },
  {
    icon: 'account_balance',
    title: 'Compliance & Finance',
    body: 'GST, company registration, and monthly filings handled with automated precision and security.',
    list: ['GST & monthly filings', 'Company registration'],
  },
  {
    icon: 'auto_awesome',
    title: 'Social Media & AI Content',
    body: 'Generative AI for content creation, automated management, and data-driven engagement.',
    list: ['AI content generation', 'Automation workflows'],
  },
]

function ServiceCard({ icon, title, body, list, className = '' }) {
  return (
    <TiltCard max={5} glare className={`bg-card rounded-2xl shadow-card hover:shadow-float transition-shadow duration-500 p-6 h-full ${className}`}>
      <span className="w-10 h-10 rounded-lg bg-paper flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105">
        <Icon name={icon} className="text-indigo-brand" size={20} />
      </span>
      <h3 className="text-heading-sm font-normal text-ink mb-2">{title}</h3>
      <p className="text-body text-slate-muted">{body}</p>
      {list && (
        <ul className="space-y-2 mt-4">
          {list.map((li) => (
            <li key={li} className="flex items-center gap-2 text-body-sm text-slate-muted">
              <Icon name="check_circle" className="text-forest-teal" size={16} /> {li}
            </li>
          ))}
        </ul>
      )}
    </TiltCard>
  )
}

export function Services({ showAll = false }) {
  return (
    <section className="py-16 md:py-20" id="services">
      <div className="max-w-container mx-auto px-4 md:px-12">
        <SectionHeader
          badge="Our expertise"
          title="Comprehensive solutions"
          highlight="engineered for precision."
          subtitle="From legacy modernization to AI content — full-stack capability under one roof."
        />

        <Reveal className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {servicesList.map((s) => (
            <Item key={s.title}>
              <ServiceCard icon={s.icon} title={s.title} body={s.body} list={s.list} />
            </Item>
          ))}
        </Reveal>

        <Reveal className="mt-8">
          <Item>
            {showAll ? (
              <Link to="/services" className="group inline-flex items-center gap-1.5 text-body-sm font-medium text-indigo-brand">
                Explore all services <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            ) : (
              <Link to="/contact" className="group inline-flex items-center gap-1.5 text-body-sm font-medium text-indigo-brand">
                Discuss your project <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            )}
          </Item>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- Work ---------------- */
export function Work({ showAll = false }) {
  return (
    <section className="py-16 md:py-20 relative" id="work">
      <div className="max-w-container mx-auto px-4 md:px-12">
        <SectionHeader
          badge="Proven results"
          title="Real software,"
          highlight="delivered for real businesses."
          subtitle="Two production platforms, built end-to-end for precision, scale, and day-one reliability."
        />

        <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Krisha */}
          <Item>
            <TiltCard max={4} glare className="bg-card rounded-2xl shadow-card hover:shadow-float transition-shadow duration-500 p-8 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <img src="/assets/krisha-logo.jpg" alt="Krisha Mechatronics logo" loading="lazy" width="600" height="403" className="h-10 w-auto object-contain rounded-lg" />
                <span className="bg-cyan-pale text-[#015e74] rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider">Field Service</span>
              </div>
              <h3 className="text-heading-sm font-normal text-ink mb-3">Krisha Mechatronics — FSM Platform</h3>
              <p className="text-body text-slate-muted mb-6 flex-1">
                A field service management platform with dedicated customer and staff apps — streamlining
                job scheduling, on-site service tracking, and real-time coordination.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Customer & staff apps', 'Job scheduling', 'Live tracking'].map((t) => (
                  <span key={t} className="text-caption text-slate-muted border border-mist px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </TiltCard>
          </Item>

          {/* Marriotz (ember accent) */}
          <Item>
            <TiltCard max={4} glare className="bg-card rounded-2xl shadow-card hover:shadow-float transition-shadow duration-500 p-8 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <img src="/assets/marriotz-logo.png" alt="Marriotz Electromech logo" loading="lazy" width="434" height="149" className="h-8 w-auto object-contain" />
                <span className="bg-cyan-pale text-[#015e74] rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider">Document System</span>
              </div>
              <h3 className="text-heading-sm font-normal text-ink mb-3">Marriotz — Document Management System</h3>
              <p className="text-body text-slate-muted mb-6 flex-1">
                A full commercial document platform for Marriotz Electromech — quotations, proforma &amp;
                tax invoices, purchase orders and debit/credit notes, with a GST-aware tax engine and
                instant PDF generation.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Quotations & invoices', 'Purchase orders', 'GST billing'].map((t) => (
                  <span key={t} className="text-caption text-slate-muted border border-mist px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </TiltCard>
          </Item>
        </Reveal>

        {showAll && (
          <Reveal className="mt-8">
            <Item>
              <Link to="/work" className="group inline-flex items-center gap-1.5 text-body-sm font-medium text-indigo-brand">
                View all work <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Item>
          </Reveal>
        )}
      </div>
    </section>
  )
}

/* ---------------- Process ---------------- */
const steps = [
  { n: '01', icon: 'search', title: 'Understand', body: 'We learn your business, your domain and where the real gaps are — before we propose anything.' },
  { n: '02', icon: 'route', title: 'Plan', body: 'We define a clear, honest roadmap, so you always know what is happening and why.' },
  { n: '03', icon: 'code', title: 'Build', body: 'We engineer the solution with precision, staying responsive and keeping you in the loop.' },
  { n: '04', icon: 'handshake', title: 'Stay', body: "We don't disappear after delivery — we stay as your partner as you grow." },
]

export function Process() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-container mx-auto px-4 md:px-12">
        <SectionHeader
          badge="How we work"
          title="A calm, clear process —"
          highlight="and we stay to the end."
          subtitle="No jargon, no disappearing act. You'll always know what's happening and why."
        />
        <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s) => (
            <Item key={s.n}>
              <div className="group bg-card rounded-2xl shadow-card hover:shadow-float transition-shadow duration-500 p-7 h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="w-12 h-12 rounded-xl bg-indigo-brand text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <Icon name={s.icon} size={22} />
                  </span>
                  <span className="font-mono text-heading-lg font-light text-mist leading-none">{s.n}</span>
                </div>
                <h3 className="text-heading-sm font-normal text-ink mb-2">{s.title}</h3>
                <p className="text-body text-slate-muted">{s.body}</p>
              </div>
            </Item>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- Testimonials ---------------- */
const quotes = [
  {
    text: 'What stood out was that they actually understood how our field team works before building anything. Now our customers and technicians are on the same page, and every job is tracked instead of lost in phone calls.',
    by: 'Krisha Mechatronics — Field Service Management',
  },
  {
    text: 'They got our business, not just the software. Quotations and invoices that used to eat up hours now take minutes, and nothing slips through the cracks. They stayed with us well past delivery, too.',
    by: 'Marriotz Electromech — Electrical Contracting & Engineering',
  },
]

export function Testimonials() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-container mx-auto px-4 md:px-12">
        <SectionHeader
          badge="Client voices"
          title="What our clients say."
          subtitle="Trusted by teams who needed precision software, delivered."
        />
        <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {quotes.map((q) => (
            <Item as="figure" key={q.by}>
              <span className="text-heading-lg font-light text-fog leading-none">“</span>
              <blockquote className="text-subheading font-light text-ink -mt-4 mb-5">{q.text}</blockquote>
              <figcaption className="text-body-sm text-slate-muted">{q.by}</figcaption>
            </Item>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- About ---------------- */
const pillars = [
  { icon: 'verified_user', title: 'Compliance-first', body: 'Security & filings built in' },
  { icon: 'bolt', title: 'AI-accelerated', body: 'Faster delivery, less toil' },
  { icon: 'groups', title: 'Both worlds, one team', body: 'Engineering + technology' },
  { icon: 'trending_up', title: 'Built to scale', body: 'Cloud-native by default' },
]

export function About() {
  return (
    <section className="py-16 md:py-20" id="about">
      <div className="max-w-container mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <Reveal>
          <Item><Badge className="mb-5">Our mission</Badge></Item>
          <Item as="h2" className="text-heading-lg font-light tracking-tight mb-6">
            Bridging tradition <span className="text-fog">with technology.</span>
          </Item>
          <Item as="p" className="text-body-lg text-slate-muted mb-5">
            We exist to close one gap: the distance between technical, hands-on businesses and the
            technology that could scale them.
          </Item>
          <Item as="p" className="text-body text-slate-muted mb-7">
            We come from the engineering and manufacturing world ourselves — so we understand your business
            first, then build the systems that make it efficient and ready to grow. We don't disappear after
            delivery; we stay as a partner.
          </Item>
          <Item>
            <Link to="/contact" className="group text-body-sm font-medium text-indigo-brand inline-flex items-center gap-1.5">
              Work with us <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Item>
        </Reveal>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 dot-field opacity-50" aria-hidden="true" />
          <TiltCard max={6} className="bg-card rounded-2xl shadow-float p-6 grid grid-cols-2 gap-4">
            {pillars.map((p) => (
              <div key={p.title} className="bg-paper rounded-xl p-5">
                <Icon name={p.icon} className="text-indigo-brand" />
                <div className="text-body-sm font-medium text-ink mt-3">{p.title}</div>
                <div className="text-caption text-slate-muted mt-1">{p.body}</div>
              </div>
            ))}
          </TiltCard>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------- Contact form (used on the Contact page) ---------------- */
export function ContactForm({ heading = 'Tell us about your project.', subheading = "We'll get back to you within one business day." }) {
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!status) return undefined
    const t = setTimeout(() => setStatus(null), status.ok ? 6000 : 5000)
    return () => clearTimeout(t)
  }, [status])

  async function onSubmit(e) {
    e.preventDefault()
    const f = e.currentTarget
    const name = f.name.value.trim()
    const email = f.email.value.trim()
    const message = f.message.value.trim()
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!name || !validEmail || !message) {
      setStatus({ ok: false, msg: 'Please fill in your name, a valid email, and a message.' })
      return
    }
    setSubmitting(true)
    setStatus(null)
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(f),
      })
      if (res.ok) {
        setStatus({
          ok: true,
          title: 'Message sent!',
          msg: `Thanks, ${name} — we've received your enquiry and will reach out to you soon (usually within one business day).`,
        })
        f.reset()
      } else {
        setStatus({ ok: false, msg: 'Something went wrong sending that. Please try again or reach us on WhatsApp.' })
      }
    } catch {
      setStatus({ ok: false, msg: 'Network error — please try again, or reach us on WhatsApp.' })
    } finally {
      setSubmitting(false)
    }
  }

  const field =
    'w-full bg-card border border-mist rounded-lg py-3 px-4 text-body text-ink placeholder:text-fog focus:border-indigo-brand focus:ring-2 focus:ring-indigo-brand/20 focus:outline-none transition-colors'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="glass shadow-float rounded-2xl p-8 md:p-10"
    >
      <div className="mb-8">
        <Badge className="mb-5">Get in touch</Badge>
        <h2 className="text-heading font-light tracking-tight">{heading}</h2>
        <p className="text-body text-slate-muted mt-3">{subheading}</p>
      </div>
      <form className="space-y-5" onSubmit={onSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-body-sm font-medium text-ink mb-2">
                  Full name <span className="text-ember">*</span>
                </label>
                <input id="name" name="name" type="text" autoComplete="name" placeholder="John Doe" className={field} />
              </div>
              <div>
                <label htmlFor="email" className="block text-body-sm font-medium text-ink mb-2">
                  Email address <span className="text-ember">*</span>
                </label>
                <input id="email" name="email" type="email" autoComplete="email" placeholder="john@company.com" className={field} />
              </div>
            </div>
            <div>
              <label htmlFor="company" className="block text-body-sm font-medium text-ink mb-2">Business / company</label>
              <input id="company" name="company" type="text" autoComplete="organization" placeholder="Your business name" className={field} />
            </div>
            <div>
              <label htmlFor="message" className="block text-body-sm font-medium text-ink mb-2">
                What do you need? <span className="text-ember">*</span>
              </label>
              <textarea id="message" name="message" rows="4" placeholder="A line or two about what you're looking for..." className={field} />
            </div>
            <motion.button
              type="submit"
              disabled={submitting}
              whileTap={submitting ? undefined : { scale: 0.98 }}
              whileHover={submitting ? undefined : { y: -1 }}
              className="w-full inline-flex items-center justify-center gap-1.5 bg-indigo-brand text-white py-3.5 rounded-lg text-body-sm font-medium shadow-card hover:shadow-btn-hover disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Sending…' : (<>Send message <span className="text-white/80">→</span></>)}
            </motion.button>
      </form>
      <Toast status={status} onClose={() => setStatus(null)} />
    </motion.div>
  )
}

/* ---------------- Bold CTA band ---------------- */
const ctaParticles = [
  { l: '10%', t: '24%', s: 3, d: 0 }, { l: '24%', t: '68%', s: 2, d: 1.2 },
  { l: '38%', t: '32%', s: 4, d: 0.6 }, { l: '54%', t: '78%', s: 2, d: 2 },
  { l: '68%', t: '26%', s: 3, d: 0.9 }, { l: '84%', t: '60%', s: 2, d: 1.5 },
  { l: '16%', t: '84%', s: 2, d: 2.4 }, { l: '90%', t: '36%', s: 3, d: 0.3 },
  { l: '33%', t: '52%', s: 2, d: 1.8 }, { l: '62%', t: '46%', s: 3, d: 1.1 },
  { l: '78%', t: '80%', s: 2, d: 0.5 }, { l: '48%', t: '16%', s: 2, d: 2.2 },
]

export function CTA() {
  const reduce = useReducedMotion()
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-container mx-auto px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[28px] mesh-dark px-6 py-20 md:px-16 md:py-28 text-center ring-1 ring-white/10 shadow-float"
        >
          {/* Rotating conic aurora */}
          {!reduce && (
            <motion.div
              className="absolute left-1/2 top-1/2 w-[820px] h-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 pointer-events-none"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0deg, rgba(18,165,201,0.75) 40deg, transparent 110deg, rgba(0,138,175,0.65) 180deg, transparent 250deg, rgba(92,213,248,0.6) 310deg, transparent 360deg)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            />
          )}
          {/* Drifting glow blobs (bigger, brighter, faster) */}
          <motion.div
            className="absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full blur-[90px]"
            style={{ background: 'radial-gradient(circle, rgba(18,165,201,0.7), transparent 70%)' }}
            animate={reduce ? undefined : { x: [0, 90, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute -bottom-36 -right-20 w-[540px] h-[540px] rounded-full blur-[100px]"
            style={{ background: 'radial-gradient(circle, rgba(0,138,175,0.65), transparent 70%)' }}
            animate={reduce ? undefined : { x: [0, -90, 0], y: [0, -50, 0], scale: [1, 1.25, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-[380px] h-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
            style={{ background: 'radial-gradient(circle, rgba(92,213,248,0.45), transparent 70%)' }}
            animate={reduce ? undefined : { scale: [1, 1.35, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          {/* Floating twinkling particles */}
          {!reduce && (
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
              {ctaParticles.map((p, i) => (
                <motion.span
                  key={i}
                  className="absolute rounded-full bg-cyan-pale"
                  style={{
                    left: p.l,
                    top: p.t,
                    width: p.s + 1,
                    height: p.s + 1,
                    boxShadow: '0 0 8px 1px rgba(92,213,248,0.7)',
                  }}
                  animate={{ opacity: [0.2, 0.95, 0.2], y: [0, -18, 0], scale: [1, 1.4, 1] }}
                  transition={{ duration: 3.5 + p.s, delay: p.d, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
            </div>
          )}
          {/* Texture + top highlight */}
          <div className="absolute inset-0 grain opacity-20 mix-blend-overlay" aria-hidden="true" />
          <div className="absolute inset-0 dot-field opacity-[0.06]" aria-hidden="true" />
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" aria-hidden="true" />
          <div className="relative">
            <Reveal>
              <Item>
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white/90 mb-7">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-pale" /> Let's build
                </span>
              </Item>
              <Item
                as="h2"
                className="text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] font-light tracking-tight text-white mb-6"
              >
                Have a project in mind? <br className="hidden md:block" />
                Let's make it <span className="italic text-shimmer">exceptional.</span>
              </Item>
              <Item as="p" className="text-body-lg text-white/70 max-w-xl mx-auto mb-9">
                Tell us where you want your business to go. We'll engineer the software, automation, and AI to
                get you there.
              </Item>
              <Item className="flex flex-wrap gap-3 justify-center">
                <Magnetic>
                  <a
                    href={CALENDLY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-white text-indigo-brand text-body-sm font-medium px-7 py-3.5 rounded-lg hover:shadow-[0_0_40px_-6px_rgba(255,255,255,0.6)] transition-shadow"
                  >
                    Book a call <span>→</span>
                  </a>
                </Magnetic>
                <Magnetic strength={0.3}>
                  <Link
                    to="/work"
                    className="inline-flex items-center gap-1.5 text-white text-body-sm font-medium px-6 py-3.5 rounded-lg border border-white/25 hover:bg-white/10 transition-colors"
                  >
                    See our work <span className="text-white/60">›</span>
                  </Link>
                </Magnetic>
              </Item>
            </Reveal>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------- Footer ---------------- */
export function Footer() {
  const cols = [
    {
      title: 'What we do',
      items: [
        { label: 'Digital Presence', to: '/services' },
        { label: 'Custom Solutions', to: '/services' },
        { label: 'Operational Efficiency', to: '/services' },
      ],
    },
    {
      title: 'Company',
      items: [
        { label: 'Our Work', to: '/work' },
        { label: 'About', to: '/about' },
        { label: 'Contact', to: '/contact' },
      ],
    },
  ]
  return (
    <footer className="border-t border-mist py-16 relative overflow-hidden">
      <div className="absolute bottom-0 inset-x-0 h-32 dot-field opacity-40 -z-10" aria-hidden="true" />
      <div className="max-w-container mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <img alt="StraViTech" className="h-10 w-auto mb-5" src="/assets/logo-mark.png" width="842" height="296" />
          <p className="text-body text-slate-muted max-w-sm mb-7">
            The growth partner that understands your business and the technology to scale it —
            Strategy · Vision · Technology.
          </p>
          <div className="flex gap-2">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" aria-label="Book a call" className="w-10 h-10 rounded-lg bg-card shadow-card flex items-center justify-center text-slate-muted hover:text-indigo-brand transition-colors">
              <Icon name="event" className="text-xl" />
            </a>
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-lg bg-card shadow-card flex items-center justify-center text-slate-muted hover:text-indigo-brand transition-colors">
              <Icon name="chat" className="text-xl" />
            </a>
            <a href="mailto:connect@stravitech.in" aria-label="Email" className="w-10 h-10 rounded-lg bg-card shadow-card flex items-center justify-center text-slate-muted hover:text-indigo-brand transition-colors">
              <Icon name="mail" className="text-xl" />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-ink mb-5">{c.title}</h3>
              <ul className="space-y-3">
                {c.items.map((it) => (
                  <li key={it.label}>
                    <Link to={it.to} className="text-body-sm text-slate-muted hover:text-ink transition-colors">{it.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-container mx-auto px-4 md:px-12 mt-14 pt-8 border-t border-mist">
        <p className="font-mono text-[11px] uppercase tracking-wider text-fog text-center">
          © 2026 StraViTech Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
