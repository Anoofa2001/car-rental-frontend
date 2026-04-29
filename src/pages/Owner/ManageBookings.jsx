import React, { useEffect, useState } from "react";
import Title from "../../components/Owner/Title";
import { useAppContext } from "../../context/AppContext";
import { motion } from "framer-motion";

const ManageBookings = () => {

  const { axios, currency } = useAppContext();

  const [bookings, setBookings] = useState([]);

  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/owner");
      data.success ? setBookings(data.bookings) : toast.error(data.message);
    } catch (error) {
      toast.error("Failed to fetch bookings. Please try again.");
    }
  };

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post("/api/bookings/change-status", { bookingId, status });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch bookings. Please try again.");
    }
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

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
          title="Manage Bookings"
          subTitle="View, approve, reject and manage your rental bookings."
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-6xl w-full bg-white rounded-2xl shadow-xl mt-8 overflow-hidden border border-gray-200"
      >
        <table className="w-full text-sm text-gray-600">

          <thead className="bg-gray-100 text-gray-500 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-5 text-left font-semibold">Car Details</th>
              <th className="p-5 font-semibold max-md:hidden">Date Range</th>
              <th className="p-5 font-semibold">Total</th>
              <th className="p-5 font-semibold max-md:hidden">Payment</th>
              <th className="p-5 font-semibold text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className="border-t border-gray-200 hover:bg-gray-50 transition duration-200"
              >

                {/* Car Details */}
                <td className="p-5 flex items-center gap-4">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={booking.car.image}
                    className="w-14 h-14 object-cover rounded-lg shadow"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {booking.car.brand} {booking.car.model}
                    </p>
                    <p className="text-xs text-gray-500">
                      {booking.car.category}
                    </p>
                  </div>
                </td>

                {/* Date Range */}
                <td className="p-5 max-md:hidden">
                  <p>
                    {booking.pickupDate.split("T")[0]} to{" "}
                    {booking.returnDate.split("T")[0]}
                  </p>
                </td>

                {/* Total */}
                <td className="p-5 font-semibold text-gray-800">
                  {currency} {booking.price}
                </td>

                {/* Payment */}
                <td className="p-5 max-md:hidden">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    offline
                  </span>
                </td>

                {/* Status */}
                <td className="p-5 text-center">
                  {booking.status === "completed" ? (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                      Completed
                    </span>
                  ) : (
                    <motion.select
                      whileFocus={{ scale: 1.02 }}
                      onChange={(e) =>
                        changeBookingStatus(booking._id, e.target.value)
                      }
                      value={booking.status}
                      className="px-3 py-2 text-xs font-semibold rounded-lg border border-gray-300 bg-white shadow-sm cursor-pointer"
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                    </motion.select>
                  )}
                </td>

              </motion.tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-10 text-center text-gray-500"
          >
            No bookings available.
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ManageBookings;