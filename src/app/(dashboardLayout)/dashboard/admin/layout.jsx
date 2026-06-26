import { verifyRole } from "@/lib/core/session";

const AdminDashboardLayout = async ({ children }) => {
  await verifyRole("admin");
  return children;
};

export default AdminDashboardLayout;
