import { Metadata } from 'next'
import { SITE_DESCRIPTION, SITE_LOGO_PATH, SITE_TITLE, SITE_URL } from '@/common/constants'

export const metadata: Metadata = {
  title: `${SITE_TITLE} | Privacy Policy`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_TITLE} | Privacy Policy`,
    description: SITE_DESCRIPTION,
    images: [{ url: SITE_LOGO_PATH }],
    type: 'website',
    url: `${SITE_URL}/privacy-policy`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_TITLE} | Privacy Policy`,
    description: SITE_DESCRIPTION,
    images: [SITE_LOGO_PATH],
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="flex items-center flex-col">
      <main className="max-w-screen-2xl w-full">
        <div className="flex relative flex-col text-lg mt-48 max-w-3xl mx-auto p-8">
          <h1 className="text-[3rem] md:text-[4rem] lg:text-[6rem] leading-none font-bold mb-4 tracking-tight boska break-words">
            Privacy Policy
          </h1>
          <p>
            This Privacy Policy explains how information about you is collected, used, and disclosed by Ikigai Labs
            (&ldquo;Ikigai Labs,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;ours,&rdquo; and &ldquo;us&rdquo;).
            This Privacy Policy applies to information we collect when you use the website operated by us and located at
            https://ikigailabs.xyz/ (the &ldquo;Ikigai Website&rdquo;), and all associated websites linked to
            https://ikigailabs.xyz/ by us, or when you otherwise interact with the services or tools we provide.
          </p>
          {/* Rest of the privacy policy content */}
          <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">1. Collection of Information.</h2>
          <p>
            1.1 Information You Provide to Us. We collect information you provide directly to us. The types of information
            we may collect include your digital asset wallet address, completed transaction hashes, and the token names,
            symbols, or other blockchain identifiers.
          </p>
          {/* Continue with the rest of the privacy policy sections */}
        </div>
      </main>
    </div>
  )
} 