"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const NotFound = () => {
  // Animation Orchestration Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // Custom cubic bezier curve
        when: "beforeChildren",
        staggerChildren: 0.08,
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

  return (
    <main className="min-h-[85vh] w-full bg-white dark:bg-[#124170] flex flex-col items-center justify-center px-6 relative overflow-hidden transition-colors duration-300">
      {/* Dynamic Animated Background Ambient Orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-[#AAFFC7]/10 dark:bg-[#215B63]/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#67C090]/10 dark:bg-[#67C090]/10 rounded-full blur-3xl pointer-events-none"
      />

      {/* Main Structural Content Glass Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center max-w-md text-center bg-gray-50/50 dark:bg-black/10 backdrop-blur-md p-10 rounded-3xl border border-gray-200/40 dark:border-white/5 shadow-xl"
      >
        {/* Large Geometric 404 Accent Badge */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="h-14 inline-flex items-center justify-center px-6 rounded-full bg-gray-100/80 dark:bg-[#215B63]/40 border border-gray-200/40 dark:border-white/5 text-sm font-black tracking-[0.25em] text-[#124170] dark:text-[#AAFFC7] shadow-inner select-none mb-6 cursor-default"
        >
          ERROR 404
        </motion.div>

        {/* Messaging Layout */}
        <motion.h1
          variants={itemVariants}
          className="text-2xl font-black uppercase tracking-wider text-[#124170] dark:text-white mb-3"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-sm font-semibold leading-relaxed text-gray-500 dark:text-gray-400 max-w-xs mb-8"
        >
          The route you are trying to access does not exist, or the schedule has
          been updated.
        </motion.p>

        {/* Navigation Action Buttons Group */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-3 "
        >
          <motion.div
            className="w-full"
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
          >
            <Link
              href="/"
              className="w-full px-6 h-11 inline-flex items-center justify-center text-xs font-bold tracking-wider uppercase bg-[#124170] dark:bg-[#67C090] text-[#AAFFC7] dark:text-[#124170] rounded-full shadow-md dark:shadow-none transition-colors"
            >
              Go to Homepage
            </Link>
          </motion.div>
        </motion.div>

        {/* Footer Network Node Matcher */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 mt-8 select-none opacity-80"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-[#67C090]"
          />
          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-wide uppercase">
            System Redirect Active
          </span>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default NotFound;
