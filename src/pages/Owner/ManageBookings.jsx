import React, { useEffect, useState } from "react";
import { dummyMyBookingsData } from "../../assets/assets";
import Title from "../../components/Owner/Title";

const ManageBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || "AED";
  const [bookings, setBookings] = useState([]);

  const fetchOwnerBookings = async () => {
    setBookings(dummyMyBookingsData);
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 w-full bg-gray-50 min-h-screen">
      <Title
        title="Manage Bookings"
        subTitle="View, approve, reject and manage your rental bookings."
      />

      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl mt-8 overflow-hidden border border-gray-200">
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
              <tr
                key={index}
                className="border-t border-gray-200 hover:bg-gray-50 transition duration-200"
              >
                {/* Car Details */}
                <td className="p-5 flex items-center gap-4">
                  <img
                    src={booking.car.image}
                    alt={booking.car.name}
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

                {/* Booking Status */}
                <td className="p-5 text-center">
                  {booking.status === "Completed" ? (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                      Completed
                    </span>
                  ) : (
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(index, e.target.value)
                      }
                      className="px-3 py-2 text-xs font-semibold rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  )}
                </td>

               
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No bookings available.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;
