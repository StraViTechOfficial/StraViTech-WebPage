import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Nav from './components/Nav'
import { Footer } from './components/Sections'
import { ScrollProgress } from './components/effects'
import WhatsApp from './components/WhatsApp'
import Home from './pages/Home'
import ServicesPage from './pages/Services'
import WorkPage from './pages/Work'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'
import NotFound from './pages/NotFound'

const META = {
  '/': {
    title: 'StraViTech | Technology that understands your business',
    desc: 'Growth partner for manufacturing & engineering businesses. We understand your business first, then build the technology that scales it — and we stay with you.',
  },
  '/services': {
    title: 'Services | StraViTech',
    desc: 'Digital presence, custom solutions and operational efficiency — built around how your business actually works.',
  },
  '/work': {
    title: 'Our Work | StraViTech',
    desc: 'Real software delivered for real businesses — case studies from Krisha Mechatronics and Marriotz Electromech.',
  },
  '/about': {
    title: 'About | StraViTech',
    desc: 'We come from the engineering and manufacturing world and built the technology capability to serve it — the bridge between your business and the technology that scales it.',
  },
  '/contact': {
    title: 'Contact | StraViTech',
    desc: "Book a call, message us on WhatsApp, or send an enquiry — we'll reply within one business day.",
  },
}

// Scroll to top (or to a hash target) and set title + description on route change.
function RouteManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const m = META[pathname]
    document.title = m?.title || 'StraViTech'
    if (m?.desc) {
      const tag = document.querySelector('meta[name="description"]')
      if (tag) tag.setAttribute('content', m.desc)
    }
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <RouteManager />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-indigo-brand focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsApp />
    </MotionConfig>
  )
}
