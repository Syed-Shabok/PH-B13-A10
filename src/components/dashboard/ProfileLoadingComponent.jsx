import DashboardHeading from "./DashboardHeading";

const ProfileLoadingComponent = () => {
  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#091624] px-6 py-12 relative overflow-hidden transition-colors duration-300">
      <DashboardHeading
        title="Account Profile"
        description="Loading your personal account data..."
      />

      <div className="mt-8 relative z-10 max-w-3xl mx-auto w-full animate-pulse">
        <div className="w-full overflow-hidden bg-white/70 dark:bg-[#124170]/10 backdrop-blur-xl rounded-3xl border border-zinc-200/60 dark:border-[#1a3d61] shadow-2xl">
          {/* Banner Skeleton */}
          <div className="h-44 w-full bg-zinc-200 dark:bg-[#1a3d61]/40 border-b border-zinc-200/60 dark:border-[#1a3d61]/60" />

          <div className="px-6 sm:px-8 pb-10 relative">
            {/* Avatar & Button Skeleton - Fixed to match responsive ProfileClient layout */}
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end -mt-16 mb-8 gap-4 sm:gap-0">
              <div className="w-32 h-32 rounded-full border-[6px] border-white dark:border-[#091624] bg-zinc-300 dark:bg-[#1a3d61]/60 shrink-0" />
              <div className="w-full sm:w-36 h-11 rounded-full bg-zinc-200 dark:bg-[#1a3d61]/50" />
            </div>

            {/* Name Skeleton - Centered on mobile to match client page behavior */}
            <div className="space-y-3 mb-10 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="h-8 bg-zinc-200 dark:bg-[#1a3d61]/50 rounded-full w-48" />
              <div className="h-4 bg-zinc-200 dark:bg-[#1a3d61]/30 rounded-full w-24" />
            </div>

            {/* Data Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-100 dark:bg-[#124170]/10 border border-zinc-200/60 dark:border-[#1a3d61]/40">
                <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-[#1a3d61]/50 shrink-0" />
                <div className="space-y-2 w-full">
                  <div className="h-2.5 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full w-20" />
                  <div className="h-4 bg-zinc-200 dark:bg-[#1a3d61]/50 rounded-full w-3/4" />
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-100 dark:bg-[#124170]/10 border border-zinc-200/60 dark:border-[#1a3d61]/40">
                <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-[#1a3d61]/50 shrink-0" />
                <div className="space-y-2 w-full">
                  <div className="h-2.5 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full w-24" />
                  <div className="h-4 bg-zinc-200 dark:bg-[#1a3d61]/50 rounded-full w-1/2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient Decorators */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#AAFFC7]/5 dark:bg-[#67C090]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#67C090]/5 dark:bg-[#AAFFC7]/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

export default ProfileLoadingComponent;
