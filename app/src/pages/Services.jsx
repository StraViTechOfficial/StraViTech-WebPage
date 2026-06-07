import { CTA, Outcomes, PageHero, Process } from '../components/Sections'

export default function ServicesPage() {
  return (
    <>
      <PageHero
        badge="What we do"
        title="Outcomes for your business,"
        highlight="not a list of features."
        subtitle="We bring established businesses online, build systems around how they actually work, and take the manual work off their plate — understood first, built second."
      />
      <Outcomes detailed />
      <Process />
      <CTA />
    </>
  )
}
