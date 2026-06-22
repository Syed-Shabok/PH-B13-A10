const DashboardHeading = ({ title, description }) => {
  return (
    <div className="border-b border-white/5 pb-5 ">
      <h1 className="text-3xl font-extrabold text-[#124170] dark:text-white text-center">
        {title}
      </h1>
      <p className="text-center font-medium">{description}</p>
    </div>
  );
};

export default DashboardHeading;
