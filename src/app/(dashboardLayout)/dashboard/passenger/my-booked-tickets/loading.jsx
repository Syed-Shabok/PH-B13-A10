import React from "react";
import DashboardHeading from "@/components/dashboard/DashboardHeading";

export default function LoadingMyBookedTickets() {
  // Create an array of 6 empty items to map over for a full-looking grid
  const skeletonCards = Array.from({ length: 6 });

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#091624] px-6 py-12 relative overflow-hidden transition-colors duration-300">
      {/* Structural Heading content area wrapper */}
      <div className="relative z-10 mx-auto w-full lg:px-10">
        {/* Render the actual heading instantly so the user knows they are in the right place */}
        <DashboardHeading
          title="My Booked Tickets"
          description="Track your pending requests and complete payments for approved travels."
        />

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {skeletonCards.map((_, index) => (
            <div
              key={index}
              className="w-full h-[280px] bg-white/40 dark:bg-[#124170]/10 backdrop-blur-xl rounded-3xl border border-zinc-200/60 dark:border-[#1a3d61] shadow-sm flex flex-col p-6 animate-pulse"
            >
              {/* Top Section: Title & Route Skeleton */}
              <div className="flex justify-between items-start mb-6">
                <div className="w-full space-y-3">
                  <div className="h-6 w-3/4 bg-zinc-300 dark:bg-[#1a3d61] rounded-lg" />
                  <div className="h-4 w-1/2 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-md" />
                </div>
                {/* Status Badge Skeleton */}
                <div className="h-6 w-16 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-full shrink-0" />
              </div>

              {/* Middle Section: Details Block Skeleton */}
              <div className="space-y-4 mb-auto">
                <div className="flex justify-between">
                  <div className="h-4 w-1/3 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-md" />
                  <div className="h-4 w-1/4 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-md" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-1/4 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-md" />
                  <div className="h-4 w-1/3 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-md" />
                </div>
              </div>

              {/* Bottom Section: Action Button Skeleton */}
              <div className="mt-6 pt-4 border-t border-zinc-200/60 dark:border-[#1a3d61]/50">
                <div className="h-10 w-full bg-zinc-300 dark:bg-[#1a3d61] rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Vector Ambient Glows (Matches the main page perfectly) */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00ADB5]/10 dark:bg-[#124170]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#67C090]/10 dark:bg-[#AAFFC7]/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
