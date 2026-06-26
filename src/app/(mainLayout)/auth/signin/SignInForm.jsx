"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Input, Card, CardContent as CardBody } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { data: signInData, error: signInError } =
        await authClient.signIn.email({
          email: data.email,
          password: data.password,
        });

      if (signInError) {
        toast.error(signInError.message || "Invalid credentials");
      } else {
        toast.success("Welcome back!");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md relative z-10"
    >
      <Card className="w-full border border-zinc-200/40 dark:border-white/5 bg-zinc-50/50 dark:bg-black/10 backdrop-blur-md shadow-xl p-6 sm:p-8">
        <div className="flex flex-col gap-1 items-center pb-6 text-center select-none">
          <motion.h1
            variants={itemVariants}
            className="text-2xl font-black uppercase tracking-wider text-[#124170] dark:text-white"
          >
            Welcome Back
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-1"
          >
            Sign in to manage your tickets and journeys.
          </motion.p>
        </div>

        <CardBody className="gap-0 p-0">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-1.5"
            >
              <label className="text-xs font-black uppercase tracking-wider text-[#124170] dark:text-[#00ADB5] flex items-center gap-1.5">
                <FaEnvelope className="text-[10px]" /> Email Address
              </label>
              <Input
                {...register("email", { required: "Email is required" })}
                placeholder="john@example.com"
                type="email"
                className="w-full"
              />
              {errors.email && (
                <span className="text-[10px] font-bold text-red-500 uppercase mt-0.5 ml-1">
                  {errors.email.message}
                </span>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-1.5"
            >
              <label className="text-xs font-black uppercase tracking-wider text-[#124170] dark:text-[#00ADB5] flex items-center gap-1.5">
                <FaLock className="text-[10px]" /> Password
              </label>
              <Input
                {...register("password", { required: "Password is required" })}
                placeholder="Enter your password"
                type="password"
                className="w-full"
              />
              {errors.password && (
                <span className="text-[10px] font-bold text-red-500 uppercase mt-0.5 ml-1">
                  {errors.password.message}
                </span>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="pt-2"
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
            >
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full h-11 text-xs font-bold tracking-wider uppercase bg-[#124170] dark:bg-[#00ADB5] text-[#AAFFC7] dark:text-[#091624] rounded-full shadow-md transition-colors"
              >
                Sign In
              </Button>
            </motion.div>
          </form>

          <motion.p
            variants={itemVariants}
            className="text-center text-sm font-semibold text-zinc-500 dark:text-zinc-400 pt-6"
          >
            New to Tikify?{" "}
            <Link
              href="/auth/signup"
              className="text-[#124170] dark:text-[#00ADB5] font-bold hover:opacity-80 transition-opacity"
            >
              CREATE ACCOUNT
            </Link>
          </motion.p>
        </CardBody>
      </Card>
    </motion.div>
  );
}
