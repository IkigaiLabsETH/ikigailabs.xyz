/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import React, { FC } from 'react'

import { withLayout } from '../../common/layouts'
import { Layout } from '../../common/types'
import { Footer } from '../../modules/Footer'
import { SITE_DESCRIPTION, SITE_LOGO_PATH, SITE_TITLE, SITE_URL } from '../../common/constants'
import { Ambassadors } from '../../modules/Ambassadors'

const siteTitle = `${SITE_TITLE} | Disclosures`
const url = `${SITE_URL}/disclosures`

const About: FC = () => (
  <div className="flex items-center flex-col">
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={SITE_DESCRIPTION} />
      <link rel="icon" href={SITE_LOGO_PATH} />

      <meta name="title" content={siteTitle} />
      <meta name="description" content={SITE_DESCRIPTION} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={SITE_DESCRIPTION} />
      <meta property="og:image" content={SITE_LOGO_PATH} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content={SITE_LOGO_PATH} />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={SITE_DESCRIPTION} />
      <meta property="twitter:image" content={SITE_LOGO_PATH} />
    </Head>
    <main className="max-w-screen-2xl w-full">
      <div className="flex relative flex-col text-lg mt-48 max-w-3xl mx-auto p-8">
        <h1 className="text-[3rem] md:text-[4rem] lg:text-[6rem] leading-none font-bold mb-4 tracking-tight boska break-words">
          Disclosures
        </h1>
        <p>
          ikigAI Labs XYZ is committed to transparency and maintaining the highest standards of integrity. Our disclosures aim to provide clarity on our operations, partnerships, and potential conflicts of interest.
        </p>

        <ol className='list-decimal font-bold'>
          <li>
            General Information
            <ul className='list-disc ml-5 mb-4 font-normal'>
              <li>ikigAI Labs XYZ is a pioneering firm in Web3 technologies, dedicated to leveraging real-time data and avant-garde art resources through advanced API endpoints.</li>
              <li>Our operations encompass Artist Residency programs, curated destination experiences, and the integration of cutting-edge generative art technologies.</li>
            </ul>
          </li>
          <li>
            Affiliations and Partnerships
            <ul className='list-disc ml-5 mb-4 font-normal'>
              <li>
                We collaborate with a range of organizations, including Translient Lab, Manifold Studio, and Thirdweb, to deliver top-tier services and innovations.
              </li>
              <li>
                Our business relationships are built on a foundation of trust, transparency, and mutual benefit. We rigorously audit partnerships to ensure alignment with our values.
              </li>
            </ul>
          </li>
          <li>
            Financial Interests
            <ul className='list-disc ml-5 mb-4 font-normal'>
              <li>
                ikigAI Labs XYZ and its leadership team may hold financial interests in projects, technologies, and companies that we discuss, collaborate with, or invest in.
              </li>
              <li>
                We are committed to disclosing any material financial interests that could influence our business decisions or the content we produce.
              </li>
            </ul>
          </li>
          <li>
            Content and Recommendations
            <ul className='list-disc ml-5 mb-4 font-normal'>
              <li>Our content, including articles, reports, and analyses, is intended for informational purposes only and does not constitute financial, investment, or legal advice.</li>
              <li>While we strive to provide accurate and up-to-date information, we do not guarantee the completeness or accuracy of the content. Readers are encouraged to conduct their own research and consult with professional advisors.</li>
            </ul>
          </li>
          <li>
            Sponsorships and Advertisements
            <ul className='list-disc ml-5 mb-4 font-normal'>
              <li>ikigAI Labs XYZ may receive compensation from third parties for sponsorships, advertisements, and other promotional activities.</li>
              <li>We clearly label sponsored content and advertisements to maintain transparency.</li>
            </ul>
          </li>
          <li>
            Conflicts of Interest
            <ul className='list-disc ml-5 mb-4 font-normal'>
              <li>We actively manage and disclose any potential conflicts of interest that may arise in our business operations or content production.</li>
              <li>Our conflict of interest policy ensures that all stakeholders are aware of any situations that could influence our objectivity or decision-making processes.</li>
            </ul>
          </li>
          <li>
            Privacy and Data Protection
            <ul className='list-disc ml-5 mb-4 font-normal'>
              <li>Protecting the privacy of our clients, partners, and users is of utmost importance to us. We adhere to stringent data protection policies and comply with relevant privacy laws.</li>
              <li>Our privacy policy outlines how we collect, use, and safeguard personal data.</li>
            </ul>
          </li>
          <li>
            Feedback and Queries
            <ul className='list-disc ml-5 mb-4 font-normal'>
              <li>We welcome feedback and questions from our community. If you have any concerns or require further information regarding our disclosures, please contact us at contact@ikigailabs.xyz.</li>
            </ul>
          </li>
        </ol>
      </div>
    </main>
    <Footer />
  </div>
)

export default withLayout(Layout.main)(About)
