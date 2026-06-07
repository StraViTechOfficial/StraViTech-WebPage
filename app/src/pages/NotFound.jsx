import { Link } from 'react-router-dom'
import { PageHero } from '../components/Sections'
import { PrimaryButton } from '../components/ui'

export default function NotFound() {
  return (
    <>
      <PageHero
        badge="404"
        title="This page took a"
        highlight="wrong turn."
        subtitle="The page you're looking for doesn't exist — but we're easy to reach."
      />
      <section className="pb-24 md:pb-28">
        <div className="max-w-container mx-auto px-4 md:px-12 flex flex-wrap gap-3">
          <PrimaryButton to="/">Back to home</PrimaryButton>
          <Link
            to="/work"
            className="inline-flex items-center gap-1.5 text-ink text-body-sm font-medium px-4 py-3 rounded-lg border border-mist hover:border-fog transition-colors"
          >
            See our work <span className="text-fog">›</span>
          </Link>
        </div>
      </section>
    </>
  )
}
