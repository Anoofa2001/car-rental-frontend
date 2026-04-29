import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CarCard from "../components/CarCard";
import Footer from "../components/Footer";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Cars = () => {

  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { cars, axios } = useAppContext();

  const [input, setInput] = useState("");
  const isSearchingData = pickupDate && returnDate && pickupLocation;
  const [filteredCars, setFilteredCars] = useState([]);

  const applyFilters = () => {
    if (input === "") {
      setFilteredCars(cars);
      return;
    }
    const filtered = cars.filter((car) =>
      car.brand.toLowerCase().includes(input.toLowerCase()) ||
      car.model.toLowerCase().includes(input.toLowerCase()) ||
      car.category.toLowerCase().includes(input.toLowerCase()) ||
      car.transmission.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredCars(filtered);
  };

  const searchCarAvailability = async () => {
    try {
      const { data } = await axios.post(`/api/bookings/check-availability`, {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });
      if (data.success) {
        setFilteredCars(data.availableCars);
        if (data.availableCars.length === 0) {
          toast("No cars available for the selected criteria");
        }
      }
    } catch (error) {
      toast.error("Failed to check car availability.");
      setFilteredCars([]);
    }
  };

  useEffect(() => {
    if (isSearchingData) {
      searchCarAvailability();
    } else {
      setFilteredCars([]);
    }
  }, [pickupLocation, pickupDate, returnDate]);

  useEffect(() => {
    cars.length > 0 && !isSearchingData && applyFilters();
  }, [input, cars]);

  // ✨ animation variants
  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      {/* 🔝 Top Section */}
      <div className="flex flex-col items-center py-20 bg-light max-md:px-4">

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title
            title="Available Cars"
            subTitle="Browse our selection of premium vehicles for rent"
          />
        </motion.div>

        {/* 🔍 Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow focus-within:shadow-lg transition-all"
        >
          <img src={assets.search_icon} alt="" className="w-4.5 h-4.5 mr-2" />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by make, model, or features"
            className="w-full h-full text-gray-500 outline-none"
          />

          <img src={assets.filter_icon} alt="" className="w-4.5 h-4.5 ml-2" />
        </motion.div>
      </div>

      {/* 🚗 Cars Grid */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">

        <motion.p
          key={filteredCars.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500 xl:px-20 max-w-7xl mx-auto"
        >
          Showing {filteredCars.length} Cars
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto"
        >
          {filteredCars.map((car, index) => (
            <motion.div
              key={index}
              variants={card}
              whileHover={{
                y: -8,
                scale: 1.03,
                boxShadow: "0px 20px 40px rgba(0,0,0,0.12)",
              }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default Cars;