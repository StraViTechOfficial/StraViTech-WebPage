import { motion } from 'framer-motion'

// Shared easing — matches the spring feel used in the static prototype
export const EASE = [0.16, 1, 0.3, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

// A section/group that reveals its children with a stagger on scroll-in.
// Triggers when the top edge clears the bottom 10% of the viewport — not a
// fraction of the element's height, which never fits on screen for tall pages.
export function Reveal({ as = 'div', className, children, amount = 0, ...rest }) {
  const Comp = motion[as] || motion.div
  return (
    <Comp
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: '0px 0px -10% 0px' }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

// A single item that animates with fadeUp. Use inside <Reveal>.
export function Item({ as = 'div', className, children, variants = fadeUp, ...rest }) {
  const Comp = motion[as] || motion.div
  return (
    <Comp className={className} variants={variants} {...rest}>
      {children}
    </Comp>
  )
}
