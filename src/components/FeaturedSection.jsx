import React from "react";
import { assets } from "../assets/assets";
import CarCard from "./CarCard";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
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

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { cars } = useAppContext();

  return (
    <div className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32">
      
      {/* Title Animation */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Title
          title="Featured Cars"
          subTitle="Explore our selection of featured cars available for rent. Find the perfect ride for your next adventure!"
        />
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18"
      >
        {cars.slice(0, 6).map((car) => (
          <motion.div
            key={car.id}
            variants={cardVariants}
            whileHover={{
              y: -10,
              scale: 1.03,
              boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
            }}
            className="rounded-xl"
          >
            <CarCard car={car} />
          </motion.div>
        ))}
      </motion.div>

      {/* Button */}
      <motion.button
        onClick={() => {
          navigate("/cars");
          window.scrollTo(0, 0);
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.08,
          boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer overflow-hidden relative"
      >
        {/* subtle shine effect */}
        <motion.span
          className="absolute inset-0 bg-white opacity-10"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        Explore all cars
        <motion.img
          src={assets.arrow_icon}
          alt="arrow"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </motion.button>
    </div>
  );
};

export default FeaturedSection;