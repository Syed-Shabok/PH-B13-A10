import DashboardHeading from "@/components/dashboard/DashboardHeading";
import { getUserSession } from "@/lib/core/session";
import { getVendorStats } from "@/lib/api/vendor";
import RevenueClient from "./RevenueClient";

export default async function RevenueOverviewPage() {
  const user = await getUserSession();
  let stats = await getVendorStats(user?.email);

  // Fallback structure if API fails or user has no sales yet
  if (!stats || stats.error) {
    stats = {
      totalTicketsAdded: 0,
      totalTicketsSold: 0,
      totalRevenue: 0,
      chartData: [],
    };
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#091624] px-6 py-12 relative overflow-hidden transition-colors duration-300">
      <DashboardHeading
        title="Revenue Overview"
        description="Track your ticket sales, overall platform revenue, and performance metrics."
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full mt-8">
        <RevenueClient stats={stats} />
      </div>

      {/* Shared Ambient Theme Decorators */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00ADB5]/10 dark:bg-[#124170]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#67C090]/10 dark:bg-[#AAFFC7]/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
