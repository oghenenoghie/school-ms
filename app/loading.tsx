import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f5f7ff_0%,#edf2f7_42%,#e7edf4_100%)] p-4 lg:p-6">
      <div className="mx-auto grid max-w-[1580px] gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <div className="rounded-[2rem] border border-white/70 bg-white/70 p-5">
          <Skeleton className="h-12 w-40 rounded-2xl" />
          <Skeleton className="mt-6 h-32 rounded-[1.75rem]" />
          <div className="mt-6 flex flex-col gap-3">
            {Array.from({ length: 7 }).map((_, index) => (
              <Skeleton key={index} className="h-14 rounded-2xl" />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-[2rem] border border-white/70 bg-white/75 p-5">
            <Skeleton className="h-10 w-80 rounded-xl" />
            <Skeleton className="mt-4 h-5 w-[32rem] rounded-lg" />
            <div className="mt-6 flex flex-wrap gap-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-9 w-24 rounded-full" />
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-44 rounded-[1.5rem]" />
            ))}
          </div>

          <Skeleton className="h-[38rem] rounded-[2rem]" />
        </div>
      </div>
    </div>
  )
}
