import { Metadata } from 'next'
import { SITE_DESCRIPTION, SITE_LOGO_PATH, SITE_TITLE, SITE_URL } from '@/common/constants'

export const metadata: Metadata = {
  title: `${SITE_TITLE} | Terms of Use`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_TITLE} | Terms of Use`,
    description: SITE_DESCRIPTION,
    images: [{ url: SITE_LOGO_PATH }],
    type: 'website',
    url: `${SITE_URL}/terms`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_TITLE} | Terms of Use`,
    description: SITE_DESCRIPTION,
    images: [SITE_LOGO_PATH],
  },
}

export default function TermsPage() {
  return (
    <div className="flex items-center flex-col">
      <main className="max-w-screen-2xl w-full">
        <div className="flex relative flex-col text-lg mt-48 max-w-3xl mx-auto p-8">
          <h1 className="text-[3rem] md:text-[4rem] lg:text-[6rem] leading-none font-bold mb-4 tracking-tight boska break-words">
            Terms of Use
          </h1>
          <p>
            Ikigai Labs is a curated, non-custodial, open-source marketplace aggregator developed and made available by
            Ikigai Labs XYZ, Inc., a Delaware corporation ("Ikigai Labs XYZ," "we," "our," or "us"). This platform
            consists of multiple components that can be accessed through our website located at https://ikigailabs.xyz/,
            powered by the Reservoir API (a hosted Application Programming Interface for building NFT applications), the
            ReservoirKit (a developer toolkit), and the Reservoir Protocol (an open-source NFT liquidity aggregation
            protocol).
          </p>
          {/* Rest of the terms content */}
          <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">1. Eligibility.</h2>
          <p>
            1.1 You must be at least the age of majority in your jurisdiction to access or use the Services. By accessing
            or using the Services, you represent that you are at least the age of majority (e.g., 18 years of age) and
            have the full right, power, and authority to enter and comply with these Terms.
          </p>
          {/* Continue with the rest of the terms sections */}
        </div>
      </main>
    </div>
  )
} 