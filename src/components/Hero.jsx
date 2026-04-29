import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const floating = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Hero = () => {
  const [PickupLocation, setPickupLocation] = useState("");
  const { PickupDate, setPickupDate, returnDate, setReturnDate, navigate } =
    useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/cars?pickupLocation=${PickupLocation}&pickupDate=${PickupDate}&returnDate=${returnDate}`
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-screen flex flex-col items-center justify-center gap-14 bg-light text-center overflow-hidden"
    >
      {/* Heading */}
      <motion.h1
        variants={fadeUp}
        className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-gray-800 to-gray-500 bg-clip-text text-transparent"
      >
        Rent Your Dream Car Today!
      </motion.h1>

      {/* Form */}
      <motion.form
        variants={fadeUp}
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl md:rounded-full w-full max-w-80 md:max-w-200 bg-white/80 backdrop-blur-lg shadow-xl border border-gray-200"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:ml-8">
          {/* Location */}
          <div className="flex flex-col items-start gap-2">
            <select
              required
              value={PickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="outline-none bg-transparent"
            >
              <option value="">Pickup Location</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <p className="px-1 text-sm text-gray-500">
              {PickupLocation || "Please select location"}
            </p>
          </div>

          {/* Pickup */}
          <div className="flex flex-col items-start gap-2">
            <label>Pickup Date</label>
            <input
              value={PickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="text-sm text-gray-500 bg-transparent outline-none"
              required
            />
          </div>

          {/* Return */}
          <div className="flex flex-col items-start gap-2">
            <label>Return Date</label>
            <input
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              type="date"
              className="text-sm text-gray-500 bg-transparent outline-none"
              required
            />
          </div>
        </div>

        {/* Button */}
        <motion.button
          whileHover={{
            scale: 1.08,
            boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
          }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 px-9 py-3 max-sm:mt-4 bg-primary text-white rounded-full transition-all cursor-pointer"
        >
          <motion.img
            src={assets.search_icon}
            alt="search"
            className="brightness-300"
            initial={{ rotate: -20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          Search
        </motion.button>
      </motion.form>

      {/* Floating Car Image */}
      <motion.img
        src={assets.main_car}
        alt="car"
        className="max-h-74 drop-shadow-2xl"
        variants={fadeUp}
        animate="animate"
        {...floating}
      />
    </motion.div>
  );
};

export default Hero;