import React, { useState } from "react";
import Title from "../../components/Owner/Title";
import { assets } from "../../assets/assets";

const AddCar = () => {
  const [image, setImage] = useState(null);

  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    seating_capacity: "",
    fuel_type: "",
    transmission: "",
    category: "",
    description: "",
  });

  const currentYear = new Date().getFullYear();
  const currency = "₹"; // Change to "$" if needed

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(car);
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1 bg-gray-50 min-h-screen">
      <div className="max-w-4xl">
        <Title
          title="Add New Car"
          subTitle="Fill in the details of your car to add it to the platform and start earning!"
        />

        <form
          onSubmit={onSubmitHandler}
          className="mt-8 bg-white p-10 rounded-3xl shadow-lg flex flex-col gap-8"
        >
          {/* Car Image Upload */}
          <div>
            <label className="block text-gray-700 font-semibold mb-3">
              Car Image
            </label>

            <div className="flex items-center gap-6 p-6 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 hover:border-primary transition">
              <label htmlFor="car-image" className="cursor-pointer">
                <img
                  src={image ? URL.createObjectURL(image) : assets.upload_icon}
                  alt=""
                  className="h-24 w-24 object-cover rounded-2xl shadow-sm"
                />
                <input
                  type="file"
                  id="car-image"
                  accept="image/*"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>

              <div>
                <p className="font-medium text-gray-700">
                  {image ? "Image Selected" : "Click to upload"}
                </p>
                <p className="text-sm text-gray-500">
                  PNG or JPG • Max 5MB
                </p>
              </div>
            </div>
          </div>

          {/* Brand & Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Brand
              </label>
              <input
                type="text"
                value={car.brand}
                onChange={(e) =>
                  setCar({ ...car, brand: e.target.value })
                }
                placeholder="e.g. Toyota"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Model
              </label>
              <input
                type="text"
                value={car.model}
                onChange={(e) =>
                  setCar({ ...car, model: e.target.value })
                }
                placeholder="e.g. Camry"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition"
                required
              />
            </div>
          </div>

          {/* Year & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Year
              </label>
              <input
                type="number"
                min="1900"
                max={currentYear}
                value={car.year}
                onChange={(e) =>
                  setCar({ ...car, year: e.target.value })
                }
                placeholder={`e.g. ${currentYear}`}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Price Per Day
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  {currency}
                </span>

                <input
                  type="number"
                  min="0"
                  value={car.pricePerDay}
                  onChange={(e) =>
                    setCar({ ...car, pricePerDay: e.target.value })
                  }
                  placeholder="100"
                  className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary outline-none transition"
                  required
                />
              </div>
            </div>
          </div>

          {/* Category, Fuel Type, Transmission */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Category
              </label>
              <select
                value={car.category}
                onChange={(e) =>
                  setCar({ ...car, category: e.target.value })
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition bg-white"
                required
              >
                <option value="">Select Category</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Luxury">Luxury</option>
                <option value="Sports">Sports</option>
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Fuel Type
              </label>
              <select
                value={car.fuel_type}
                onChange={(e) =>
                  setCar({ ...car, fuel_type: e.target.value })
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition bg-white"
                required
              >
                <option value="">Select Fuel</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Transmission
              </label>
              <select
                value={car.transmission}
                onChange={(e) =>
                  setCar({ ...car, transmission: e.target.value })
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition bg-white"
                required
              >
                <option value="">Select Transmission</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>
          </div>

          {/* Seating Capacity */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Seating Capacity
            </label>
            <input
              type="number"
              min="1"
              max="12"
              value={car.seating_capacity}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
              placeholder="e.g. 5"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Description
            </label>
            <textarea
              rows="4"
              value={car.description}
              onChange={(e) =>
                setCar({ ...car, description: e.target.value })
              }
              placeholder="Write something about the car..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-primary text-white px-8 py-3 rounded-xl hover:opacity-90 transition font-semibold shadow-md"
            >
              Add Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
