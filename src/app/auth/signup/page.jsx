"use client";

import { authClient } from "@/lib/auth-client";

import { uploadImage } from "@/utils/uploadImage";

import { Button, Input } from "@heroui/react";

import { redirect } from "next/navigation";

import React from "react";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

const SignupPage = () => {
  const {
    register,

    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const imageFile = data.image[0];

    const imageUrl = await uploadImage(imageFile);

    const { data: signupData, error: signupError } =
      await authClient.signUp.email({
        name: data.name,

        email: data.email,

        password: data.password,

        image: imageUrl,
      });

    // console.log(signupError.message);

    if (signupError) {
      toast.error(signupError.message || "Registration Failed");
    } else {
      toast.success("Registration Successful");

      redirect("/");
    }
  };

  return (
    <div className="min-h-[75vh] mx-auto flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-150 bg-gray-100 px-8 py-12 rounded-xl"
      >
        {/* Full Name Input Field */}

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="text-[11px] font-black uppercase tracking-wider text-[#124170] dark:text-[#AAFFC7]"
          >
            Full Name
          </label>

          <Input
            id="name"
            {...register("name", {
              required: "Name is required",
            })}
            placeholder="John Doe"
            className="w-full"
          />
        </div>

        {/* Name Error Message */}

        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        {/* Email Address Input Field */}

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-[11px] font-black uppercase tracking-wider text-[#124170] dark:text-[#AAFFC7]"
          >
            Email Address
          </label>

          <Input
            id="email"
            {...register("email", {
              required: "Email is required",

              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

                message: "Please enter a valid email address",
              },
            })}
            placeholder="john@example.com"
            type="email"
            className="w-full"
          />
        </div>

        {/* Email Error Message */}

        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        {/* Profile Image File Upload Field */}

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="image"
            className="text-[11px] font-black uppercase tracking-wider text-[#124170] dark:text-[#AAFFC7]"
          >
            Profile Image
          </label>

          <Input
            type="file"
            {...register("image", {
              required: "image is required",
            })}
            accept="image/*"
            id="image"
            className="w-full file:bg-transparent file:border-0 file:text-xs file:font-bold"
          />
        </div>

        {/* Image Error Message */}

        {errors.image && <p className="text-red-500">{errors.image.message}</p>}

        {/* Password Input Field */}

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-[11px] font-black uppercase tracking-wider text-[#124170] dark:text-[#AAFFC7]"
          >
            Password
          </label>

          <Input
            id="password"
            {...register("password", {
              required: "Password is required",

              minLength: {
                value: 6,

                message: "Password must be at least 6 characters",
              },

              maxLength: {
                value: 12,

                message: "Password cannot exceed 12 characters",
              },

              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,

                message: "Must contain at least one letter and one number",
              },
            })}
            placeholder="Enter your password"
            type="password"
            className="w-full"
          />
        </div>

        {/* Password Error Message */}

        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        {/* Role Selection Custom Dropdown Field */}

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="role"
            className="text-[11px] font-black uppercase tracking-wider text-[#124170] dark:text-[#AAFFC7]"
          >
            Select Account Role
          </label>

          <div className="relative w-full h-10">
            <select
              id="role"
              {...register("role", {
                required: "Role is required",
              })}
              className="w-full h-full bg-gray-100/60 dark:bg-black/20 border border-gray-200/40 dark:border-white/5 rounded-xl px-3 text-xs font-semibold text-gray-700 dark:text-gray-300 focus:outline-none focus:border-[#124170] dark:focus:border-[#67C090] appearance-none cursor-pointer transition-colors"
            >
              <option value="attendee" className="dark:bg-[#124170]">
                Passenger
              </option>

              <option value="organizer" className="dark:bg-[#124170]">
                Operator
              </option>
            </select>

            {/* Role Error Message */}

            {errors.role && (
              <p className="text-red-500">{errors.role.message}</p>
            )}

            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 text-[10px]">
              ▼
            </div>
          </div>
        </div>

        {/* Main Form Submit Trigger Button Layout */}

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full h-11 text-xs font-bold tracking-wider uppercase bg-[#124170] dark:bg-[#67C090] text-[#AAFFC7] dark:text-[#124170] rounded-full shadow-md dark:shadow-none transition-colors"
          >
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
