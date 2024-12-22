import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import { SITE_DESCRIPTION, SITE_LOGO_PATH, SITE_TITLE } from '@/common/constants'

// Dynamic import for client component
const DynamicGemsOnTheFloor = dynamic(
  () => import('@/modules/GemsOnTheFloor').then(mod => ({ default: mod.GemsOnTheFloor })),
  {
    loading: () => <FloorLoading />,
    ssr: true
  }
)

// Metadata for better SEO
export const metadata: Metadata = {
  title: `${SITE_TITLE} | Gems On The Floor`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_TITLE} | Gems On The Floor`,
    description: SITE_DESCRIPTION,
    images: [{ url: SITE_LOGO_PATH }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_TITLE} | Gems On The Floor`,
    description: SITE_DESCRIPTION,
    images: [SITE_LOGO_PATH],
  },
}

function FloorLoading() {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center">
      <div className="h-32 w-32 animate-pulse rounded-full bg-gray-200" />
    </div>
  )
}

export default function FloorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <main className="w-full">
        <div className="flex items-center justify-center bg-white">
          <Suspense fallback={<FloorLoading />}>
            <DynamicGemsOnTheFloor />
          </Suspense>
        </div>
      </main>
    </div>
  )
} 