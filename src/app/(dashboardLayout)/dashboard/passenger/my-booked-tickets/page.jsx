import { Card, Button } from "@heroui/react";
import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getUserSession } from "@/lib/core/session";
import DashboardHeading from "@/components/dashboard/DashboardHeading";
import { getPassengerBookings } from "@/lib/api/bookings";

export default async function MyBookedTicketsPage() {
  const user = await getUserSession();

  const sessionEmail = user?.email;
  console.log("Email in passenger Dashboard: ", sessionEmail);
  const bookings = (await getPassengerBookings(sessionEmail)) || [];

  console.log("Bookings in passenger Dashboard: ", bookings);

  return (
    <div className="p-6">
      <DashboardHeading
        title="My Booked Tickets"
        description="Track your pending requests and complete payments for approved travels."
      />

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {bookings.map((booking) => (
            <Card
              key={booking._id}
              className="bg-[#102226]/40 backdrop-blur-xl border border-[#1a3d61] p-5 flex flex-col justify-between h-full rounded-3xl shadow-xl"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-white text-lg line-clamp-1">
                    {booking.ticketTitle}
                  </h3>
                  <StatusBadge status={booking.status} />
                </div>

                <div className="space-y-2 text-sm text-zinc-400 mb-6 border-l-2 border-[#00ADB5]/30 pl-3">
                  <p>
                    <span className="text-zinc-500 font-semibold">Route:</span>{" "}
                    {booking.from} → {booking.to}
                  </p>
                  <p>
                    <span className="text-zinc-500 font-semibold">
                      Departure:
                    </span>{" "}
                    {new Date(booking.departureDateTime).toLocaleString()}
                  </p>
                  <p>
                    <span className="text-zinc-500 font-semibold">Seats:</span>{" "}
                    {booking.bookingQuantity}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                    Total
                  </p>
                  <p className="text-xl font-black text-[#AAFFC7]">
                    ৳{booking.totalPrice}
                  </p>
                </div>

                {/* Only show Pay Now if Vendor Accepted */}
                {booking.status === "accepted" && (
                  <Button className="bg-[#00ADB5] hover:bg-[#009299] text-[#091624] font-black uppercase text-xs px-6 rounded-xl">
                    Pay Now
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="mt-12 flex flex-col items-center justify-center p-12 border border-dashed border-[#1a3d61] rounded-3xl bg-[#124170]/5">
          <p className="text-zinc-400 font-bold uppercase tracking-widest">
            No bookings found
          </p>
        </div>
      )}
    </div>
  );
}

// Helper component for uniform status styling
function StatusBadge({ status }) {
  if (status === "pending")
    return (
      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-black uppercase tracking-wider">
        <FaClock /> Pending
      </span>
    );
  if (status === "accepted")
    return (
      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#AAFFC7]/10 text-[#AAFFC7] border border-[#AAFFC7]/20 text-[10px] font-black uppercase tracking-wider">
        <FaCheckCircle /> Accepted
      </span>
    );
  if (status === "rejected")
    return (
      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] font-black uppercase tracking-wider">
        <FaTimesCircle /> Rejected
      </span>
    );
  if (status === "paid")
    return (
      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00ADB5]/10 text-[#00ADB5] border border-[#00ADB5]/20 text-[10px] font-black uppercase tracking-wider">
        <FaCheckCircle /> Paid
      </span>
    );
  return null;
}
