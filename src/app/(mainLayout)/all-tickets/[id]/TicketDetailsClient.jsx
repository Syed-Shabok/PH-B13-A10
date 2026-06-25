"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaTag,
  FaCheckCircle,
} from "react-icons/fa";
import BookingModal from "@/components/BookingModal";

export default function TicketDetailsClient({ ticket }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  // Countdown Logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      const departureTime = new Date(ticket.departureDateTime).getTime();
      const now = new Date().getTime();
      const difference = departureTime - now;

      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft("Departure Passed");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTimeLeft(); // Initial call
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [ticket.departureDateTime]);

  const isSoldOut = ticket.quantity === 0;
  const isButtonDisabled = isExpired || isSoldOut;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full bg-white/70 dark:bg-[#124170]/10 backdrop-blur-2xl rounded-[2rem] border border-zinc-200/60 dark:border-[#1a3d61] shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side: Image */}
        <div className="w-full md:w-5/12 h-[300px] md:h-auto relative shrink-0 bg-[#0b1d30]">
          <img
            src={ticket.image}
            alt={ticket.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#091624] via-transparent to-transparent md:bg-gradient-to-r" />
          <span className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-1.5 text-xs font-black uppercase tracking-widest bg-[#00ADB5]/80 text-[#091624] rounded-full backdrop-blur-md">
            <FaTag /> {ticket.transportType}
          </span>
        </div>

        {/* Right Side: Details */}
        <div className="p-8 md:p-10 flex flex-col justify-between w-full">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mb-6 leading-tight">
              {ticket.title}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-[#102226] flex items-center justify-center text-[#00ADB5]">
                  <FaMapMarkerAlt size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                    Route
                  </p>
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5">
                    {ticket.from} → {ticket.to}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-[#102226] flex items-center justify-center text-[#00ADB5]">
                  <FaCalendarAlt size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                    Departure
                  </p>
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5">
                    {new Date(ticket.departureDateTime).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-[#102226] flex items-center justify-center text-[#00ADB5]">
                  <FaClock size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                    Time Remaining
                  </p>
                  <p
                    className={`text-sm font-bold mt-0.5 ${isExpired ? "text-red-400" : "text-[#AAFFC7]"}`}
                  >
                    {timeLeft}
                  </p>
                </div>
              </div>
            </div>

            {/* Perks Section */}
            <div className="mb-8">
              <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-3">
                Amenities & Perks
              </p>
              <div className="flex flex-wrap gap-2">
                {ticket.perks?.map((perk, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-zinc-100 dark:bg-[#1a3d61]/40 border border-zinc-200 dark:border-[#1a3d61] text-zinc-600 dark:text-zinc-300 rounded-lg"
                  >
                    <FaCheckCircle className="text-[#00ADB5]" size={10} />{" "}
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="pt-6 border-t border-zinc-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase font-bold text-zinc-400 tracking-wider mb-1">
                Total Fare / Seat
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#124170] dark:text-[#AAFFC7]">
                  ৳{ticket.price}
                </span>
                <span className="text-xs font-semibold text-zinc-500">
                  ({ticket.quantity} Available)
                </span>
              </div>
            </div>

            <Button
              isDisabled={isButtonDisabled}
              onPress={() => setIsModalOpen(true)}
              className={`w-full sm:w-auto px-10 h-14 rounded-2xl font-black text-sm tracking-wider uppercase transition-all shadow-lg
                ${
                  isButtonDisabled
                    ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 cursor-not-allowed shadow-none"
                    : "bg-[#00ADB5] hover:bg-[#009299] text-[#091624]"
                }`}
            >
              {isSoldOut ? "Sold Out" : isExpired ? "Expired" : "Book Now"}
            </Button>
          </div>
        </div>
      </motion.div>

      <BookingModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        ticket={ticket}
      />
    </>
  );
}
