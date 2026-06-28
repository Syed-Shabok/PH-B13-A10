"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { updateTicketStatus, toggleTicketAdvertisement } from "@/lib/api/admin";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FaCheck,
  FaTimes,
  FaClock,
  FaTag,
  FaCalendarAlt,
  FaCalendarPlus,
  FaBullhorn,
  FaStar,
} from "react-icons/fa";

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

export default function ManageTicketsClient({ initialTickets }) {
  const [tickets, setTickets] = useState(initialTickets);
  const [processingId, setProcessingId] = useState(null);
  const [adProcessingId, setAdProcessingId] = useState(null);

  const handleStatusChange = async (id, newStatus) => {
    try {
      setProcessingId(id);
      const res = await updateTicketStatus(id, newStatus);
      if (res.error) {
        toast.error(res.error);
        return;
      }
      if (res.modifiedCount > 0 || res.matchedCount > 0) {
        toast.success(`Ticket marked as ${newStatus}`);
        setTickets((prev) =>
          prev.map((ticket) =>
            ticket._id === id ? { ...ticket, status: newStatus } : ticket,
          ),
        );
      } else {
        toast.error("Status update failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("A network error occurred.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleAdvertiseToggle = async (id, currentAdStatus) => {
    try {
      setAdProcessingId(id);
      const newAdStatus = !currentAdStatus;
      const res = await toggleTicketAdvertisement(id, newAdStatus);
      if (res.error || res.message) {
        toast.error(res.message || res.error);
        return;
      }
      if (res.modifiedCount > 0 || res.matchedCount > 0) {
        toast.success(
          newAdStatus ? "Ticket is now Featured!" : "Advertisement Removed.",
        );
        setTickets((prev) =>
          prev.map((ticket) =>
            ticket._id === id
              ? { ...ticket, isAdvertised: newAdStatus }
              : ticket,
          ),
        );
      } else {
        toast.error("Failed to change advertisement status.");
      }
    } catch (error) {
      console.error(error);
      toast.error("A network error occurred.");
    } finally {
      setAdProcessingId(null);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 mx-auto w-full"
    >
      {tickets.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col items-center justify-center p-16 border border-dashed border-zinc-200 dark:border-[#1a3d61] rounded-3xl bg-white/40 dark:bg-[#124170]/5 backdrop-blur-md shadow-sm"
        >
          <p className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest text-sm text-center">
            No tickets exist on the platform
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={itemVariants}
          className="mt-8 overflow-hidden rounded-3xl border border-zinc-200/60 dark:border-[#1a3d61] bg-white/70 dark:bg-[#124170]/20 backdrop-blur-xl shadow-2xl"
        >
          <div className="w-full overflow-x-auto custom-scrollbar">
            {/* Shifts smoothly from structured block cards on mobile/tablets into a standard layout at 'lg' screens */}
            <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-300 block lg:table min-w-full">
              <thead className="hidden lg:table-header-group bg-zinc-100/80 dark:bg-[#0b1d30]/80 text-xs uppercase font-black text-[#124170] dark:text-[#00ADB5] tracking-wider border-b border-zinc-200/60 dark:border-[#1a3d61]">
                <tr>
                  <th className="px-6 py-4">Vendor Info</th>
                  <th className="px-6 py-4">Ticket Overview</th>
                  <th className="px-6 py-4">Schedule & Amenities</th>
                  <th className="px-6 py-4">Capacity & Fare</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="block lg:table-row-group divide-y divide-zinc-200/60 dark:divide-[#1a3d61]/50">
                {tickets.map((ticket) => (
                  <tr
                    key={ticket._id}
                    className="block lg:table-row p-5 lg:p-0 hover:bg-zinc-50/50 dark:hover:bg-white/5 transition-colors"
                  >
                    {/* 1. Vendor & Submission Data */}
                    <td className="block lg:table-cell px-2 lg:px-6 py-3 lg:py-5 align-top">
                      <div className="flex flex-col lg:block">
                        <span className="lg:hidden text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">
                          Vendor Info
                        </span>
                        <p className="font-bold text-zinc-900 dark:text-white tracking-wide">
                          {ticket.vendorName}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                          {ticket.vendorEmail}
                        </p>
                        <div className="flex items-center gap-1.5 mt-2.5 text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider">
                          <FaCalendarPlus size={10} />
                          Listed:{" "}
                          {ticket.createdAt
                            ? new Date(ticket.createdAt).toLocaleDateString()
                            : "N/A"}
                        </div>
                      </div>
                    </td>

                    {/* 2. Ticket Image & Core Details */}
                    <td className="block lg:table-cell px-2 lg:px-6 py-3 lg:py-5 align-top">
                      <div className="flex flex-col lg:block">
                        <span className="lg:hidden text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">
                          Ticket Overview
                        </span>
                        <div className="flex gap-4 items-start">
                          <div className="w-20 h-20 shrink-0 rounded-xl bg-zinc-100 dark:bg-[#0b1d30] overflow-hidden border border-zinc-200 dark:border-white/5 shadow-md relative">
                            <img
                              src={ticket.image}
                              alt={ticket.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            {ticket.isAdvertised && (
                              <div className="absolute top-0 right-0 bg-[#00ADB5] text-[#091624] p-1 rounded-bl-lg shadow-lg">
                                <FaStar size={10} />
                              </div>
                            )}
                          </div>
                          <div>
                            <span className="text-[9px] font-black uppercase tracking-widest bg-zinc-100 dark:bg-[#124170]/40 border border-zinc-200 dark:border-[#1a3d61] text-[#124170] dark:text-[#AAFFC7] px-2 py-0.5 rounded-md flex items-center gap-1 w-max mb-1.5">
                              <FaTag size={8} /> {ticket.transportType}
                            </span>
                            <p className="font-bold text-zinc-900 dark:text-white text-base leading-tight mb-1 line-clamp-2 max-w-[250px]">
                              {ticket.title || ticket.ticketTitle}
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1.5">
                              {ticket.from}{" "}
                              <span className="text-[#00ADB5] px-1">→</span>{" "}
                              {ticket.to}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 3. Schedule & Perks */}
                    <td className="block lg:table-cell px-2 lg:px-6 py-3 lg:py-5 align-top">
                      <div className="flex items-center justify-between lg:block">
                        <span className="lg:hidden text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                          Schedule & Amenities
                        </span>
                        <div className="space-y-2.5 text-right lg:text-left">
                          <div className="flex items-center justify-end lg:justify-start gap-2 text-xs text-zinc-700 dark:text-zinc-300 font-semibold">
                            <FaCalendarAlt className="text-[#124170] dark:text-[#00ADB5] shrink-0" />
                            <span>
                              {new Date(
                                ticket.departureDateTime,
                              ).toLocaleString([], {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })}
                            </span>
                          </div>
                          {ticket.perks && ticket.perks.length > 0 && (
                            <div className="flex flex-wrap justify-end lg:justify-start gap-1.5 max-w-[200px]">
                              {ticket.perks.map((perk, idx) => (
                                <span
                                  key={idx}
                                  className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-400 rounded-md"
                                >
                                  {perk}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* 4. Capacity & Fare */}
                    <td className="block lg:table-cell px-2 lg:px-6 py-3 lg:py-5 align-top">
                      <div className="flex items-center justify-between lg:block">
                        <span className="lg:hidden text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                          Capacity & Fare
                        </span>
                        <div className="space-y-2 bg-zinc-50 dark:bg-[#0b1d30]/30 p-3 rounded-xl border border-zinc-200/60 dark:border-white/5 w-40 lg:w-max text-left">
                          <p className="text-xs flex flex-col">
                            <span className="text-zinc-400 dark:text-zinc-500 uppercase font-bold tracking-wider text-[9px] mb-0.5">
                              Available Seats
                            </span>
                            <span className="font-black text-zinc-900 dark:text-white">
                              {ticket.quantity}
                            </span>
                          </p>
                          <div className="w-full h-px bg-zinc-200 dark:bg-white/5" />
                          <p className="text-xs flex flex-col">
                            <span className="text-zinc-400 dark:text-zinc-500 uppercase font-bold tracking-wider text-[9px] mb-0.5">
                              Unit Fare
                            </span>
                            <span className="font-black text-[#124170] dark:text-[#AAFFC7] text-base">
                              ৳{ticket.price}
                            </span>
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* 5. Status */}
                    <td className="block lg:table-cell px-2 lg:px-6 py-3 lg:py-5 align-top">
                      <div className="flex items-center justify-between lg:block">
                        <span className="lg:hidden text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                          Status
                        </span>
                        <div className="flex flex-col items-end lg:items-start">
                          <StatusBadge status={ticket.status} />
                          {ticket.isAdvertised && (
                            <div className="mt-2.5 inline-flex items-center gap-1.5 px-2 py-1 bg-amber-500/10 border border-amber-500/20 rounded-md">
                              <FaBullhorn
                                className="text-amber-600 dark:text-amber-500"
                                size={10}
                              />
                              <span className="text-[9px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest">
                                Featured Ad
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* 6. Actions */}
                    <td className="block lg:table-cell px-2 lg:px-6 pt-4 pb-2 lg:py-5 text-right align-top border-t border-dashed lg:border-none border-zinc-200 dark:border-[#1a3d61]/50 mt-3 lg:mt-0">
                      <div className="flex flex-row lg:flex-col items-center lg:items-end justify-start lg:justify-center gap-2 flex-wrap sm:flex-nowrap">
                        <Button
                          size="sm"
                          isDisabled={
                            ticket.status === "approved" ||
                            processingId === ticket._id
                          }
                          isLoading={processingId === ticket._id}
                          onPress={() =>
                            handleStatusChange(ticket._id, "approved")
                          }
                          className="w-full sm:w-28 bg-zinc-100 dark:bg-[#00ADB5]/20 text-[#124170] dark:text-[#00ADB5] border border-zinc-200 dark:border-[#00ADB5]/50 hover:bg-zinc-200 dark:hover:bg-[#00ADB5] dark:hover:text-white font-bold uppercase tracking-widest text-[10px] transition-all rounded-lg justify-start"
                          startContent={
                            processingId !== ticket._id && <FaCheck size={10} />
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          isDisabled={
                            ticket.status === "rejected" ||
                            processingId === ticket._id
                          }
                          isLoading={processingId === ticket._id}
                          onPress={() =>
                            handleStatusChange(ticket._id, "rejected")
                          }
                          className="w-full sm:w-28 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 border border-red-200 dark:border-red-500/30 hover:bg-red-100 dark:hover:bg-red-500 dark:hover:text-white font-bold uppercase tracking-widest text-[10px] transition-all rounded-lg justify-start"
                          startContent={
                            processingId !== ticket._id && <FaTimes size={10} />
                          }
                        >
                          Reject
                        </Button>

                        {ticket.status === "approved" && (
                          <Button
                            size="sm"
                            isLoading={adProcessingId === ticket._id}
                            onPress={() =>
                              handleAdvertiseToggle(
                                ticket._id,
                                ticket.isAdvertised,
                              )
                            }
                            className={`w-full sm:w-28 lg:mt-2 font-bold uppercase tracking-widest text-[9px] transition-all rounded-lg justify-start ${
                              ticket.isAdvertised
                                ? "bg-zinc-100 dark:bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-500/30 hover:bg-zinc-200 dark:hover:bg-zinc-500 dark:hover:text-white"
                                : "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 border border-amber-200 dark:border-amber-500/30 hover:bg-amber-100 dark:hover:bg-amber-500 dark:hover:text-[#091624]"
                            }`}
                            startContent={
                              adProcessingId !== ticket._id && (
                                <FaBullhorn size={10} />
                              )
                            }
                          >
                            {ticket.isAdvertised ? "Remove Ad" : "Advertise"}
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending:
      "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-200 dark:border-amber-500/20",
    approved:
      "bg-[#67C090]/10 dark:bg-[#AAFFC7]/10 text-[#124170] dark:text-[#AAFFC7] border-[#67C090]/20 dark:border-[#AAFFC7]/20",
    rejected:
      "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 border-red-200 dark:border-red-500/20",
  };

  const icons = {
    pending: <FaClock size={10} />,
    approved: <FaCheck size={10} />,
    rejected: <FaTimes size={10} />,
  };

  const currentStyle = styles[status] || styles.pending;
  const currentIcon = icons[status] || icons.pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border rounded-full shadow-sm ${currentStyle}`}
    >
      {currentIcon} {status}
    </span>
  );
}
