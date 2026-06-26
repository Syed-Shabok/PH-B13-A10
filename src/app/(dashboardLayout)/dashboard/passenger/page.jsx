import { getUserSession } from "@/lib/core/session";
import DashboardHeading from "@/components/dashboard/DashboardHeading";
import ProfileClient from "@/components/dashboard/ProfileClient";
import { protectedFetch } from "@/lib/core/server";

const ProfilePage = async () => {
  const session = await getUserSession();
  let dbUser = null;

  if (session?.email) {
    try {
      dbUser = await protectedFetch(`/api/users/${session.email}`);

      if (dbUser?.error) {
        dbUser = null;
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  }

  const initialProfile = dbUser || {
    name: session?.name || "",
    email: session?.email || "",
    image: session?.image || "",
    role: "User",
  };

  // Create a clean first-name extraction for the welcome message
  const firstName = initialProfile?.name?.split(" ")[0] || "User";

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#091624] px-6 py-12 relative overflow-hidden transition-colors duration-300">
      <DashboardHeading
        title={`Welcome back, ${firstName}!`}
        description="View and manage your personal account settings and aesthetics."
      />
      <ProfileClient initialProfile={initialProfile} />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00ADB5]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#452C20]/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

export default ProfilePage;
