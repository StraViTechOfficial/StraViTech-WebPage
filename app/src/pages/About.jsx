import { About, CTA, Metrics, PageHero } from '../components/Sections'

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="About us"
        title="We come from both worlds —"
        highlight="engineering and technology."
        subtitle="StraViTech is the bridge between technical, hands-on businesses and the technology that scales them. We understand the business first, then build."
      />
      <About />
      <Metrics />
      <CTA />
    </>
  )
}
