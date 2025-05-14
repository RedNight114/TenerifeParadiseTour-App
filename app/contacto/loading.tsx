import { Skeleton } from "@/components/ui/skeleton"

export default function ContactoLoading() {
  return (
    <div className="container mx-auto py-6 md:py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          <Skeleton className="h-[500px] w-full rounded-lg" />
          <Skeleton className="h-[500px] w-full rounded-lg" />
        </div>

        <Skeleton className="h-[300px] w-full rounded-lg mb-8 md:mb-12" />
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>
    </div>
  )
}
