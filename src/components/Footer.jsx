"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";

import logoLight from "../../public/assets/logo-light.png";
import logoDark from "../../public/assets/logo-dark.png";

const Footer = () => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLogo = mounted && theme === "dark" ? logoDark : logoLight;
  const isActive = (path) => pathname === path;

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "All Tickets", path: "/all-tickets" },
    { label: "Contact Us", path: "/contact" },
    { label: "About", path: "/about" },
  ];

  const contactInfo = [
    {
      type: "email",
      label: "support@tikify.com",
      href: "mailto:support@tikify.com",
    },
    {
      type: "phone",
      label: "+880 1234-567890",
      href: "tel:+8801234567890",
    },
    {
      type: "facebook",
      label: "fb.com/tikify",
      href: "https://facebook.com/tikify",
      external: true,
    },
  ];

  const paymentMethods = ["Stripe", "Visa", "Mastercard", "bKash"];

  return (
    <footer className="w-full bg-white dark:bg-[#124170] border-t border-gray-200/60 dark:border-white/5 transition-colors duration-300">
      <div className="container mx-auto px-6 pt-16 pb-8">
        {/* Main 4-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 xl:gap-12 pb-12 border-b border-gray-200/60 dark:border-white/5">
          {/* Column 1: Identity & Brand Pitch */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="inline-flex items-center transition-transform active:scale-98 w-fit"
            >
              <div className="relative h-9 w-[130px] flex items-center">
                <Image
                  src={currentLogo}
                  alt="Tikify Logo"
                  width={110}
                  height={32}
                  priority
                  className="object-contain"
                />
              </div>
            </Link>

            <p className="text-sm font-semibold leading-relaxed text-gray-500 dark:text-gray-400 max-w-xs">
              Bangladesh&apos;s modern ticketing platform for buses, trains,
              launches and flights.
            </p>

            <div className="flex items-center gap-2 mt-1 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#67C090] animate-pulse" />
              <span className="text-xs font-bold text-gray-400 dark:text-gray-400 tracking-wide">
                Trusted by thousands of travelers
              </span>
            </div>
          </div>

          {/* Column 2: Minimalist Navigation Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-[#124170] dark:text-[#AAFFC7]">
              Quick Links
            </h4>

            <div className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm font-bold tracking-wide w-fit transition-all duration-200 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1.5px] after:bg-[#67C090] hover:after:w-full after:transition-all after:duration-300 ${
                    isActive(link.path)
                      ? "text-[#124170] dark:text-[#67C090] after:w-full"
                      : "text-gray-500 dark:text-gray-400 hover:text-[#124170] dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Contact Context Blocks */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-[#124170] dark:text-[#AAFFC7]">
              Contact
            </h4>

            <div className="flex flex-col gap-3.5">
              {contactInfo.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="group flex flex-col gap-0.5 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-[#124170] dark:hover:text-white transition-colors"
                >
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-extrabold group-hover:text-[#67C090] transition-colors">
                    {item.type}
                  </span>
                  <span className="truncate max-w-[240px] break-all font-semibold">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Payment Network Badges */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-[#124170] dark:text-[#AAFFC7]">
              Payment Methods
            </h4>

            <div className="flex flex-wrap gap-x-4 gap-y-2 max-w-xs">
              {paymentMethods.map((method) => (
                <span
                  key={method}
                  className="text-sm font-black tracking-wider text-[#124170] dark:text-gray-400 uppercase select-none opacity-80"
                >
                  {method}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-1 select-none">
              <div className="w-1.5 h-1.5 rounded-full bg-[#67C090]" />
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-wide">
                Encrypted & secure checkout
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Utility Signature Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-bold tracking-wide text-gray-400 dark:text-gray-500">
          <div className="text-center sm:text-left font-semibold">
            © 2026 Tikify. All rights reserved.
          </div>

          <div className="flex items-center gap-3 select-none">
            <div className="flex items-center gap-2 bg-gray-100/50 dark:bg-black/10 h-8 px-4 rounded-full border border-gray-200/20 dark:border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#67C090] animate-pulse" />
              <span className="font-bold text-gray-500 dark:text-gray-400">
                Secure Payments
              </span>
            </div>

            <div className="flex items-center gap-2 bg-gray-100/50 dark:bg-black/10 h-8 px-4 rounded-full border border-gray-200/20 dark:border-white/5">
              <span className="font-bold text-gray-500 dark:text-gray-400">
                24/7 Support
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
