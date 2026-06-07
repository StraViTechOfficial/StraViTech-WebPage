import { motion } from 'framer-motion'
import { ContactForm } from '../components/Sections'
import { Badge, Icon } from '../components/ui'
import { CALENDLY, WHATSAPP_HREF } from '../lib/links'

const channels = [
  { icon: 'event', label: 'Book a call', value: 'Pick a time that suits you', href: CALENDLY, external: true },
  { icon: 'chat', label: 'WhatsApp', value: '+91 97648 30503', href: WHATSAPP_HREF, external: true },
  { icon: 'mail', label: 'Email us', value: 'connect@stravitech.in', href: 'mailto:connect@stravitech.in' },
  { icon: 'schedule', label: 'Response time', value: 'Within one business day' },
]

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-32 pb-20 md:pb-28">
      <div className="absolute inset-0 grid-lines -z-10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent_75%)]" aria-hidden="true" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-sky/10 blur-[120px] -z-10" aria-hidden="true" />

      <div className="max-w-container mx-auto px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <Badge className="mb-5">Contact us</Badge>
          <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] font-light tracking-tight mb-5">
            Let's build something <span className="italic text-indigo-brand">exceptional.</span>
          </h1>
          <p className="text-body-lg text-slate-muted">
            Tell us about your project — legacy modernization, custom software, compliance, or AI. We'll get
            back to you within one business day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 space-y-3"
          >
            {channels.map((c) => {
              const inner = (
                <div className="flex items-start gap-4 bg-card rounded-2xl shadow-card p-5 hover:shadow-float transition-shadow duration-500">
                  <span className="w-10 h-10 rounded-lg bg-paper flex items-center justify-center shrink-0">
                    <Icon name={c.icon} className="text-indigo-brand" size={20} />
                  </span>
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-wider text-slate-muted">{c.label}</div>
                    <div className="text-body font-medium text-ink mt-1">{c.value}</div>
                  </div>
                </div>
              )
              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  className="block"
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {inner}
                </a>
              ) : (
                <div key={c.label}>{inner}</div>
              )
            })}
          </motion.div>

          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm heading="Send us a message." subheading="Fill in the details and we'll be in touch." />
          </div>
        </div>
      </div>
    </section>
  )
}
