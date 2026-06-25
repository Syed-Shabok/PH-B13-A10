"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, Button } from "@heroui/react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBus,
  FaTrain,
  FaPlane,
  FaShip,
  FaTag,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

// Maps transport category names to corresponding project icons
const iconMap = {
  Bus: <FaBus />,
  Train: <FaTrain />,
  Flight: <FaPlane />,
  Launch: <FaShip />,
};

const PublicTicketCard = ({ ticket }) => {
  const router = useRouter();
  const currentType = ticket?.transportType;

  const badgeStyles = {
    Bus: "bg-amber-500/60 text-amber-900  border-amber-900",
    Train: "bg-blue-500/60 text-blue-900  border-blue-900",
    Flight: "bg-purple-500/60 text-purple-900  border-purple-900",
    Launch: "bg-[#67C090]/60 text-green-900  border-green-900",
  };

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
      className="h-full w-full"
    >
      <Card className="w-full overflow-hidden bg-white/70 dark:bg-[#124170]/20 backdrop-blur-xl rounded-3xl border border-zinc-200/60 dark:border-[#1a3d61] shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full group">
        {/* Media Box Banner */}
        <div className="relative h-44 w-full bg-zinc-100 dark:bg-[#0b1d30]/50 overflow-hidden shrink-0">
          <img
            src={
              ticket?.image ||
              "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600"
            }
            alt={ticket?.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Floating Sector Vector Mode Badge */}
          <span
            className={`absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-extrabold uppercase tracking-widest border rounded-full select-none backdrop-blur-xl shadow-sm
            ${badgeStyles[ticket?.transportType]}     
            `}
          >
            {iconMap[currentType] || <FaTag />} {currentType || "Other"}
          </span>
        </div>

        {/* Main Content Space */}
        <div className="p-5 flex flex-col justify-between flex-grow gap-4">
          <div className="space-y-2.5">
            <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">
              {ticket?.title}
            </h4>

            {/* Core Trajectory Routes Vector */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                <FaMapMarkerAlt className="text-zinc-400 shrink-0 text-sm" />
                <span className="truncate">
                  {ticket?.from} <span className="text-[#00ADB5] px-1">→</span>{" "}
                  {ticket?.to}
                </span>
              </div>

              {/* Departure Timeline Vector */}
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                <FaCalendarAlt className="text-zinc-400 shrink-0 text-sm" />
                <span>
                  {ticket?.departureDateTime
                    ? new Date(ticket.departureDateTime).toLocaleString([], {
                        dateStyle: "short",
                        timeStyle: "short",
                      })
                    : "Not Scheduled"}
                </span>
              </div>
            </div>

            {/* Inline Amenity Chip Vector Stream */}
            {ticket?.perks && ticket.perks.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {ticket.perks.slice(0, 3).map((perk, index) => (
                  <span
                    key={index}
                    className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-[#1a3d61]/40 border border-zinc-200/40 dark:border-[#1a3d61]/60 text-zinc-500 dark:text-zinc-400"
                  >
                    {perk}
                  </span>
                ))}
                {ticket.perks.length > 3 && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 text-zinc-400 dark:text-zinc-500">
                    +{ticket.perks.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Quantities, Metadata, and Checkout Triggers */}
          <div className="space-y-4 pt-3 border-t border-zinc-200/60 dark:border-[#1a3d61]/60 mt-auto">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Available
                </p>
                <p className="text-xs font-black text-zinc-700 dark:text-zinc-300">
                  {ticket?.quantity ? `${ticket.quantity} Seats` : "Sold Out"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Fare Rate
                </p>
                <p className="text-base font-black text-[#124170] dark:text-[#AAFFC7]">
                  ৳{ticket?.price}
                </p>
              </div>
            </div>

            {/* Action CTA Button */}
            <motion.div whileTap={{ scale: 0.97 }}>
              <Button
                onPress={() => router.push(`/all-tickets/${ticket?._id}`)}
                className="w-full font-bold text-xs uppercase tracking-wider bg-zinc-100 dark:bg-[#124170]/40 text-[#124170] dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-[#124170]/60 rounded-xl h-10 transition-all duration-200"
              >
                View Details
              </Button>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PublicTicketCard;
