import { ProfileTabs } from '@/components/ProfileTabs'

export default function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { address: string }
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-screen-2xl">
        <ProfileTabs address={params.address} />
        <main className="p-4">{children}</main>
      </div>
    </div>
  )
} 