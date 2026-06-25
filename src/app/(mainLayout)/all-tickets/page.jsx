import { getAllTickets } from "@/lib/api/tickets";
import DashboardHeading from "@/components/dashboard/DashboardHeading";
import AllTicketsClient from "./AllTicketsClient";

export default async function AllTicketsPage({ searchParams }) {
  // Await searchParams and prepare fallback object
  const filters = await searchParams;
  const filterObj = { ...filters };

  // Convert object to URL query string
  const querySearch = new URLSearchParams(filters);
  const queryString = querySearch.toString();

  // Fetch filtered tickets from the backend
  const tickets = (await getAllTickets(queryString)) || [];

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#091624] px-6 py-12 relative overflow-hidden transition-colors duration-300">
      <DashboardHeading
        title="Explore Tickets"
        description="Browse available transport vectors, flight systems, and luxury cruise lines across the network."
      />

      {/* Pass data to the Client Wrapper to handle filtering interactivity */}
      <AllTicketsClient tickets={tickets} filters={filterObj} />
      {/* Shared Aesthetic Accent Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00ADB5]/10 dark:bg-[#124170]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#67C090]/10 dark:bg-[#AAFFC7]/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
