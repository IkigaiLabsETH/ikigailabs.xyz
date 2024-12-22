import { Metadata } from 'next'
import { SITE_DESCRIPTION, SITE_LOGO_PATH, SITE_TITLE, SITE_URL } from '@/common/constants'

export const metadata: Metadata = {
  title: `${SITE_TITLE} | Ikigai Labs Art Gallery`,
  description: 'Ikigai Labs Art Gallery',
  openGraph: {
    title: `${SITE_TITLE} | Ikigai Labs Art Gallery`,
    description: SITE_DESCRIPTION,
    images: [{ url: SITE_LOGO_PATH }],
    type: 'website',
    url: `${SITE_URL}/gallery`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_TITLE} | Ikigai Labs Art Gallery`,
    description: SITE_DESCRIPTION,
    images: [SITE_LOGO_PATH],
  },
}

export default function GalleryPage() {
  return (
    <div className="flex items-center flex-col">
      <main className="w-full">
        <div className="bg-white w-full items-center justify-center flex py-20 px-10">
          <iframe
            src="https://www.spatial.io/embed/Ikigai-Labs-Gallery-1-6462268d593bb108f20206ee?share=5997893486131460079"
            width="1516px"
            height="720px"
            allow="camera; fullscreen; autoplay; display-capture; microphone; clipboard-write"
          />
        </div>
      </main>
    </div>
  )
} 