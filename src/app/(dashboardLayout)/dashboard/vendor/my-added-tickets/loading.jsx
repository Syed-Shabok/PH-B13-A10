import DashboardHeading from "@/components/dashboard/DashboardHeading";

const AddedTicketsLoadingPage = () => {
  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#091624] px-6 py-12">
      <DashboardHeading
        title="My Added Tickets"
        description="Loading your ticket inventory..."
      />

      <div className="mt-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-full rounded-3xl border border-zinc-200/60 dark:border-[#1a3d61] overflow-hidden animate-pulse"
            >
              <div className="h-44 bg-zinc-200 dark:bg-[#1a3d61]/40" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full w-3/4" />
                <div className="h-3 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full w-1/2" />
                <div className="h-3 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-full w-2/3" />
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="h-8 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-xl" />
                  <div className="h-8 bg-zinc-200 dark:bg-[#1a3d61]/40 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddedTicketsLoadingPage;
