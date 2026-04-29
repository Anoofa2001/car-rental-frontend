import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import { motion } from "motion/react";

const CarDetails = () => {
  const { id } = useParams();

  const {
    cars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    currency,
  } = useAppContext();

  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/bookings/create", {
        car: car._id,
        pickupDate,
        returnDate,
      });
      if (data.success) {
        toast.success("Car booked successfully!");
        navigate("/my-bookings");
      } else {
        toast.error("Failed to book the car. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while booking the car.");
    }
  };

  useEffect(() => {
    if (cars && cars.length > 0) {
      const foundCar = cars.find((c) => c._id === id);
      setCar(foundCar || null);
    }
  }, [cars, id]);

  if (!car) return <Loader />;

  // ✨ variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16"
      >
        {/* 🔙 Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ x: -5 }}
          className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
        >
          <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65" />
          Back to all cars
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* LEFT */}
          <div className="lg:col-span-2">

            {/* 🖼 Image */}
            <motion.img
              src={car.image}
              alt=""
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
            />

            <div className="space-y-6">

              {/* Title */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible">
                <h1 className="text-3xl font-bold">
                  {car.brand} {car.model}
                </h1>
                <p className="text-gray-500 text-lg">
                  {car.category} {car.year}
                </p>
              </motion.div>

              <hr className="border-borderColor my-6" />

              {/* Specs */}
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                {[
                  { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
                  { icon: assets.fuel_icon, text: car.fuel_type },
                  { icon: assets.car_icon, text: car.transmission },
                  { icon: assets.location_icon, text: car.location },
                ].map(({ icon, text }) => (
                  <motion.div
                    key={text}
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    className="flex flex-col items-center bg-light p-4 rounded-lg"
                  >
                    <img src={icon} alt="" className="h-5 mb-2" />
                    {text}
                  </motion.div>
                ))}
              </motion.div>

              {/* Description */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible">
                <h1 className="text-xl font-medium mb-3">Description</h1>
                <p className="text-gray-500">{car.description}</p>
              </motion.div>

              {/* Features */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible">
                <h1 className="text-xl font-medium mb-3">Features</h1>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {["360 Camera", "Bluetooth", "Cruise Control", "Heated Seats"].map((item) => (
                    <motion.li
                      key={item}
                      whileHover={{ x: 4 }}
                      className="flex items-center text-gray-500"
                    >
                      <img src={assets.check_icon} alt="" className="h-4 mr-2" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* RIGHT (Booking Card) */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500"
          >
            <p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
              {currency}{car.pricePerDay}
              <span className="text-base text-gray-400 font-normal"> Per day</span>
            </p>

            <hr className="border-borderColor my-6" />

            {/* Dates */}
            <div className="flex flex-col gap-2">
              <label>Pickup Date</label>
              <input
                type="date"
                value={pickupDate || ""}
                onChange={(e) => setPickupDate(e.target.value)}
                className="border border-borderColor px-3 py-2 rounded-lg"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>Return Date</label>
              <input
                type="date"
                value={returnDate || ""}
                onChange={(e) => setReturnDate(e.target.value)}
                className="border border-borderColor px-3 py-2 rounded-lg"
                required
              />
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer"
            >
              Book Now
            </motion.button>

            <p className="text-center text-sm">
              No credit card required to reserve
            </p>
          </motion.form>
        </div>
      </motion.div>

      <Footer />
    </>
  );
};

export default CarDetails;