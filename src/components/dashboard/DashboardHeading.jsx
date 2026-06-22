import React from "react";

const DashboardHeading = ({ title, description }) => {
  return (
    <div className="border-b border-slate-200 dark:border-white/5 pb-5 w-full text-left lg:text-center max-w-4xl mx-auto px-2">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#124170] dark:text-white transition-colors duration-300">
        {title}
      </h1>
      <p className="text-xs sm:text-sm lg:text-lg font-medium text-slate-500 dark:text-slate-400 mt-1.5 transition-colors duration-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default DashboardHeading;
