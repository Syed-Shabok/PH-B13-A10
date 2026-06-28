import { getAllTicketsForAdmin } from "@/lib/api/admin";
import ManageTicketsClient from "./ManageTicketsClient";
import DashboardHeading from "@/components/dashboard/DashboardHeading";

export default async function ManageTicketsPage() {
  let tickets = await getAllTicketsForAdmin();

  if (!Array.isArray(tickets)) {
    console.error("Failed to load tickets in admin dashboard");
    tickets = [];
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#091624] px-6 py-12 relative overflow-hidden transition-colors duration-300">
      <DashboardHeading
        title="Manage Tickets"
        description="Review, approve, and reject transport vectors submitted by vendors across the network."
      />

      <ManageTicketsClient initialTickets={tickets} />

      {/* Background Accent Orbs adapted for global themes */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00ADB5]/10 dark:bg-[#124170]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#67C090]/10 dark:bg-[#AAFFC7]/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
