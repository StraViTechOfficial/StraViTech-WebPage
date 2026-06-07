import { motion, useReducedMotion } from 'framer-motion'
import { Icon, TiltCard } from './ui'

/*
  Hero visual — a calm capabilities panel: what StraViTech does.
  Uniform neutral styling, subtle hover, gentle float, 3D tilt.
*/
const capabilities = [
  { icon: 'psychology', title: 'Understood first', sub: 'We learn your business' },
  { icon: 'build', title: 'Built around you', sub: 'Systems that fit how you work' },
  { icon: 'speed', title: 'Efficient & on time', sub: 'Less manual, more output' },
  { icon: 'handshake', title: 'We stay', sub: 'A partner past delivery' },
]

export default function BlocksScene() {
  const reduce = useReducedMotion()
  return (
    <div className="relative w-full max-w-md mx-auto lg:ml-auto lg:mr-0">
      {/* very soft, neutral glow behind the card */}
      <div className="absolute -inset-6 -z-10 rounded-[32px] bg-sky/5 blur-2xl" aria-hidden="true" />

      <motion.div animate={reduce ? undefined : { y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
        <TiltCard glare max={7} className="bg-card rounded-2xl shadow-float p-6 md:p-7">
          <div className="grid grid-cols-2 gap-3">
            {capabilities.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-paper rounded-xl p-4 hover:bg-mist/50 transition-colors duration-300"
              >
                <span className="w-10 h-10 rounded-lg bg-card shadow-card flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-105">
                  <Icon name={c.icon} className="text-indigo-brand" size={20} />
                </span>
                <div className="text-body-sm font-medium text-ink leading-tight">{c.title}</div>
                <div className="text-caption text-slate-muted mt-0.5">{c.sub}</div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-5 pt-4 border-t border-mist">
            <span className="text-caption text-slate-muted">Your business, understood first</span>
            <a href="/services" className="group/link inline-flex items-center gap-1 text-body-sm font-medium text-indigo-brand">
              What we do <span className="transition-transform group-hover/link:translate-x-1">→</span>
            </a>
          </div>
        </TiltCard>
      </motion.div>
    </div>
  )
}
