"use client";

import React, { useState, useEffect, useRef } from "react";
import PublicTicketsCard from "../../../components/PublicTicketsCard";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import TicketFilters from "@/components/TicketFilters";
import { Pagination } from "@heroui/react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 110, damping: 14 },
  },
};

export default function AllTicketsClient({ tickets, filters, total }) {
  const router = useRouter();

  // Search related varibls
  const [fromSearch, setFromSearch] = useState(filters.from || "");
  const [toSearch, setToSearch] = useState(filters.to || "");
  const [transportType, setTransportType] = useState(
    filters.transportType || "all",
  );

  // Pagination variables
  const [page, setPage] = useState(parseInt(filters.page) || 1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(total / itemsPerPage);

  const isInitialRender = useRef(true);

  // Resets page to 1 if any search filters change
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    setPage(1);
  }, [fromSearch, toSearch, transportType]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const sp = new URLSearchParams();
      if (fromSearch) sp.set("from", fromSearch);
      if (toSearch) sp.set("to", toSearch);
      if (transportType && transportType !== "all") {
        sp.set("transportType", transportType);
      }
      if (page > 1) sp.set("page", page);

      router.push(`?${sp.toString()}`);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [fromSearch, toSearch, transportType, page, router]);

  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    if (page > 3) pages.push("ellipsis");

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) pages.push("ellipsis");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, total);

  return (
    <div className="relative z-10 max-w-7xl mx-auto w-full mt-8">
      <TicketFilters
        fromSearch={fromSearch}
        setFromSearch={setFromSearch}
        toSearch={toSearch}
        setToSearch={setToSearch}
        transportType={transportType}
        setTransportType={setTransportType}
      />

      <div className="mb-6 text-sm font-semibold text-zinc-500 dark:text-zinc-400 pl-2">
        Showing {tickets.length > 0 ? `${startItem}-${endItem} of ${total}` : 0}{" "}
        route{total !== 1 && "s"} found.
      </div>

      {tickets.length > 0 ? (
        <>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-10"
          >
            {tickets.map((ticket) => (
              <motion.div key={ticket._id} variants={itemVariants}>
                <PublicTicketsCard ticket={ticket} />
              </motion.div>
            ))}
          </motion.div>

          {totalPages > 1 && (
            <div className="flex justify-center w-full mt-10 mb-16">
              <Pagination className="flex justify-center w-full">
                <Pagination.Content className="flex justify-center items-center gap-2 bg-white/50 dark:bg-[#124170]/10 p-2 rounded-2xl border border-zinc-200/60 dark:border-[#1a3d61]/60 backdrop-blur-md w-max mx-auto">
                  <Pagination.Item>
                    <Pagination.Previous
                      isDisabled={page === 1}
                      onPress={() => setPage((p) => p - 1)}
                      className="bg-transparent hover:bg-zinc-100 dark:hover:bg-[#1a3d61] text-[#124170] dark:text-[#AAFFC7] font-bold"
                    >
                      <Pagination.PreviousIcon />
                    </Pagination.Previous>
                  </Pagination.Item>

                  {getPageNumbers().map((p, i) =>
                    p === "ellipsis" ? (
                      <Pagination.Item key={`ellipsis-${i}`}>
                        <Pagination.Ellipsis className="text-zinc-500" />
                      </Pagination.Item>
                    ) : (
                      <Pagination.Item key={p}>
                        <Pagination.Link
                          isActive={p === page}
                          onPress={() => setPage(p)}
                          className={`font-bold transition-all ${
                            p === page
                              ? "bg-[#124170] dark:bg-[#00ADB5] text-white dark:text-[#091624]"
                              : "bg-transparent text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[#1a3d61]"
                          }`}
                        >
                          {p}
                        </Pagination.Link>
                      </Pagination.Item>
                    ),
                  )}

                  <Pagination.Item>
                    <Pagination.Next
                      isDisabled={page === totalPages}
                      onPress={() => setPage((p) => p + 1)}
                      className="bg-transparent hover:bg-zinc-100 dark:hover:bg-[#1a3d61] text-[#124170] dark:text-[#AAFFC7] font-bold"
                    >
                      <Pagination.NextIcon />
                    </Pagination.Next>
                  </Pagination.Item>
                </Pagination.Content>
              </Pagination>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-16 border border-dashed border-zinc-200 dark:border-[#1a3d61] rounded-3xl bg-white/40 dark:bg-[#124170]/5 backdrop-blur-md mt-2 select-none h-[40vh]">
          <p className="text-xl font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            No Route Tickets Available
          </p>
          <p className="text-sm font-medium text-zinc-400 mt-2">
            Try adjusting your search filters.
          </p>
        </div>
      )}
    </div>
  );
}
