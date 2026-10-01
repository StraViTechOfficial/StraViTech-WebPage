import { Link } from 'react-router-dom'
import { PageHero } from '../components/Sections'
import { Reveal, Item } from '../lib/motion'
import { Block, List } from './Privacy'

const UPDATED = '1 October 2026'

function LegalPage({ title, highlight, subtitle, children }) {
  return (
    <>
      <PageHero badge="Legal" title={title} highlight={highlight} subtitle={subtitle} />
      <section className="relative pb-24">
        <div className="max-w-3xl mx-auto px-4 md:px-12">
          <Reveal>
            <Item as="p" className="text-body-sm font-mono uppercase tracking-wider text-fog mb-10">
              Last updated: {UPDATED}
            </Item>
            {children}
            <ContactBlock />
          </Reveal>
        </div>
      </section>
    </>
  )
}

function ContactBlock() {
  return (
    <Block title="Contact us">
      <p>For any question about this policy, contact us at:</p>
      <p>
        <strong>StraViTech</strong>
        <br />
        Email: <a href="mailto:contact@stravitech.com">contact@stravitech.com</a>
        <br />
        WhatsApp: +91 97648 30503
        <br />
        Web: <a href="https://stravitech.com">stravitech.com</a>
      </p>
      <p className="pt-2">
        <Link to="/contact">Get in touch →</Link>
      </p>
    </Block>
  )
}

export function TermsPage() {
  return (
    <LegalPage
      title="Terms &"
      highlight="Conditions."
      subtitle="The terms that apply when you use this website or engage StraViTech for a project."
    >
      <Block title="About these terms">
        <p>
          These terms apply to your use of <a href="https://stravitech.com">stravitech.com</a> and to
          the services provided by StraViTech (&ldquo;we&rdquo;,
          &ldquo;us&rdquo;). By using this website or engaging us, you agree to them. Where we sign a
          separate proposal or agreement with you for a project, that document takes priority over
          these terms for that project.
        </p>
      </Block>

      <Block title="Our services">
        <p>
          We design and build websites, custom web and mobile applications, business systems and
          related digital services. The exact scope, deliverables, timeline and price of each
          project are set out in a written proposal or quotation that you accept before work begins.
        </p>
      </Block>

      <Block title="Pricing and payment">
        <List
          items={[
            'All prices are quoted in Indian Rupees (INR) unless stated otherwise, and applicable taxes are added as shown on the invoice.',
            'Projects are usually billed in milestones, with an advance payment before work starts. The schedule is set out in your proposal.',
            'Payments can be made by bank transfer, UPI or through our online payment gateway. Invoices are due by the date shown on them.',
            'We may pause work on a project if a payment is overdue.',
          ]}
        />
      </Block>

      <Block title="Your responsibilities">
        <p>
          To deliver on time we need your timely input: content, feedback, approvals and access to
          any accounts or systems the project depends on. Delays in these may move the timeline.
          You confirm that any material you give us (text, images, logos, data) is yours to use or
          that you have permission to use it.
        </p>
      </Block>

      <Block title="Ownership">
        <p>
          Once a project is paid for in full, ownership of the final deliverables made specifically
          for you passes to you. We keep ownership of our pre-existing tools, code libraries and
          know-how, and grant you a licence to use them as part of your deliverables. Third-party
          software, fonts, plugins and services remain subject to their own licences. Unless you ask
          us not to, we may mention the project in our portfolio.
        </p>
      </Block>

      <Block title="Cancellation and refunds">
        <p>
          Cancellations and refunds are covered by our{' '}
          <Link to="/refund">Cancellation &amp; Refund Policy</Link>.
        </p>
      </Block>

      <Block title="Limitation of liability">
        <p>
          We take care to deliver quality work, but we are not liable for indirect or consequential
          losses, such as lost profit or lost data, arising from the use of our services or this
          website. Our total liability for any project is limited to the amount you paid us for that
          project.
        </p>
      </Block>

      <Block title="Use of this website">
        <p>
          The content of this website is for general information and may change without notice. You
          may not copy or reuse it for commercial purposes without our permission, or use the site in
          any way that is unlawful or harms its operation.
        </p>
      </Block>

      <Block title="Governing law">
        <p>
          These terms are governed by the laws of India. Any dispute will first be discussed in good
          faith, and if unresolved, will be subject to the jurisdiction of the courts of India.
        </p>
      </Block>

      <Block title="Changes to these terms">
        <p>
          If we change these terms, we will update the &ldquo;Last updated&rdquo; date at the top of
          this page.
        </p>
      </Block>
    </LegalPage>
  )
}

export function RefundPage() {
  return (
    <LegalPage
      title="Cancellation &"
      highlight="Refund."
      subtitle="How cancellations and refunds work for projects and services from StraViTech."
    >
      <Block title="Overview">
        <p>
          StraViTech provides custom digital services. Because each project is built specifically
          for one client, refunds depend on how much work has been done when a cancellation is
          requested. Where your signed proposal sets different terms, those terms apply.
        </p>
      </Block>

      <Block title="Cancelling a project">
        <List
          items={[
            <>
              <strong>Before work begins</strong> — if you cancel before we start work on your
              project, we refund your advance in full, less any payment gateway charges.
            </>,
            <>
              <strong>After work begins</strong> — you can cancel at any time by writing to us. You
              pay for the work completed up to the cancellation date. Any amount paid beyond that is
              refunded.
            </>,
            <>
              <strong>Completed milestones</strong> — payments for milestones that have been
              delivered and approved are not refundable.
            </>,
          ]}
        />
      </Block>

      <Block title="Subscriptions and recurring services">
        <p>
          Recurring services such as hosting, maintenance or support plans can be cancelled at any
          time with written notice. The cancellation takes effect at the end of the current billing
          period. Amounts already paid for the current period are not refunded.
        </p>
      </Block>

      <Block title="Third-party costs">
        <p>
          Costs we pay to third parties on your behalf, such as domain names, hosting, software
          licences or app store fees, are not refundable once purchased.
        </p>
      </Block>

      <Block title="If something is not right">
        <p>
          If a deliverable does not match the agreed scope, tell us and we will fix it at no extra
          cost. Fixing the work comes first; a refund for that part is considered only if we cannot
          resolve the issue.
        </p>
      </Block>

      <Block title="How to request a cancellation or refund">
        <p>
          Email <a href="mailto:contact@stravitech.com">contact@stravitech.com</a> with your name,
          project name and the reason for your request. We will reply within 2 working days.
        </p>
        <p>
          Approved refunds are processed within <strong>5–7 working days</strong> and credited to
          the original payment method. Your bank may take a few more days to show the amount.
        </p>
      </Block>
    </LegalPage>
  )
}

export function ShippingPage() {
  return (
    <LegalPage
      title="Shipping &"
      highlight="Delivery."
      subtitle="How we deliver our work. StraViTech provides digital services, so nothing is shipped physically."
    >
      <Block title="Digital delivery only">
        <p>
          StraViTech provides digital services: websites, software, applications and related work.
          We do not sell or ship physical goods, so no shipping charges apply.
        </p>
      </Block>

      <Block title="How we deliver">
        <p>Depending on the project, we deliver work by:</p>
        <List
          items={[
            'Publishing it live on your domain, server or app store account.',
            'Sharing access to the application, admin panel or source code repository.',
            'Sending files, documents or download links by email or a shared drive.',
          ]}
        />
        <p>We confirm every delivery by email.</p>
      </Block>

      <Block title="Delivery timelines">
        <p>
          The delivery timeline for each project and milestone is set out in your proposal. It
          starts once we receive the advance payment and the inputs we need from you. If a timeline
          needs to change, we will tell you in advance.
        </p>
      </Block>

      <Block title="Exchanges">
        <p>
          As our work is custom-made and delivered digitally, exchanges do not apply. If a
          deliverable does not match the agreed scope, we will correct it at no extra cost. See our{' '}
          <Link to="/refund">Cancellation &amp; Refund Policy</Link> for more.
        </p>
      </Block>
    </LegalPage>
  )
}
