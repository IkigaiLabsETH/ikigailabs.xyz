'use client'

export default function CollectedError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[50vh] w-full flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold text-red-500">Something went wrong loading the collection!</h2>
      <button
        onClick={() => reset()}
        className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  )
} 