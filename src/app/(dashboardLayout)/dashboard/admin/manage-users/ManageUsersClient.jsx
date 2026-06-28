"use client";

import { useState } from "react";
import { Button, AlertDialog } from "@heroui/react";
import toast from "react-hot-toast";
import { FaShieldAlt, FaUserTie, FaUser, FaBan } from "react-icons/fa";
import { markVendorAsFraud, updateUserRole } from "@/lib/api/admin";
import { motion } from "framer-motion";

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

export default function ManageUsersClient({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [processingId, setProcessingId] = useState(null);

  const handleRoleChange = async (id, newRole) => {
    try {
      setProcessingId(id);
      const res = await updateUserRole(id, newRole);
      if (res.modifiedCount > 0 || res.matchedCount > 0) {
        toast.success(`User promoted to ${newRole}`);
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role: newRole } : u)),
        );
      } else {
        toast.error("Role update failed.");
      }
    } catch (error) {
      toast.error("Network error occurred.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleMarkFraud = async (id) => {
    try {
      setProcessingId(id);
      const res = await markVendorAsFraud(id);
      if (res.success) {
        toast.success("Vendor marked as fraud. Tickets hidden.");
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, isBlocked: true } : u)),
        );
      } else {
        toast.error("Failed to mark as fraud.");
      }
    } catch (error) {
      toast.error("Network error occurred.");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 mx-auto w-full"
    >
      {users.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col items-center justify-center p-16 border border-dashed border-zinc-200 dark:border-[#1a3d61] rounded-3xl bg-white/40 dark:bg-[#124170]/5 backdrop-blur-md shadow-sm"
        >
          <p className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest text-sm text-center">
            No platform users found
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={itemVariants}
          className="mt-8 overflow-hidden rounded-3xl border border-zinc-200/60 dark:border-[#1a3d61] bg-white/70 dark:bg-[#124170]/20 backdrop-blur-xl shadow-2xl"
        >
          {/* Inner scrolling layer protects desktop viewports from unexpected clipping */}
          <div className="w-full overflow-x-auto layout-scrollbar">
            {/* Table layout forced on lg+ screens, transformed to custom blocks on mobile/tablet devices */}
            <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400 block lg:table min-w-full">
              <thead className="hidden lg:table-header-group bg-zinc-100/80 dark:bg-[#0b1d30]/80 text-xs uppercase font-black text-[#124170] dark:text-[#00ADB5] tracking-wider border-b border-zinc-200/60 dark:border-[#1a3d61]">
                <tr>
                  <th className="px-6 py-4">User Identity</th>
                  <th className="px-6 py-4">Current Role</th>
                  <th className="px-6 py-4">Security Status</th>
                  <th className="px-6 py-4 text-center">Access Controls</th>
                </tr>
              </thead>
              <tbody className="block lg:table-row-group divide-y divide-zinc-200/60 dark:divide-[#1a3d61]/50">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="block lg:table-row p-5 lg:p-0 hover:bg-zinc-50/50 dark:hover:bg-white/5 transition-colors"
                  >
                    {/* User Identity Column */}
                    <td className="block lg:table-cell px-2 lg:px-6 py-2 lg:py-4">
                      <div className="flex flex-col lg:block">
                        <span className="lg:hidden text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                          User Identity
                        </span>
                        <p className="font-bold text-zinc-900 dark:text-white text-base tracking-wide mb-0.5">
                          {user.name}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                          {user.email}
                        </p>
                      </div>
                    </td>

                    {/* Current Role Column */}
                    <td className="block lg:table-cell px-2 lg:px-6 py-2 lg:py-4">
                      <div className="flex items-center justify-between lg:block">
                        <span className="lg:hidden text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                          Current Role
                        </span>
                        <RoleBadge role={user.role} />
                      </div>
                    </td>

                    {/* Security Status Column */}
                    <td className="block lg:table-cell px-2 lg:px-6 py-2 lg:py-4">
                      <div className="flex items-center justify-between lg:block">
                        <span className="lg:hidden text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                          Security Status
                        </span>
                        <div>
                          {user.isBlocked ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-lg">
                              <FaBan size={10} /> Fraudulent
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#67C090]/10 border border-[#67C090]/20 text-[#124170] dark:text-[#AAFFC7] text-[10px] font-black uppercase tracking-widest rounded-lg">
                              <FaShieldAlt size={10} /> Clear
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Access Controls / Actions Column */}
                    <td className="block lg:table-cell px-2 lg:px-6 pt-4 pb-2 lg:py-4 text-center border-t border-dashed lg:border-none border-zinc-200/60 dark:border-[#1a3d61]/50 mt-3 lg:mt-0">
                      <div className="flex items-center lg:justify-center justify-start gap-2">
                        {user.role !== "vendor" &&
                          user.role !== "admin" &&
                          !user.isBlocked && (
                            <Button
                              size="sm"
                              isLoading={processingId === user._id}
                              onPress={() =>
                                handleRoleChange(user._id, "vendor")
                              }
                              className="bg-zinc-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-zinc-200 dark:border-indigo-500/30 hover:bg-zinc-200 dark:hover:bg-indigo-500 dark:hover:text-white font-bold tracking-wider rounded-xl transition-all w-full lg:w-auto text-[11px] uppercase"
                            >
                              Make Vendor
                            </Button>
                          )}

                        {user.role !== "admin" && !user.isBlocked && (
                          <AlertDialog>
                            <Button
                              size="sm"
                              isLoading={processingId === user._id}
                              className="bg-zinc-100 dark:bg-[#00ADB5]/20 text-[#124170] dark:text-[#00ADB5] border border-zinc-200 dark:border-[#00ADB5]/50 hover:bg-zinc-200 dark:hover:bg-[#00ADB5] dark:hover:text-white hover:text-[#091624] font-bold tracking-wider rounded-xl transition-all w-full lg:w-auto text-[11px] uppercase"
                            >
                              Make Admin
                            </Button>
                            <AlertDialog.Backdrop className="bg-black/80 backdrop-blur-md">
                              <AlertDialog.Container>
                                <AlertDialog.Dialog className="bg-white dark:bg-[#0b1d30] border border-zinc-200 dark:border-[#1a3d61] shadow-2xl sm:max-w-[400px] rounded-3xl p-6 text-left">
                                  <AlertDialog.Heading className="text-[#124170] dark:text-white font-black text-xl">
                                    Grant Admin Privileges?
                                  </AlertDialog.Heading>
                                  <AlertDialog.Body className="text-zinc-500 dark:text-zinc-400 text-sm mt-2">
                                    This will grant{" "}
                                    <strong className="text-[#124170] dark:text-white">
                                      {user.name}
                                    </strong>{" "}
                                    full administrative access.
                                  </AlertDialog.Body>
                                  <AlertDialog.Footer className="mt-6 flex gap-3">
                                    <Button
                                      slot="close"
                                      className="bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white font-bold rounded-xl flex-1"
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      slot="close"
                                      onPress={() =>
                                        handleRoleChange(user._id, "admin")
                                      }
                                      className="bg-[#00ADB5] hover:bg-[#009299] text-[#091624] font-black rounded-xl flex-1"
                                    >
                                      Confirm
                                    </Button>
                                  </AlertDialog.Footer>
                                </AlertDialog.Dialog>
                              </AlertDialog.Container>
                            </AlertDialog.Backdrop>
                          </AlertDialog>
                        )}

                        {user.role === "vendor" && !user.isBlocked && (
                          <AlertDialog>
                            <Button
                              size="sm"
                              isLoading={processingId === user._id}
                              className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 border border-red-200 dark:border-red-500/30 hover:bg-red-100 dark:hover:bg-red-500 dark:hover:text-white font-bold tracking-wider rounded-xl transition-all w-full lg:w-auto text-[11px] uppercase"
                            >
                              Mark Fraud
                            </Button>
                            <AlertDialog.Backdrop className="bg-black/80 backdrop-blur-md">
                              <AlertDialog.Container>
                                <AlertDialog.Dialog className="bg-white dark:bg-[#0b1d30] border border-red-500/30 shadow-2xl sm:max-w-[400px] rounded-3xl p-6 text-left">
                                  <AlertDialog.Heading className="text-red-600 dark:text-red-500 font-black text-xl">
                                    Flag as Fraud?
                                  </AlertDialog.Heading>
                                  <AlertDialog.Body className="text-zinc-500 dark:text-zinc-400 text-sm mt-2">
                                    Revoking access for{" "}
                                    <strong className="text-zinc-900 dark:text-white">
                                      {user.name}
                                    </strong>{" "}
                                    is severe and irreversible.
                                  </AlertDialog.Body>
                                  <AlertDialog.Footer className="mt-6 flex gap-3">
                                    <Button
                                      slot="close"
                                      className="bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white font-bold rounded-xl flex-1"
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      slot="close"
                                      onPress={() => handleMarkFraud(user._id)}
                                      className="bg-red-500 hover:bg-red-600 text-white font-black rounded-xl flex-1"
                                    >
                                      Flag Fraud
                                    </Button>
                                  </AlertDialog.Footer>
                                </AlertDialog.Dialog>
                              </AlertDialog.Container>
                            </AlertDialog.Backdrop>
                          </AlertDialog>
                        )}

                        {(user.isBlocked || user.role === "admin") && (
                          <div className="flex justify-start lg:justify-center w-full">
                            <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border bg-zinc-100/80 dark:bg-zinc-800/20 text-zinc-400 dark:text-zinc-500 border-zinc-200 dark:border-zinc-700/50">
                              No Actions
                            </span>
                          </div>
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

function RoleBadge({ role }) {
  const styles = {
    admin: "bg-[#00ADB5]/10 text-[#00ADB5] border-[#00ADB5]/30",
    vendor: "bg-indigo-500/10 text-indigo-500 border-indigo-500/30",
    user: "bg-zinc-500/10 text-zinc-500 border-zinc-500/30",
  };

  const icon =
    role === "admin" ? (
      <FaShieldAlt size={10} />
    ) : role === "vendor" ? (
      <FaUserTie size={10} />
    ) : (
      <FaUser size={10} />
    );

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 border text-[10px] font-black uppercase tracking-widest rounded-lg ${styles[role] || styles.user}`}
    >
      {icon} {role || "user"}
    </span>
  );
}
