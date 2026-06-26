import { verifyRole } from "@/lib/core/session";

const AdminDashboardLayout = async ({ children }) => {
  await verifyRole("passenger");
  return children;
};

export default AdminDashboardLayout;
