export default function ActivityLoading() {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center">
      <div className="space-y-4 w-full max-w-4xl">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="animate-pulse flex space-x-4 bg-gray-100 p-4 rounded-lg">
            <div className="h-16 w-16 bg-gray-200 rounded" />
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
            <div className="w-24">
              <div className="h-8 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 