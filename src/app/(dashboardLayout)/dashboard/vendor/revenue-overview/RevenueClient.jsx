"use client";

import { Card } from "@heroui/react";
import { FaTicketAlt, FaMoneyBillWave, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Project specific colors for the pie chart
const PIE_COLORS = ["#00ADB5", "#AAFFC7", "#67C090", "#1a3d61", "#452C20"];

// Motion Animation Presets
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function RevenueClient({ stats }) {
  const { totalTicketsAdded, totalTicketsSold, totalRevenue, chartData } =
    stats;

  // Custom Tooltip component updated for Glassmorphism Light/Dark themes
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 dark:bg-[#0b1d30]/90 backdrop-blur-xl border border-zinc-200/60 dark:border-[#1a3d61] p-4 rounded-xl shadow-xl">
          <p className="text-zinc-500 dark:text-zinc-400 font-bold text-[10px] mb-2 uppercase tracking-widest">
            {label || payload[0].name}
          </p>
          {payload.map((entry, index) => (
            <p
              key={index}
              className="text-sm font-black"
              style={{ color: entry.color || "#00ADB5" }}
            >
              {entry.name}:{" "}
              {entry.name.includes("Revenue")
                ? `৳${entry.value.toLocaleString()}`
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric Card 1 */}
        <motion.div variants={itemVariants}>
          <Card className="w-full bg-white/70 dark:bg-[#124170]/20 backdrop-blur-xl border border-zinc-200/60 dark:border-[#1a3d61] p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-row items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#124170]/10 dark:bg-indigo-500/10 border border-[#124170]/20 dark:border-indigo-500/20 flex items-center justify-center text-[#124170] dark:text-indigo-400 shrink-0">
              <FaTicketAlt size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 tracking-widest mb-1">
                Total Listed
              </p>
              <p className="text-3xl font-black text-zinc-900 dark:text-white">
                {totalTicketsAdded}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Metric Card 2 */}
        <motion.div variants={itemVariants}>
          <Card className="w-full bg-white/70 dark:bg-[#124170]/20 backdrop-blur-xl border border-zinc-200/60 dark:border-[#1a3d61] p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-row items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#67C090]/20 dark:bg-[#AAFFC7]/10 border border-[#67C090]/30 dark:border-[#AAFFC7]/20 flex items-center justify-center text-[#67C090] dark:text-[#AAFFC7] shrink-0">
              <FaChartLine size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 tracking-widest mb-1">
                Tickets Sold
              </p>
              <p className="text-3xl font-black text-zinc-900 dark:text-white">
                {totalTicketsSold}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Metric Card 3 */}
        <motion.div variants={itemVariants}>
          <Card className="w-full bg-white/70 dark:bg-[#124170]/20 backdrop-blur-xl border border-zinc-200/60 dark:border-[#1a3d61] p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-row items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#00ADB5]/10 border border-[#00ADB5]/20 flex items-center justify-center text-[#00ADB5] shrink-0">
              <FaMoneyBillWave size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 tracking-widest mb-1">
                Total Revenue
              </p>
              <p className="text-3xl font-black text-[#00ADB5]">
                ৳{totalRevenue.toLocaleString()}
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Chart Section */}
      {chartData.length > 0 ? (
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Revenue Bar Chart */}
          <Card className="w-full bg-white/70 dark:bg-[#124170]/20 backdrop-blur-xl border border-zinc-200/60 dark:border-[#1a3d61] p-6 rounded-3xl shadow-xl transition-all duration-300">
            <h3 className="text-sm font-black uppercase text-[#124170] dark:text-[#AAFFC7] tracking-widest mb-6">
              Revenue by Route
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#71717a"
                    strokeOpacity={0.2}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#71717a"
                    fontSize={10}
                    tickFormatter={(value) => value.substring(0, 10) + "..."}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis
                    stroke="#71717a"
                    fontSize={10}
                    tickFormatter={(value) => `৳${value}`}
                    tickLine={false}
                    axisLine={false}
                    dx={-10}
                  />
                  <RechartsTooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "#71717a", opacity: 0.1 }}
                  />
                  <Bar
                    dataKey="revenue"
                    name="Revenue"
                    fill="#00ADB5"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Sales Distribution Pie Chart */}
          <Card className="w-full bg-white/70 dark:bg-[#124170]/20 backdrop-blur-xl border border-zinc-200/60 dark:border-[#1a3d61] p-6 rounded-3xl shadow-xl transition-all duration-300">
            <h3 className="text-sm font-black uppercase text-[#124170] dark:text-[#AAFFC7] tracking-widest mb-6">
              Sales Volume Distribution
            </h3>
            <div className="h-[300px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="ticketsSold"
                    nameKey="name"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center text-center p-16 border border-dashed border-zinc-200 dark:border-[#1a3d61] rounded-3xl bg-white/40 dark:bg-[#124170]/5 backdrop-blur-md mt-6 select-none h-[400px]"
        >
          <p className="text-2xl font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            No Sales Data Yet
          </p>
          <p className="text-base font-semibold text-zinc-500 dark:text-zinc-400 mt-2">
            Charts will generate automatically once tickets are sold.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
