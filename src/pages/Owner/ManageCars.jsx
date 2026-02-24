import React, { useEffect, useState } from "react";
import { assets, dummyCarData } from "../../assets/assets";
import Title from "../../components/Owner/Title";

const ManageCars = () => {
  const currency = import.meta.env.VITE_CURRENCY || "AED";
  const [cars, setCars] = useState([]);

  const fetchOwnerCars = async () => {
    setCars(dummyCarData);
  };

  useEffect(() => {
    fetchOwnerCars();
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 w-full bg-gray-50 min-h-screen">
      <Title
        title="Manage Cars"
        subTitle="View, update and control availability of your listed cars."
      />

      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg mt-8 overflow-hidden border border-gray-200">
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
              <tr
                key={index}
                className="border-t border-gray-200 hover:bg-gray-50 transition duration-200"
              >
                {/* Car Info */}
                <td className="p-5 flex items-center gap-4">
                  <img
                    src={car.image}
                    alt={car.name}
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

                {/* Category */}
                <td className="p-5 max-md:hidden font-medium">
                  {car.category}
                </td>

                {/* Location */}
                <td className="p-5 max-md:hidden">
                  {car.location || "UAE"}
                </td>

                {/* Price */}
                <td className="p-5 font-semibold text-primary text-base">
                  {currency} {car.pricePerDay}
                  <span className="text-xs text-gray-500"> /day</span>
                </td>

                {/* Status */}
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

                {/* Actions */}
                <td className="p-5">
                  <div className="flex justify-center gap-4">

                    {/* Toggle Button */}
                    <button
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm transition 
                      ${
                        car.isAvailable
                          ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      <img
                        src={
                          car.isAvailable
                            ? assets.eye_close_icon
                            : assets.eye_icon
                        }
                        alt="Toggle"
                        className="w-5 h-5"
                      />
                      {car.isAvailable ? "Disable" : "Enable"}
                    </button>

                    {/* Delete Button */}
                    <button
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200 shadow-sm transition"
                    >
                      <img
                        src={assets.delete_icon}
                        alt="Delete"
                        className="w-5 h-5"
                      />
                      Delete
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {cars.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No cars listed yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCars;