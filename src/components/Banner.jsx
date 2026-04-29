import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

const textContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Banner = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative flex flex-col md:flex-row md:items-start items-center justify-between
      px-8 md:pl-14 pt-10 max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden text-white"
    >
      {/* 🌈 Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            "linear-gradient(90deg, #0558FE, #A9CFFF)",
            "linear-gradient(120deg, #1e40af, #60a5fa)",
            "linear-gradient(90deg, #0558FE, #A9CFFF)",
          ],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* ✨ Content */}
      <motion.div
        variants={textContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10"
      >
        <motion.h2 variants={fadeUp} className="text-3xl font-semibold">
          Do You Own a Luxury Car?
        </motion.h2>

        <motion.p variants={fadeUp} className="mt-2">
          Monetize your vehicle effortlessly by listing it on CarRental.
        </motion.p>

        <motion.p variants={fadeUp} className="max-w-md mt-2">
          We take care of insurance, driver verification and secure payments
          — so you can earn passive income, stress-free.
        </motion.p>

        {/* 🎯 Button */}
        <motion.button
          variants={fadeUp}
          whileHover={{
            scale: 1.08,
            boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/owner/add-car")}
          className="relative px-6 py-2 bg-white text-blue-600 rounded-lg text-sm mt-4 overflow-hidden"
        >
          {/* Shine Effect */}
          <motion.span
            className="absolute inset-0 bg-blue-200 opacity-20"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          List your Car
        </motion.button>
      </motion.div>

      {/* 🚗 Car Image Animation */}
      <motion.img
        src={assets.banner_car_image}
        alt="car"
        initial={{ x: 100, opacity: 0, scale: 0.9 }}
        whileInView={{ x: 0, opacity: 1, scale: 1 }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
        viewport={{ once: true }}
        className="relative z-10 max-h-48 mt-10 md:mt-0 drop-shadow-2xl"
      />
    </motion.div>
  );
};

export default Banner;