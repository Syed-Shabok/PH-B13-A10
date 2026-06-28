import DashboardHeading from "@/components/dashboard/DashboardHeading";
import ManageUsersClient from "./ManageUsersClient";
import { getAllUsers } from "@/lib/api/admin";

export default async function ManageUsersPage() {
  let users = await getAllUsers();
  if (!Array.isArray(users)) {
    console.error("Failed to load users in admin dashboard");
    users = [];
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#091624] px-6 py-12 relative overflow-hidden transition-colors duration-300">
      {/* Background Accent Orbs adapted to look uniform with the bookings design */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00ADB5]/10 dark:bg-[#124170]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto w-full lg:px-10">
        <DashboardHeading
          title="Manage Users"
          description="Control access levels, promote vendors, and monitor platform security."
        />
        <ManageUsersClient initialUsers={users} />
      </div>
    </div>
  );
}
