"use client";

import { useEffect, useState } from "react";
import DashboardHeading from "@/components/dashboard/DashboardHeading";
import { Button } from "@heroui/react";
import { updateBookingStatus } from "@/lib/actions/bookings";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

export default function RequestedBookingsPage() {
  const [requests, setRequests] = useState([]);
  const { data: session } = useSession();

  const user = session?.user;
  const vendorEmail = user?.email;

  // Fetch logic (Client-side example, can be moved to Server Component)
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings/vendor/${vendorEmail}`,
    )
      .then((res) => res.json())
      .then((data) => setRequests(data));
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const res = await updateBookingStatus(id, newStatus);
    if (res.modifiedCount > 0) {
      toast.success(`Booking ${newStatus} successfully!`);
      // Update local state to reflect UI instantly
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: newStatus } : req,
        ),
      );
    }
  };

  return (
    <div className="p-6">
      <DashboardHeading
        title="Requested Bookings"
        description="Manage incoming ticket reservations from users."
      />

      <div className="mt-8 overflow-x-auto rounded-3xl border border-[#1a3d61] bg-[#102226]/40 backdrop-blur-xl">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="bg-[#0b1d30]/80 text-xs uppercase font-black text-[#00ADB5] tracking-wider border-b border-[#1a3d61]">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Ticket Details</th>
              <th className="px-6 py-4">Qty & Price</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a3d61]/50">
            {requests.map((req) => (
              <tr key={req._id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-medium text-white">
                  {req.passengerEmail}
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-white mb-1">{req.ticketTitle}</p>
                  <p className="text-xs">
                    {req.from} → {req.to}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-white font-bold">
                    {req.bookingQuantity} Seats
                  </p>
                  <p className="text-[#AAFFC7] font-black">৳{req.totalPrice}</p>
                </td>
                <td className="px-6 py-4 text-center">
                  {req.status === "pending" ? (
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        onPress={() => handleStatusChange(req._id, "accepted")}
                        className="bg-[#00ADB5]/20 text-[#00ADB5] border border-[#00ADB5]/50 hover:bg-[#00ADB5] hover:text-[#091624] font-bold tracking-wider rounded-lg"
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        onPress={() => handleStatusChange(req._id, "rejected")}
                        className="bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white font-bold tracking-wider rounded-lg"
                      >
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <span
                      className={`text-xs font-black uppercase tracking-wider ${req.status === "accepted" || req.status === "paid" ? "text-[#AAFFC7]" : "text-red-500"}`}
                    >
                      {req.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
