import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";
import toast from "react-hot-toast";

const MyBookings = () => {

  const { axios, user, currency } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user");
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error("Failed to fetch bookings");
      }
    } catch (error) {
      toast.error("Failed to fetch bookings. Please try again.");
    }
  };

  useEffect(() => {
    user && fetchBookings();
  }, [user]);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "AED",
    }).format(amount || 0);

  const statusClass = (status) =>
    status === "confirmed"
      ? "bg-green-400/15 text-green-600"
      : "bg-red-400/15 text-red-600";

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-GB") : "";

  // ✨ animations
  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl"
      >

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title
            title="My Bookings"
            subTitle="Review and manage your car rental reservations"
            align="left"
          />
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {bookings.map((booking, index) => (
            <motion.div
              key={booking?._id || index}
              variants={card}
              whileHover={{
                y: -6,
                boxShadow: "0px 12px 30px rgba(0,0,0,0.08)",
              }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12 bg-white transition-all"
            >

              {/* Car */}
              <div className="md:col-span-1">
                <div className="rounded-md overflow-hidden mb-3">
                  <img
                    src={booking?.car?.image}
                    className="w-full aspect-video object-cover"
                    alt=""
                  />
                </div>

                <p className="font-medium">
                  {booking?.car?.brand} {booking?.car?.model}
                </p>

                <p className="text-gray-500 text-xs mt-1">
                  {booking?.car?.year} • {booking?.car?.category} •{" "}
                  {booking?.car?.location}
                </p>
              </div>

              {/* Details */}
              <div className="md:col-span-2 flex flex-col justify-between">

                <div className="flex items-center gap-2">
                  <p className="px-3 py-1.5 bg-light rounded text-xs">
                    Booking #{index + 1}
                  </p>

                  <motion.p
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className={`px-3 py-1 text-xs rounded-full capitalize ${statusClass(
                      booking?.status
                    )}`}
                  >
                    {booking?.status}
                  </motion.p>
                </div>

                <div className="flex items-start gap-2 mt-3">
                  <img src={assets.calendar_icon_colored} className="w-4 h-4 mt-1" />
                  <div>
                    <p className="text-gray-500">Rental Period</p>
                    <p>
                      {formatDate(booking?.pickupDate)} → {formatDate(booking?.returnDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 mt-3">
                  <img src={assets.location_icon_colored} className="w-4 h-4 mt-1" />
                  <div>
                    <p className="text-gray-500">Pickup Location</p>
                    <p>{booking?.car?.location}</p>
                  </div>
                </div>

              </div>

              {/* Price */}
              <div className="md:col-span-1 flex flex-col justify-between gap-6">
                <div>
                  <p>Total Price</p>
                  <h1 className="text-2xl font-semibold text-primary">
                    {formatCurrency(booking?.price)}
                  </h1>
                  <p className="text-gray-500 text-xs">
                    Booked on {formatDate(booking?.createdAt)}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </motion.div>

      <Footer />
    </>
  );
};

export default MyBookings;