import React, { useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";
import Title from "../../components/Owner/Title";

const Dashboard = () => {

  const currency = import.meta.env.VITE_CURRENCY

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const dashboardCards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    { title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored },
    { title: "Pending", value: data.pendingBookings, icon: assets.cautionIconColored },
    { title: "Completed", value: data.completedBookings, icon: assets.listIconColored },
  ];

  useEffect(() => {
    setData(dummyDashboardData);
  }, []);

 return (
  <div className="px-4 pt-8 md:px-10 flex-1 bg-gray-50 min-h-screen">

    <Title
      title="Admin Dashboard"
      subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
    />

    {/* Dashboard Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {dashboardCards.map((card, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-6 bg-white shadow-sm hover:shadow-md transition rounded-2xl"
        >
          <div>
            <p className="text-gray-500 text-sm">{card.title}</p>
            <h2 className="text-3xl font-semibold mt-2">{card.value}</h2>
          </div>
          <div className="bg-primary/10 p-3 rounded-xl">
            <img src={card.icon} alt="" className="w-6 h-6" />
          </div>
        </div>
      ))}
    </div>

    {/* Bottom Section */}
    <div className="grid lg:grid-cols-3 gap-6 mt-10">

      {/* Recent Bookings */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-lg font-semibold">Recent Bookings</h1>
            <p className="text-gray-500 text-sm">
              Latest customer bookings
            </p>
          </div>
        </div>

        {data.recentBookings.length === 0 ? (
          <p className="text-gray-400 text-sm mt-4">
            No recent bookings available.
          </p>
        ) : (
          data.recentBookings.map((booking, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-4 border-b last:border-none"
            >
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <img
                    src={assets.listIconColored}
                    alt=""
                    className="h-5 w-5"
                  />
                </div>

                <div>
                  <p className="font-medium">
                    {booking.car.brand} {booking.car.model}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking.createdAt?.split("T")[0]}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  {currency}{booking.price}
                </p>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    booking.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : booking.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Monthly Revenue Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col justify-between">
        <div>
          <h1 className="text-lg font-semibold">Monthly Revenue</h1>
          <p className="text-gray-500 text-sm">Total earnings this month</p>
        </div>

        <div className="mt-6">
          <h2 className="text-4xl font-bold text-primary">
            {currency}{data.monthlyRevenue}
          </h2>
        </div>

        <div className="mt-4 text-sm text-gray-400">
          Updated just now
        </div>
      </div>

    </div>
  </div>
);

};

export default Dashboard;
