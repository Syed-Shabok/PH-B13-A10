import React, { Suspense } from "react";
import SignInForm from "./SignInForm";

export const metadata = {
  title: "Sign In | Tikify",
  description: "Sign in to manage your tickets and journeys.",
};

export default function SignInPage() {
  return (
    <div className="min-h-[90vh] w-full bg-white dark:bg-[#091624] flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden transition-colors duration-300">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00ADB5]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#AAFFC7]/10 rounded-full blur-3xl pointer-events-none" />

      <Suspense
        fallback={
          <div className="z-10 text-[#124170] dark:text-[#00ADB5] font-bold uppercase tracking-widest animate-pulse">
            Loading...
          </div>
        }
      >
        <SignInForm />
      </Suspense>
    </div>
  );
}
