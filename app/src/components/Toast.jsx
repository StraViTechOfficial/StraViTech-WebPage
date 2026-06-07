import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from './ui'

// Top-center toast. Rendered into document.body so it's viewport-fixed
// (immune to transformed ancestors). Pass `status` = {ok, title, msg} | null.
export default function Toast({ status, onClose }) {
  if (typeof document === 'undefined') return null
  return createPortal(
    <div
      className="fixed top-20 inset-x-0 z-[100] flex justify-center px-4 pointer-events-none"
      role="status"
      aria-live="polite"
    >
      <AnimatePresence>
        {status && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto max-w-md w-full sm:w-auto flex items-start gap-3 rounded-2xl bg-card shadow-float ring-1 ring-mist pl-4 pr-3 py-3"
          >
            <Icon
              name={status.ok ? 'check_circle' : 'error'}
              size={22}
              className={`mt-px shrink-0 ${status.ok ? 'text-forest-teal' : 'text-red-600'}`}
            />
            <div className="text-body-sm text-ink min-w-0">
              {status.title && <div className="font-semibold leading-tight">{status.title}</div>}
              <div className="text-slate-muted">{status.msg}</div>
            </div>
            <button
              onClick={onClose}
              aria-label="Dismiss"
              className="ml-1 shrink-0 text-slate-muted hover:text-ink transition-colors"
            >
              <Icon name="close" size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    document.body,
  )
}
