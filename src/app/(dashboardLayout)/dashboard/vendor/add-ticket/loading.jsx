import DashboardHeading from "@/components/dashboard/DashboardHeading";

const AddTicketLoadingPage = () => {
  return (
    <div className="min-h-[85vh] w-full bg-slate-50 dark:bg-[#091624] px-6 py-12 relative overflow-hidden">
      <DashboardHeading
        title="Add Ticket"
        description="Loading form modules..."
      />

      {/* Main Structural Form Wrapper Mimic */}
      <div className="mt-8 relative z-10 flex flex-col items-start max-w-4xl mx-auto w-full animate-pulse">
        <div className="w-full bg-white/70 dark:bg-[#124170]/10 backdrop-blur-xl rounded-3xl border border-zinc-200/60 dark:border-[#1a3d61] shadow-2xl">
          {/* Card Header Skeleton */}
          <div className="flex flex-col gap-3 pb-6 border-b border-zinc-200/60 dark:border-[#1a3d61]/60 p-8">
            <div className="h-6 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full w-48" />
            <div className="h-3 bg-zinc-200 dark:bg-[#1a3d61]/30 rounded-full w-3/4 mt-1" />
          </div>

          <div className="p-8 space-y-6">
            {/* Ticket Title Input Skeleton */}
            <div className="space-y-2">
              <div className="h-3 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full w-20" />
              <div className="h-10 bg-zinc-200/60 dark:bg-[#0b1d30]/60 border border-zinc-200 dark:border-[#1B3C61]/50 rounded-xl w-full" />
            </div>

            {/* From & To Row Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="h-3 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full w-32" />
                <div className="h-10 bg-zinc-200/60 dark:bg-[#0b1d30]/60 border border-zinc-200 dark:border-[#1B3C61]/50 rounded-xl w-full" />
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full w-36" />
                <div className="h-10 bg-zinc-200/60 dark:bg-[#0b1d30]/60 border border-zinc-200 dark:border-[#1B3C61]/50 rounded-xl w-full" />
              </div>
            </div>

            {/* Transport Type & Date Row Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="h-3 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full w-24" />
                <div className="h-10 bg-zinc-200/60 dark:bg-[#0b1d30]/60 border border-zinc-200 dark:border-[#1B3C61]/50 rounded-xl w-full" />
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full w-28" />
                <div className="h-10 bg-zinc-200/60 dark:bg-[#0b1d30]/60 border border-zinc-200 dark:border-[#1B3C61]/50 rounded-xl w-full" />
              </div>
            </div>

            {/* Price & Quantity Row Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="h-3 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full w-24" />
                <div className="h-10 bg-zinc-200/60 dark:bg-[#0b1d30]/60 border border-zinc-200 dark:border-[#1B3C61]/50 rounded-xl w-full" />
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full w-24" />
                <div className="h-10 bg-zinc-200/60 dark:bg-[#0b1d30]/60 border border-zinc-200 dark:border-[#1B3C61]/50 rounded-xl w-full" />
              </div>
            </div>

            {/* Perks Checklist Block Skeleton */}
            <div className="border-t border-b border-zinc-200/60 dark:border-[#1a3d61]/80 py-6 space-y-4">
              <div className="h-4 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full w-40" />
              <div className="flex flex-wrap gap-3">
                {[...Array(4)].map((_, idx) => (
                  <div
                    key={idx}
                    className="h-9 w-24 bg-zinc-200/60 dark:bg-[#0b1d30]/40 border border-zinc-200 dark:border-[#1a3d61] rounded-full"
                  />
                ))}
              </div>
            </div>

            {/* Image File Box Input Skeleton */}
            <div className="space-y-2 py-2">
              <div className="h-3 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full w-56" />
              <div className="h-14 bg-zinc-200/60 dark:bg-[#0b1d30]/60 border border-zinc-200 dark:border-[#1B3C61]/50 rounded-xl w-full" />
            </div>

            {/* Readonly Vendor Meta Box Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-50 dark:bg-[#124170]/5 p-6 rounded-2xl border border-zinc-200/60 dark:border-[#1a3d61]/60 mt-4">
              <div className="space-y-2">
                <div className="h-2.5 bg-zinc-200 dark:bg-[#1a3d61]/30 rounded-full w-28" />
                <div className="h-10 bg-zinc-200/40 dark:bg-[#0b1d30]/40 rounded-xl w-full" />
              </div>
              <div className="space-y-2">
                <div className="h-2.5 bg-zinc-200 dark:bg-[#1a3d61]/30 rounded-full w-36" />
                <div className="h-10 bg-zinc-200/40 dark:bg-[#0b1d30]/40 rounded-xl w-full" />
              </div>
            </div>

            {/* Submission CTA Trigger Button Skeleton */}
            <div className="pt-6 border-t border-zinc-200/60 dark:border-[#1a3d61]/60 mt-4">
              <div className="h-12 w-full sm:w-36 bg-zinc-200 dark:bg-[#1a3d61]/50 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Blur Orbs Match */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-zinc-200/20 dark:bg-[#1a3d61]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-zinc-200/20 dark:bg-[#1a3d61]/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

export default AddTicketLoadingPage;
