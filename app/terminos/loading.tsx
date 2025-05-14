import { Skeleton } from "@/components/ui/skeleton"

export default function TerminosLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero skeleton */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Skeleton className="h-6 w-32 bg-white/20 mb-6" />
          <Skeleton className="h-10 w-3/4 md:w-1/2 bg-white/20 mb-4" />
          <Skeleton className="h-4 w-full md:w-2/3 bg-white/20 mb-2" />
          <Skeleton className="h-4 w-5/6 md:w-1/2 bg-white/20" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation skeleton */}
        <div className="bg-white border border-gray-200 rounded-lg p-3 mb-8">
          <div className="flex gap-2 overflow-x-auto">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-9 w-32 rounded-full bg-gray-200" />
              ))}
          </div>
        </div>

        {/* Content skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="mb-10">
                <Skeleton className="h-8 w-64 bg-gray-200 mb-4" />
                <Skeleton className="h-4 w-full bg-gray-100 mb-2" />
                <Skeleton className="h-4 w-5/6 bg-gray-100 mb-2" />
                <Skeleton className="h-4 w-full bg-gray-100 mb-2" />
                <Skeleton className="h-4 w-4/5 bg-gray-100 mb-2" />
                <Skeleton className="h-4 w-full bg-gray-100 mb-2" />
                <Skeleton className="h-4 w-3/4 bg-gray-100" />
              </div>
            ))}
        </div>

        {/* CTA skeleton */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6 md:p-8 text-center">
          <Skeleton className="h-8 w-96 mx-auto bg-gray-200 mb-4" />
          <Skeleton className="h-4 w-full md:w-2/3 mx-auto bg-gray-200 mb-2" />
          <Skeleton className="h-4 w-5/6 md:w-1/2 mx-auto bg-gray-200 mb-6" />
          <Skeleton className="h-12 w-48 mx-auto bg-gray-200" />
        </div>
      </div>
    </div>
  )
}
