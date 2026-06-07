import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

/* Top scroll-progress bar */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-forest-teal via-sky to-ember"
      aria-hidden="true"
    />
  )
}

/* Drifting aurora blobs (light, premium) */
export function Aurora() {
  const reduce = useReducedMotion()
  const blobs = [
    { c: 'rgba(126,167,233,0.35)', s: 'w-[460px] h-[460px] top-[-120px] right-[-80px]', d: 18, x: [0, 40, 0], y: [0, 30, 0] },
    { c: 'rgba(193,232,239,0.55)', s: 'w-[420px] h-[420px] top-[60px] left-[-100px]', d: 22, x: [0, -40, 0], y: [0, 40, 0] },
    { c: 'rgba(159,122,238,0.20)', s: 'w-[360px] h-[360px] bottom-[-120px] left-[40%]', d: 26, x: [0, 30, 0], y: [0, -30, 0] },
  ]
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[90px] ${b.s}`}
          style={{ background: `radial-gradient(circle, ${b.c} 0%, transparent 70%)` }}
          animate={reduce ? undefined : { x: b.x, y: b.y, scale: [1, 1.12, 1] }}
          transition={{ duration: b.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

/* Headline reveal, word by word with a soft clip-rise */
export function WordReveal({ text, className = '', highlight, highlightClass = 'text-fog' }) {
  const words = text.split(' ')
  const hi = highlight ? highlight.split(' ') : []
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  }
  const word = {
    hidden: { opacity: 0, y: '0.4em' },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  }
  return (
    <motion.h1 className={className} variants={container} initial="hidden" animate="show">
      {words.map((w, i) => (
        <motion.span key={i} variants={word} className={`inline-block ${hi.includes(w) ? highlightClass : ''}`}>
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
      ))}
    </motion.h1>
  )
}

/* Animated bar chart that grows on scroll-in */
export function AnimatedBars({ values = [42, 64, 50, 78, 60, 92, 74], className = '' }) {
  const reduce = useReducedMotion()
  return (
    <div className={`flex items-end gap-1.5 ${className}`} aria-hidden="true">
      {values.map((v, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-sm bg-gradient-to-t from-indigo-brand to-sky"
          style={{ height: `${v}%`, transformOrigin: 'bottom' }}
          initial={{ scaleY: 0, opacity: 0.4 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: reduce ? 0 : i * 0.07, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  )
}

/* Magnetic wrapper — child eases toward the cursor */
export function Magnetic({ children, strength = 0.4, className = '' }) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })

  function move(e) {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  function leave() {
    x.set(0)
    y.set(0)
  }
  if (reduce) return <span className={className}>{children}</span>
  return (
    <motion.span
      onPointerMove={move}
      onPointerLeave={leave}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      className={className}
    >
      {children}
    </motion.span>
  )
}

/* Self-drawing SVG polyline on scroll-in */
export function DrawLine({ points, stroke = '#ffffff', width = 2, className }) {
  return (
    <motion.polyline
      points={points}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
    />
  )
}

/* Scroll parallax helper for a target section */
export function useParallax(target, distance = 60) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  return reduce ? 0 : y
}

/* Infinite marquee */
export function Marquee({ items, duration = 26 }) {
  const reduce = useReducedMotion()
  const row = [...items, ...items]
  return (
    <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <motion.div
        className="flex items-center gap-20 w-max"
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {row.map((it, i) => (
          <span key={i} className="group flex items-center gap-3 whitespace-nowrap">
            {(it.logo || it.slug) && (
              <span className="relative inline-block h-6">
                <img
                  src={it.logo || `https://cdn.simpleicons.org/${it.slug}/9aa0ab`}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-6 w-auto transition-opacity duration-300 group-hover:opacity-0"
                />
                <img
                  src={it.logoColor || `https://cdn.simpleicons.org/${it.slug}`}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-6 w-auto absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </span>
            )}
            <span className="text-body font-medium text-ink/60 transition-colors duration-300 group-hover:text-ink">
              {it.label}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export { useRef }
