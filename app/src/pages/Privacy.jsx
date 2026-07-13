import { Link } from 'react-router-dom'
import { PageHero } from '../components/Sections'
import { Reveal, Item } from '../lib/motion'

const UPDATED = '13 July 2026'

/* ---------------- Content primitives ---------------- */
function Block({ title, children }) {
  return (
    <Item as="section" className="mb-10">
      <h2 className="text-heading-sm font-light tracking-tight text-ink mb-3">{title}</h2>
      <div className="space-y-4 text-body text-slate-muted [&_a]:text-indigo-brand [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-ink [&_strong]:font-medium">
        {children}
      </div>
    </Item>
  )
}

function List({ items }) {
  return (
    <ul className="space-y-2 pl-5 list-disc marker:text-fog">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  )
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        badge="Legal"
        title="Privacy"
        highlight="Policy."
        subtitle="How StraViTech collects, uses and protects the information you share with us."
      />

      <section className="relative pb-24">
        <div className="max-w-3xl mx-auto px-4 md:px-12">
          <Reveal>
            <Item as="p" className="text-body-sm font-mono uppercase tracking-wider text-fog mb-10">
              Last updated: {UPDATED}
            </Item>

            <Block title="Who we are">
              <p>
                StraViTech Solutions (&ldquo;StraViTech&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or
                &ldquo;our&rdquo;) is a software studio that builds custom web and mobile applications
                and business systems for manufacturing and engineering companies. We operate the
                website <a href="https://stravitech.in">stravitech.in</a>. This policy explains what
                we do with the information you share through this website when you get in touch with
                us.
              </p>
            </Block>

            <Block title="What we collect">
              <p>
                We only collect what you actively send us. Nothing on this website tracks you in the
                background. Specifically:
              </p>
              <List
                items={[
                  <>
                    <strong>Enquiry form</strong> — your full name, email address, your message, and
                    optionally your business / company name.
                  </>,
                  <>
                    <strong>When you contact us directly</strong> — whatever you choose to share when
                    you message us on WhatsApp, email us, or book a call.
                  </>,
                ]}
              />
              <p>
                We do <strong>not</strong> run analytics or advertising trackers on this site, and we
                do not collect payment details, passwords or any sensitive personal data through it.
              </p>
            </Block>

            <Block title="How we use it">
              <p>We use what you send us only to:</p>
              <List
                items={[
                  'Reply to your enquiry and discuss your project with you.',
                  'Schedule and hold calls or meetings.',
                  'Deliver and support the software we build for you, if we start working together.',
                ]}
              />
              <p>
                We do not sell, rent or trade your information, and we do not use it for unrelated
                marketing.
              </p>
            </Block>

            <Block title="Services we rely on">
              <p>
                To run this website and talk to you, we use a few third-party services. They only
                receive the data needed for their part, and each has its own privacy policy:
              </p>
              <List
                items={[
                  <>
                    <strong>Formspree</strong> — receives your enquiry-form submission and emails it
                    to us.
                  </>,
                  <>
                    <strong>WhatsApp (Meta Platforms)</strong> — if you choose to message us on
                    WhatsApp.
                  </>,
                  <>
                    <strong>Calendly</strong> — if you book a call with us.
                  </>,
                  <>
                    <strong>Google Fonts</strong> — loads the fonts used on the site; receives your
                    IP address as part of that request.
                  </>,
                  <>
                    <strong>GitHub Pages</strong> — hosts this website.
                  </>,
                ]}
              />
            </Block>

            <Block title="Data in the projects we build">
              <p>
                When we build or run software for a client, that software may hold that client&rsquo;s
                own business data (for example customers, jobs or documents). We handle it only on the
                client&rsquo;s behalf and under our project agreement with them — it is not covered by
                this website policy.
              </p>
            </Block>

            <Block title="Cookies">
              <p>
                This website does not set advertising or analytics cookies. Third-party tools you
                actively open — such as Calendly or WhatsApp — may set their own cookies under their
                policies.
              </p>
            </Block>

            <Block title="Keeping and protecting your data">
              <p>
                We keep your enquiry only as long as we need it to respond and for our own records,
                then remove it. We take reasonable measures to protect it, though no method of
                transmission over the internet is completely secure. You can ask us to access,
                correct or delete the information we hold about you, or to stop contacting you, any
                time at <a href="mailto:connect@stravitech.in">connect@stravitech.in</a>.
              </p>
            </Block>

            <Block title="Changes to this policy">
              <p>
                If we change this policy, we will update the &ldquo;Last updated&rdquo; date at the
                top of this page.
              </p>
            </Block>

            <Block title="Contact us">
              <p>
                If you have any questions about this Privacy Policy or how we handle your information,
                contact us at:
              </p>
              <p>
                <strong>StraViTech Solutions</strong>
                <br />
                Email: <a href="mailto:connect@stravitech.in">connect@stravitech.in</a>
                <br />
                Web: <a href="https://stravitech.in">stravitech.in</a>
              </p>
              <p className="pt-2">
                <Link to="/contact">Get in touch →</Link>
              </p>
            </Block>
          </Reveal>
        </div>
      </section>
    </>
  )
}
