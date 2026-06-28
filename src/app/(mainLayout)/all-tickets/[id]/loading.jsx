// src/app/(dashboardLayout)/dashboard/all-tickets/[id]/loading.jsx

export default function TicketDetailsLoadingPage() {
  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#091624] relative overflow-hidden transition-colors duration-300 pt-24 pb-12 px-6">
      {/* Background Accent Orbs for Dark Glassmorphism (Matches the Server Page exactly) */}
      <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-[#00ADB5]/10 dark:bg-[#124170]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#102226]/40 dark:bg-[#452C20]/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Skeleton Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto space-y-10 animate-pulse">
        {/* Back Button Skeleton */}
        <div className="h-6 w-32 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-md" />

        {/* Hero Banner Skeleton */}
        <div className="h-[300px] md:h-[450px] w-full rounded-[2.5rem] bg-zinc-200/80 dark:bg-[#1a3d61]/40 border border-zinc-200/60 dark:border-[#1a3d61] shadow-2xl" />

        {/* Content Grid (2 columns on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* LEFT COLUMN: Main Details Skeleton */}
          <div className="lg:col-span-2 space-y-12">
            {/* Title & Core Meta Skeleton */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-24 h-6 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-lg" />
                <div className="w-16 h-6 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-lg" />
              </div>

              <div className="w-3/4 h-12 md:h-16 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-2xl" />
              <div className="w-1/2 h-12 md:h-16 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-2xl hidden md:block" />

              <div className="flex flex-wrap gap-8 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-200 dark:bg-[#1a3d61]/60" />
                  <div className="space-y-2">
                    <div className="w-16 h-3 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full" />
                    <div className="w-24 h-4 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-full" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-200 dark:bg-[#1a3d61]/60" />
                  <div className="space-y-2">
                    <div className="w-16 h-3 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full" />
                    <div className="w-32 h-4 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* MASSIVE Countdown Section Skeleton */}
            <div className="bg-white/40 dark:bg-[#124170]/10 border border-zinc-200/60 dark:border-[#1a3d61] rounded-3xl p-8 shadow-lg">
              <div className="w-40 h-4 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full mb-6" />
              <div className="w-full max-w-md h-12 md:h-16 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-2xl" />
            </div>

            {/* Amenities & Perks Skeleton */}
            <div className="space-y-5">
              <div className="w-48 h-6 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-lg" />
              <div className="flex flex-wrap gap-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-28 h-10 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-xl"
                  />
                ))}
              </div>
            </div>

            {/* Expanded Vendor Information Skeleton */}
            <div className="space-y-5 pt-8 border-t border-zinc-200/60 dark:border-[#1a3d61]/60">
              <div className="w-56 h-6 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-lg mb-6" />
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-[#1a3d61]/60" />
                  <div className="space-y-2">
                    <div className="w-20 h-3 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full" />
                    <div className="w-32 h-4 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-full" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-[#1a3d61]/60" />
                  <div className="space-y-2">
                    <div className="w-20 h-3 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full" />
                    <div className="w-40 h-4 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="w-48 h-3 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full mt-4" />
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Booking Card Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 dark:bg-[#124170]/20 border border-zinc-200/60 dark:border-[#1a3d61] rounded-[2rem] p-8 shadow-2xl flex flex-col gap-8">
              {/* Pricing Header Skeleton */}
              <div>
                <div className="w-32 h-3 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full mb-3" />
                <div className="w-40 h-12 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-2xl" />
              </div>

              {/* Status Bar Skeleton */}
              <div className="bg-zinc-100/80 dark:bg-[#091624]/60 rounded-2xl p-4 border border-zinc-200/60 dark:border-[#1a3d61]/40 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="w-20 h-3 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full" />
                  <div className="w-24 h-3 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-full" />
                </div>
                <div className="w-full h-2 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-full" />
              </div>

              {/* Booking CTA Skeleton */}
              <div className="w-full h-16 rounded-2xl bg-zinc-200 dark:bg-[#1a3d61]/60" />

              {/* Disclaimer Text Skeleton */}
              <div className="w-48 h-2.5 mx-auto bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
