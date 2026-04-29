import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";

const MyBookings = () => {

  const { axios, user, currency } = useAppContext();


  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user");
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error("Failed to fetch bookings. Please try again.");
    }
  };

  useEffect(() => {
    user && fetchBookings();
  }, [user]);

  // Currency formatter (AED)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "AED",
    }).format(amount || 0);
  };

  // Status style helper
  const statusClass = (status) =>
    status === "confirmed"
      ? "bg-green-400/15 text-green-600"
      : "bg-red-400/15 text-red-600";

  // Date formatter
  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString("en-GB") : "";
  };

  return (
    <>
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl">
        <Title
          title="My Bookings"
          subTitle="Review and manage your car rental reservations"
          align="left"
        />

        <div>
          {bookings.map((booking, index) => (
            <div
              key={booking?._id || index}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12"
            >
              {/* Car Image + Info */}
              <div className="md:col-span-1">
                <div className="rounded-md overflow-hidden mb-3">
                  <img
                    src={booking?.car?.image}
                    alt={`${booking?.car?.brand} ${booking?.car?.model}`}
                    className="w-full h-auto aspect-video object-cover"
                  />
                </div>

                <p className="font-medium">
                  {booking?.car?.brand} {booking?.car?.model}
                </p>

                <p className="text-gray-500 text-xs mt-1">
                  {booking?.car?.year} • {booking?.car?.category} •{" "}
                  {booking?.car?.location}
                </p>
              </div>

              {/* Booking Details */}
              <div className="md:col-span-2 flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  <p className="px-3 py-1.5 bg-light rounded text-xs">
                    Booking #{index + 1}
                  </p>

                  <p
                    className={`px-3 py-1 text-xs rounded-full capitalize ${statusClass(
                      booking?.status
                    )}`}
                  >
                    {booking?.status}
                  </p>
                </div>

                <div className="flex items-start gap-2 mt-3">
                  <img
                    src={assets.calendar_icon_colored}
                    alt=""
                    className="w-4 h-4 mt-1"
                  />
                  <div>
                    <p className="text-gray-500">Rental Period</p>
                    <p>
                      {formatDate(booking?.pickupDate)} To{" "}
                      {formatDate(booking?.returnDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 mt-3">
                  <img
                    src={assets.location_icon_colored}
                    alt=""
                    className="w-4 h-4 mt-1"
                  />
                  <div>
                    <p className="text-gray-500">Pickup Location</p>
                    <p>{booking?.car?.location}</p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="md:col-span-1 flex flex-col justify-between gap-6">
                <div>
                  <p>Total Price</p>
                  <h1 className="text-2xl font-semibold text-primary">
                    {formatCurrency(booking?.price)}
                  </h1>
                  <p>Booked on {formatDate(booking?.createdAt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyBookings;