import { verifyRole } from "@/lib/core/session";

const AdminDashboardLayout = async ({ children }) => {
  await verifyRole("vendor");
  return children;
};

export default AdminDashboardLayout;
