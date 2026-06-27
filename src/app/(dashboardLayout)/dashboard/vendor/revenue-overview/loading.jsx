// src/app/(dashboardLayout)/dashboard/revenue/loading.jsx

import DashboardHeading from "@/components/dashboard/DashboardHeading";

const RevenueLoadingPage = () => {
  return (
    // FIX: Using h-full flex flex-col to prevent the bottom gap issue we fixed previously
    <div className="min-h-screen h-full flex flex-col w-full bg-slate-50 dark:bg-[#091624] px-6 py-12 relative overflow-hidden transition-colors duration-300">
      <DashboardHeading
        title="Revenue Overview"
        description="Compiling financial metrics and chart data..."
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full mt-8 flex-1">
        <div className="space-y-8 animate-pulse">
          {/* Top Metrics Row Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-full bg-white/70 dark:bg-[#124170]/20 backdrop-blur-xl border border-zinc-200/60 dark:border-[#1a3d61] p-6 rounded-3xl shadow-xl flex flex-row items-center gap-5"
              >
                {/* Icon Box Skeleton */}
                <div className="w-14 h-14 rounded-2xl bg-zinc-200 dark:bg-[#1a3d61]/60 shrink-0" />

                {/* Text Skeletons */}
                <div className="flex flex-col gap-2 w-full">
                  <div className="h-2.5 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full w-20" />
                  <div className="h-8 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-lg w-28" />
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart Skeleton */}
            <div className="w-full bg-white/70 dark:bg-[#124170]/20 backdrop-blur-xl border border-zinc-200/60 dark:border-[#1a3d61] p-6 rounded-3xl shadow-xl">
              <div className="h-3.5 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-full w-40 mb-8" />
              <div className="h-[300px] w-full flex items-end justify-between gap-4 pb-2 px-2">
                {/* Predetermined heights instead of Math.random() */}
                {[60, 40, 80, 50, 90, 30, 70].map((height, i) => (
                  <div
                    key={i}
                    className="w-full bg-zinc-200/50 dark:bg-[#1a3d61]/30 rounded-t-sm"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Pie Chart Skeleton */}
            <div className="w-full bg-white/70 dark:bg-[#124170]/20 backdrop-blur-xl border border-zinc-200/60 dark:border-[#1a3d61] p-6 rounded-3xl shadow-xl">
              <div className="h-3.5 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-full w-48 mb-6" />
              <div className="h-[300px] w-full flex items-center justify-center">
                {/* Simulated Donut/Pie shape */}
                <div className="w-[200px] h-[200px] rounded-full border-[30px] border-zinc-200/50 dark:border-[#1a3d61]/30" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shared Ambient Theme Decorators */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00ADB5]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#AAFFC7]/5 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
};

export default RevenueLoadingPage;
