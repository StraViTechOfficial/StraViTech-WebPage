import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

// Material Symbols icon
export function Icon({ name, className = '', size, style }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ ...(size ? { fontSize: size } : null), ...style }}
      aria-hidden="true"
    >
      {name}
    </span>
  )
}

// Teal pill section label
export function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex bg-cyan-pale text-[#015e74] rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider ${className}`}
    >
      {children}
    </span>
  )
}

// Buttons with spring press/hover. Pass `to` for in-app routes, `href` for anchors/external.
const press = { whileTap: { scale: 0.98 }, whileHover: { y: -1 } }
const MotionLink = motion.create(Link)

export function PrimaryButton({ href, to, children, className = '', newTab = false }) {
  const cls = `inline-flex items-center gap-1.5 bg-indigo-brand text-white text-body-sm font-medium px-5 py-3 rounded-lg shadow-card hover:shadow-btn-hover ${className}`
  if (to) {
    return (
      <MotionLink to={to} {...press} className={cls}>
        {children} <span className="text-white/80">→</span>
      </MotionLink>
    )
  }
  const ext = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <motion.a href={href || '#'} {...ext} {...press} className={cls}>
      {children} <span className="text-white/80">→</span>
    </motion.a>
  )
}

export function GhostButton({ href, to, children, className = '' }) {
  const cls = `inline-flex items-center gap-1.5 text-ink text-body-sm font-medium px-4 py-3 rounded-lg border border-mist hover:border-fog hover:text-indigo-brand transition-colors ${className}`
  if (to) {
    return (
      <MotionLink to={to} {...press} className={cls}>
        {children} <span className="text-fog">›</span>
      </MotionLink>
    )
  }
  return (
    <motion.a href={href || '#'} {...press} className={cls}>
      {children} <span className="text-fog">›</span>
    </motion.a>
  )
}

// Count-up number, triggered on scroll-in (smooth ease-out-expo ramp + subtle rise)
export function Counter({ to, suffix = '', duration = 2 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(0)
  const decimals = String(to).includes('.') ? (String(to).split('.')[1] || '').length : 0

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setVal(to)
      return
    }
    let raf
    let start
    const step = (t) => {
      if (!start) start = t
      const p = Math.min((t - start) / (duration * 1000), 1)
      // ease-out-expo: fast start, gentle settle
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setVal(to * eased)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration, reduce])

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="inline-block tabular-nums"
    >
      {val.toFixed(decimals)}
      {suffix}
    </motion.span>
  )
}

// 3D tilt card with optional cursor glare (desktop + motion only)
export function TiltCard({
  children,
  className = '',
  max = 6,
  glare = false,
  float = false,
  ...rest
}) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 150, damping: 18 })
  const sy = useSpring(my, { stiffness: 150, damping: 18 })
  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const gx = useTransform(sx, [0, 1], [0, 100])
  const gy = useTransform(sy, [0, 1], [0, 100])
  const glareBg = useMotionTemplate`radial-gradient(380px circle at ${gx}% ${gy}%, rgba(126,167,233,0.16), transparent 45%)`

  function handleMove(e) {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  function handleLeave() {
    mx.set(0.5)
    my.set(0.5)
  }

  const floatAnim =
    float && !reduce
      ? { animate: { y: [0, -12, 0] }, transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' } }
      : {}

  return (
    <motion.div className={`h-full ${float ? 'relative' : ''}`} {...floatAnim}>
      <motion.div
        className={`group relative ${className}`}
        onPointerMove={reduce ? undefined : handleMove}
        onPointerLeave={reduce ? undefined : handleLeave}
        style={reduce ? undefined : { transformPerspective: 1000, rotateX, rotateY, transformStyle: 'preserve-3d' }}
        {...rest}
      >
        {children}
        {glare && !reduce && (
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}
