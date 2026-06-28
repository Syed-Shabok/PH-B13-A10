import React from "react";
import DashboardHeading from "@/components/dashboard/DashboardHeading";

export default function LoadingTransactionHistory() {
  // Create an array of 5 empty items to fill the skeleton table
  const skeletonRows = Array.from({ length: 5 });

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#091624] px-6 py-12 relative overflow-hidden transition-colors duration-300">
      {/* 1. Render actual heading instantly */}
      <DashboardHeading
        title="Transaction History"
        description="Review your past billing receipts, payment statuses, and ticket expenditures."
      />

      {/* 2. Skeleton Table Layout */}
      <div className="relative z-10 mx-auto w-full lg:px-10">
        <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-200/60 dark:border-[#1a3d61] bg-white/70 dark:bg-[#124170]/20 backdrop-blur-xl shadow-2xl animate-pulse">
          <table className="w-full text-left text-sm block md:table">
            {/* Table Header (Desktop Only - Matching the Client) */}
            <thead className="hidden md:table-header-group bg-zinc-100/80 dark:bg-[#0b1d30]/80 text-xs uppercase font-black text-[#124170] dark:text-[#00ADB5] tracking-widest border-b border-zinc-200/60 dark:border-[#1a3d61]">
              <tr>
                <th className="px-6 py-4">Transaction Details</th>
                <th className="px-6 py-4">Ticket Info</th>
                <th className="px-6 py-4">Payment Date</th>
                <th className="px-6 py-4 text-right">Amount Paid</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="block md:table-row-group divide-y divide-zinc-200/60 dark:divide-[#1a3d61]/50">
              {skeletonRows.map((_, index) => (
                <tr key={index} className="block md:table-row p-5 md:p-0">
                  {/* Col 1: Transaction Details */}
                  <td className="block md:table-cell px-2 md:px-6 py-2 md:py-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                      <span className="md:hidden text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                        Transaction Details
                      </span>
                      <div className="flex items-center gap-3 w-full">
                        {/* Icon Skeleton */}
                        <div className="w-10 h-10 rounded-xl bg-zinc-300 dark:bg-[#1a3d61] shrink-0" />
                        <div className="space-y-2">
                          {/* ID Skeleton */}
                          <div className="h-4 w-32 bg-zinc-300 dark:bg-[#1a3d61] rounded-md" />
                          {/* Status Badge Skeleton */}
                          <div className="h-4 w-16 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-md" />
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Col 2: Ticket Info */}
                  <td className="block md:table-cell px-2 md:px-6 py-2 md:py-4">
                    <div className="flex flex-col md:block mt-2 md:mt-0 space-y-2">
                      <span className="md:hidden text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">
                        Ticket Info
                      </span>
                      {/* Title Skeleton */}
                      <div className="h-4 w-40 max-w-full bg-zinc-300 dark:bg-[#1a3d61] rounded-md" />
                      {/* Qty Skeleton */}
                      <div className="h-3 w-16 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-md" />
                    </div>
                  </td>

                  {/* Col 3: Payment Date */}
                  <td className="block md:table-cell px-2 md:px-6 py-2 md:py-4">
                    <div className="flex flex-col md:block mt-2 md:mt-0 space-y-2">
                      <span className="md:hidden text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">
                        Payment Date
                      </span>
                      {/* Date Skeleton */}
                      <div className="h-4 w-28 bg-zinc-300 dark:bg-[#1a3d61] rounded-md" />
                    </div>
                  </td>

                  {/* Col 4: Amount Paid */}
                  <td className="block md:table-cell px-2 md:px-6 pt-3 pb-1 md:py-4 text-left md:text-right border-t border-dashed md:border-none border-zinc-200/60 dark:border-[#1a3d61]/50 mt-3 md:mt-0">
                    <div className="flex items-center justify-between md:block md:space-y-2">
                      <span className="md:hidden text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                        Amount Paid
                      </span>
                      <div className="flex flex-col md:items-end space-y-1">
                        {/* "Total" Text Skeleton (Desktop) */}
                        <div className="hidden md:block h-2 w-8 bg-zinc-200 dark:bg-[#1a3d61]/60 rounded-md" />
                        {/* Price Skeleton */}
                        <div className="h-6 w-20 bg-zinc-300 dark:bg-[#1a3d61] rounded-md" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Matching Background Ambient Glow Objects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00ADB5]/10 dark:bg-[#124170]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#67C090]/10 dark:bg-[#AAFFC7]/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
