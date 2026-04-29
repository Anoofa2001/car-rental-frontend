import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/Owner/Title";
import { useAppContext } from "../../context/AppContext";
import { motion } from "framer-motion";

const ManageCars = () => {

  const { isOwner, axios, currency } = useAppContext();

  const [cars, setCars] = useState([]);

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get("/api/owner/cars");

      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch cars. Please try again.");
    }
  };

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post("/api/owner/toggle-cars", { carId });

      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch cars. Please try again.");
    }
  };

  const deleteCar = async (carId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this car? This action cannot be undone.");
      if (!confirm) return null;

      const { data } = await axios.post("/api/owner/delete-car", { carId });

      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch cars. Please try again.");
    }
  };

  useEffect(() => {
    isOwner && fetchOwnerCars();
  }, [isOwner]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-4 pt-10 md:px-10 w-full bg-gray-50 min-h-screen"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Title
          title="Manage Cars"
          subTitle="View, update and control availability of your listed cars."
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-6xl w-full bg-white rounded-2xl shadow-lg mt-8 overflow-hidden border border-gray-200"
      >
        <table className="w-full text-sm text-gray-600">

          <thead className="bg-gray-100 text-gray-500 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-5 text-left font-semibold">Car Details</th>
              <th className="p-5 font-semibold max-md:hidden">Category</th>
              <th className="p-5 font-semibold max-md:hidden">Location</th>
              <th className="p-5 font-semibold">Price</th>
              <th className="p-5 font-semibold max-md:hidden">Status</th>
              <th className="p-5 font-semibold text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {cars.map((car, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className="border-t border-gray-200 hover:bg-gray-50 transition duration-200"
              >
                <td className="p-5 flex items-center gap-4">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={car.image}
                    className="w-16 h-16 object-cover rounded-xl shadow-sm"
                  />
                  <div>
                    <p className="font-semibold text-gray-800 text-base">
                      {car.brand} {car.model}
                    </p>
                    <p className="text-xs text-gray-500">
                      {car.seating_capacity} Seats • {car.transmission}
                    </p>
                  </div>
                </td>

                <td className="p-5 max-md:hidden font-medium">
                  {car.category}
                </td>

                <td className="p-5 max-md:hidden">
                  {car.location || "UAE"}
                </td>

                <td className="p-5 font-semibold text-primary text-base">
                  {currency} {car.pricePerDay}
                  <span className="text-xs text-gray-500"> /day</span>
                </td>

                <td className="p-5 max-md:hidden">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-medium ${
                      car.isAvailable
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {car.isAvailable ? "Available" : "Not Available"}
                  </span>
                </td>

                <td className="p-5">
                  <div className="flex justify-center gap-4">
{/* 
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm transition`}
                    >
                      <img
                        onClick={() => toggleAvailability(car._id)}
                        src={
                          car.isAvailable
                            ? assets.eye_close_icon
                            : assets.eye_icon
                        }
                        className="w-5 h-5"
                      />
                      {car.isAvailable ? "Disable" : "Enable"}
                    </motion.button> */}

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => deleteCar(car._id)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200 shadow-sm transition"
                    >
                      <img
                        src={assets.delete_icon}
                        className="w-5 h-5"
                      />
                      Delete
                    </motion.button>

                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {cars.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-10 text-center text-gray-500"
          >
            No cars listed yet.
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ManageCars;