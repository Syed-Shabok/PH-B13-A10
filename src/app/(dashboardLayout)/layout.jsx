import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-white dark:bg-[#124170] transition-colors duration-300">
      <DashboardSidebar />
      <main className="flex-1 w-full overflow-x-hidden overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
