import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from './ui'
import { EASE } from '../lib/motion'
import { CALENDLY } from '../lib/links'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()

  const isActive = (to) => {
    if (to === '/') return pathname === '/' && !hash
    if (to.startsWith('/#')) return pathname === '/' && hash === to.slice(1)
    return pathname === to
  }

  return (
    <nav className="sticky top-0 z-50 w-full pt-4">
      <div className="max-w-container mx-auto px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="glass shadow-card rounded-2xl flex justify-between items-center h-16 px-4 md:px-6"
        >
          <Link to="/" className="flex items-center gap-2" aria-label="StraViTech home">
            <img alt="StraViTech" className="h-8 md:h-9 w-auto" src="/assets/logo-mark.png" width="842" height="296" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className={
                  isActive(l.to)
                    ? 'text-ink text-body-sm font-medium'
                    : 'text-carbon/70 hover:text-ink text-body-sm transition-colors'
                }
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <motion.div whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }}>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-indigo-brand text-white text-body-sm font-medium px-5 py-2.5 rounded-lg shadow-card hover:shadow-btn-hover"
              >
                Book a call <span className="text-white/80">→</span>
              </a>
            </motion.div>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg text-ink cursor-pointer"
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="md:hidden glass shadow-card rounded-2xl mt-2 p-2 overflow-hidden"
            >
              <div className="flex flex-col">
                {links.map((l) => (
                  <Link
                    key={l.label}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={
                      isActive(l.to)
                        ? 'py-3 px-4 rounded-lg text-ink font-medium text-body'
                        : 'py-3 px-4 rounded-lg text-carbon/70 hover:bg-paper transition-colors text-body'
                    }
                  >
                    {l.label}
                  </Link>
                ))}
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-1 inline-flex items-center justify-center gap-1.5 bg-indigo-brand text-white px-4 py-3 rounded-lg text-body-sm font-medium"
                >
                  Book a call <span className="text-white/80">→</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
