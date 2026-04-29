import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/Owner/Title";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { motion } from "motion/react";

const Dashboard = () => {

  const { axios, isOwner, currency } = useAppContext();

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const dashboardCards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    { title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored },
    { title: "Pending", value: data.pendingBookings, icon: assets.cautionIconColored },
    { title: "Completed", value: data.completedBookings, icon: assets.listIconColored },
  ];

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("/api/owner/dashboard");

      if (res.data.success) {
        setData(res.data.dashboardData);
      } else {
        toast.error(res.data.message);
      }

    } catch (error) {
      toast.error("Failed to fetch dashboard data.");
    }
  };

  useEffect(() => {
    if (isOwner) fetchDashboardData();
  }, [isOwner]);

  // ✨ animations
  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 pt-8 md:px-10 flex-1 bg-gray-50 min-h-screen"
    >

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Title
          title="Admin Dashboard"
          subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
        />
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
      >
        {dashboardCards.map((card, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            whileHover={{
              y: -5,
              boxShadow: "0px 10px 25px rgba(0,0,0,0.08)",
            }}
            className="flex items-center justify-between p-6 bg-white rounded-2xl transition"
          >
            <div>
              <p className="text-gray-500 text-sm">{card.title}</p>
              <h2 className="text-3xl font-semibold mt-2">{card.value}</h2>
            </div>
            <div className="bg-primary/10 p-3 rounded-xl">
              <img src={card.icon} alt="" className="w-6 h-6" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-3 gap-6 mt-10">

        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm"
        >
          <div className="mb-4">
            <h1 className="text-lg font-semibold">Recent Bookings</h1>
            <p className="text-gray-500 text-sm">Latest customer bookings</p>
          </div>

          {data.recentBookings.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No recent bookings available.
            </p>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {data.recentBookings.map((booking, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="flex items-center justify-between py-4 border-b last:border-none"
                >
                  <div>
                    <p className="font-medium">
                      {booking.car.brand} {booking.car.model}
                    </p>
                    <p className="text-sm text-gray-500">
                      {booking.createdAt?.split("T")[0]}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      {currency}{booking.price}
                    </p>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Revenue */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-sm flex flex-col justify-between"
        >
          <div>
            <h1 className="text-lg font-semibold">Monthly Revenue</h1>
            <p className="text-gray-500 text-sm">Total earnings this month</p>
          </div>

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <h2 className="text-4xl font-bold text-primary">
              {currency}{data.monthlyRevenue}
            </h2>
          </motion.div>

          <div className="mt-4 text-sm text-gray-400">
            Updated just now
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Dashboard;