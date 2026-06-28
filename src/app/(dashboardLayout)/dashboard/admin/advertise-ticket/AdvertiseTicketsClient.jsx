"use client";

import { useState } from "react";
import { toggleTicketAdvertisement } from "@/lib/api/admin";
import toast from "react-hot-toast";
import { FaBullhorn, FaBan, FaRegStar, FaStar } from "react-icons/fa";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";

export default function AdvertiseTicketsClient({ initialTickets }) {
  const [tickets, setTickets] = useState(initialTickets);
  const [processingId, setProcessingId] = useState(null);

  // Calculate how many of the 6 slots are currently taken
  const advertisedCount = tickets.filter((t) => t.isAdvertised).length;
  const isMaxedOut = advertisedCount >= 6;

  const handleToggle = async (id, currentAdStatus) => {
    const newAdStatus = !currentAdStatus;

    // Client-side hard block to prevent unnecessary server requests
    if (newAdStatus && isMaxedOut) {
      toast.error("Maximum of 6 tickets are already featured.");
      return;
    }

    try {
      setProcessingId(id);
      const res = await toggleTicketAdvertisement(id, newAdStatus);
      if (res.error || res.message) {
        toast.error(res.message || res.error);
        return;
      }

      if (res.modifiedCount > 0 || res.matchedCount > 0) {
        toast.success(
          newAdStatus
            ? "Ticket successfully pushed to Homepage!"
            : "Advertisement removed.",
        );
        setTickets((prev) =>
          prev.map((ticket) =>
            ticket._id === id
              ? { ...ticket, isAdvertised: newAdStatus }
              : ticket,
          ),
        );
      } else {
        toast.error("Failed to update advertisement status.");
      }
    } catch (error) {
      console.error(error);
      toast.error("A network error occurred.");
    } finally {
      setProcessingId(null);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (tickets.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 flex flex-col items-center justify-center p-16 border border-dashed border-zinc-200 dark:border-[#1a3d61] rounded-3xl bg-white/40 dark:bg-[#124170]/5 backdrop-blur-md shadow-sm"
      >
        <p className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest text-sm text-center">
          No Approved Tickets Available
          <br />
          <span className="text-xs font-medium opacity-70 mt-2 block normal-case">
            Tickets must be approved before they can be advertised.
          </span>
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-8"
    >
      {/* Redesigned Marketing Slots Display Counter */}
      <motion.div
        variants={itemVariants}
        className="mb-6 flex items-center justify-between p-4 border border-zinc-200/60 dark:border-[#1a3d61] rounded-2xl bg-white/60 dark:bg-[#124170]/10 backdrop-blur-md shadow-sm"
      >
        <div className="flex items-center gap-2 text-xs font-black text-[#124170] dark:text-[#00ADB5] uppercase tracking-widest">
          <FaBullhorn className="text-amber-500 text-sm" />
          <span>Marketing Slots Filled</span>
        </div>
        <div className="text-sm font-black tracking-widest text-zinc-800 dark:text-white">
          <span
            className={
              isMaxedOut
                ? "text-red-500 animate-pulse"
                : "text-[#124170] dark:text-[#00ADB5]"
            }
          >
            {advertisedCount}
          </span>
          <span className="text-zinc-400 dark:text-zinc-500"> / 6</span>
        </div>
      </motion.div>

      {/* Redesigned Responsive Glassmorphic Table Container */}
      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-3xl border border-zinc-200/60 dark:border-[#1a3d61] bg-white/70 dark:bg-[#124170]/20 backdrop-blur-xl shadow-2xl"
      >
        <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400 block md:table">
          <thead className="hidden md:table-header-group bg-zinc-100/80 dark:bg-[#0b1d30]/80 text-xs uppercase font-black text-[#124170] dark:text-[#00ADB5] tracking-wider border-b border-zinc-200/60 dark:border-[#1a3d61]">
            <tr>
              <th className="px-6 py-4">Vendor</th>
              <th className="px-6 py-4">Ticket Info</th>
              <th className="px-6 py-4">Fare & Qty</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group divide-y divide-zinc-200/60 dark:divide-[#1a3d61]/50">
            {tickets.map((ticket) => (
              <tr
                key={ticket._id}
                className={`block md:table-row p-4 md:p-0 transition-colors ${
                  ticket.isAdvertised
                    ? "bg-amber-500/[0.03] dark:bg-amber-500/[0.02] hover:bg-amber-500/[0.06] dark:hover:bg-amber-500/[0.04]"
                    : "hover:bg-zinc-50/50 dark:hover:bg-white/5"
                }`}
              >
                {/* Vendor Column */}
                <td className="block md:table-cell px-2 md:px-6 py-2 md:py-4">
                  <div className="flex flex-col md:block">
                    <span className="md:hidden text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                      Vendor
                    </span>
                    <p className="font-semibold text-zinc-900 dark:text-white">
                      {ticket.vendorName}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      {ticket.vendorEmail}
                    </p>
                  </div>
                </td>

                {/* Ticket Info Column */}
                <td className="block md:table-cell px-2 md:px-6 py-2 md:py-4">
                  <div className="flex flex-col md:block">
                    <span className="md:hidden text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                      Ticket Info
                    </span>
                    <p className="font-bold text-zinc-900 dark:text-white text-sm line-clamp-1 mb-0.5">
                      {ticket.title || ticket.ticketTitle}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      {ticket.from}{" "}
                      <span className="text-[#124170] dark:text-[#00ADB5]">
                        →
                      </span>{" "}
                      {ticket.to}
                    </p>
                    <span className="inline-block mt-2 text-[9px] font-black uppercase tracking-widest bg-zinc-100 dark:bg-[#124170]/40 border border-zinc-200 dark:border-[#1a3d61] text-[#124170] dark:text-[#AAFFC7] px-2 py-0.5 rounded-md">
                      {ticket.transportType}
                    </span>
                  </div>
                </td>

                {/* Fare & Qty Column */}
                <td className="block md:table-cell px-2 md:px-6 py-2 md:py-4">
                  <div className="flex items-center justify-between md:block">
                    <span className="md:hidden text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                      Fare & Qty
                    </span>
                    <div className="text-right md:text-left">
                      <p className="font-black text-[#124170] dark:text-[#AAFFC7]">
                        ৳{ticket.price}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        Qty:{" "}
                        <span className="text-zinc-800 dark:text-zinc-200 font-bold">
                          {ticket.quantity}
                        </span>
                      </p>
                    </div>
                  </div>
                </td>

                {/* Ad Status Column */}
                <td className="block md:table-cell px-2 md:px-6 py-2 md:py-4">
                  <div className="flex items-center justify-between md:block">
                    <span className="md:hidden text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                      Status
                    </span>
                    <div className="flex justify-end md:justify-start">
                      {ticket.isAdvertised ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border rounded-lg bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-500">
                          <FaStar size={10} /> Featured
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border rounded-lg bg-zinc-500/10 text-zinc-500 border-zinc-500/20 dark:text-zinc-400">
                          Standard
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Action Column */}
                <td className="block md:table-cell px-2 md:px-6 pt-4 pb-2 md:py-4 text-center border-t border-dashed md:border-none border-zinc-200/60 dark:border-[#1a3d61]/50 mt-3 md:mt-0">
                  <div className="flex justify-start md:justify-center w-full">
                    <Button
                      size="sm"
                      isLoading={processingId === ticket._id}
                      onPress={() =>
                        handleToggle(ticket._id, ticket.isAdvertised)
                      }
                      disabled={
                        (isMaxedOut && !ticket.isAdvertised) ||
                        processingId !== null
                      }
                      className={`font-bold tracking-wider rounded-xl transition-all w-full md:w-auto text-[11px] uppercase tracking-widest h-9 px-4 border shadow-sm ${
                        ticket.isAdvertised
                          ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 border-red-200 dark:border-red-500/30 hover:bg-red-100 dark:hover:bg-red-500 dark:hover:text-white"
                          : "bg-zinc-100 dark:bg-[#00ADB5]/20 text-[#124170] dark:text-[#00ADB5] border-zinc-200 dark:border-[#00ADB5]/50 hover:bg-zinc-200 dark:hover:bg-[#00ADB5] dark:hover:text-white hover:text-[#091624]"
                      }`}
                      startContent={
                        processingId !== ticket._id &&
                        (ticket.isAdvertised ? (
                          <FaBan size={10} />
                        ) : (
                          <FaRegStar size={10} />
                        ))
                      }
                    >
                      {ticket.isAdvertised ? "Remove Ad" : "Advertise"}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
