import { Metadata } from 'next'
import { SITE_DESCRIPTION, SITE_LOGO_PATH, SITE_TITLE, SITE_URL } from '@/common/constants'

export const metadata: Metadata = {
  title: `${SITE_TITLE} | Disclosures`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_TITLE} | Disclosures`,
    description: SITE_DESCRIPTION,
    images: [{ url: SITE_LOGO_PATH }],
    type: 'website',
    url: `${SITE_URL}/disclosures`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_TITLE} | Disclosures`,
    description: SITE_DESCRIPTION,
    images: [SITE_LOGO_PATH],
  },
}

export default function DisclosuresPage() {
  return (
    <div className="flex items-center flex-col">
      <main className="max-w-screen-2xl w-full">
        <div className="flex relative flex-col text-lg mt-48 max-w-3xl mx-auto p-8">
          <h1 className="text-[3rem] md:text-[4rem] lg:text-[6rem] leading-none font-bold mb-4 tracking-tight boska break-words">
            Disclosures
          </h1>
          <p>
            ikigAI Labs XYZ is committed to transparency and maintaining the highest standards of integrity. Our
            disclosures aim to provide clarity on our operations, partnerships, and potential conflicts of interest.
          </p>

          <ol className="list-decimal font-bold">
            <li>
              General Information
              <ul className="list-disc ml-5 mb-4 font-normal">
                <li>
                  ikigAI Labs XYZ is a pioneering firm in Web3 technologies, dedicated to leveraging real-time data and
                  avant-garde art resources through advanced API endpoints.
                </li>
                <li>
                  Our operations encompass Artist Residency programs, curated destination experiences, and the integration
                  of cutting-edge generative art technologies.
                </li>
              </ul>
            </li>
            {/* Continue with the rest of the disclosures sections */}
          </ol>
        </div>
      </main>
    </div>
  )
} 