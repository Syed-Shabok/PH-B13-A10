import { getAllTicketsForAdmin } from "@/lib/api/admin";
import DashboardHeading from "@/components/dashboard/DashboardHeading";
import AdvertiseTicketsClient from "./AdvertiseTicketsClient";

export const metadata = {
  title: "Advertise Tickets | Admin",
  description: "Manage homepage featured tickets and marketing slots.",
};

export default async function AdvertiseTicketsPage() {
  let allTickets = await getAllTicketsForAdmin();

  if (!Array.isArray(allTickets)) {
    console.error("Failed to load tickets for advertisement page");
    allTickets = [];
  }

  // Marketing Rule: Only "approved" tickets are eligible for advertisement
  const eligibleTickets = allTickets.filter(
    (ticket) => ticket.status === "approved",
  );

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#091624] px-6 py-12 relative overflow-hidden transition-colors duration-300">
      {/* Background Accent Orbs for Marketing Aesthetics aligned with example design */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#00ADB5]/10 dark:bg-[#124170]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto w-full lg:px-10">
        <DashboardHeading
          title="Marketing & Advertisements"
          description="Control which vendor routes are featured on the public homepage. Maximum 6 slots available."
        />
        <AdvertiseTicketsClient initialTickets={eligibleTickets} />
      </div>
    </div>
  );
}
