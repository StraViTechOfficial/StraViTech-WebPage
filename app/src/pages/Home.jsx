import {
  Bridge,
  CTA,
  Gap,
  Hero,
  Outcomes,
  Process,
  Promise,
  Work,
} from '../components/Sections'

export default function Home() {
  return (
    <>
      <Hero />
      <Gap />
      <Bridge />
      <Outcomes showAll />
      <Process />
      <Work showAll />
      <Promise />
      <CTA />
    </>
  )
}
