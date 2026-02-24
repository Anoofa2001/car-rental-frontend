import React, { useState } from "react";
import Navbar from "./components/navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Cars from "./pages/Cars";
import MyBookings from "./pages/MyBookings";
import Layout from "./pages/Owner/Layout";
import AddCar from "./pages/Owner/AddCar";
import ManageCars from "./pages/Owner/ManageCars";
import ManageBookings from "./pages/Owner/ManageBookings";
import Dashboard from "./pages/Owner/Dashboard";
import Login from "./components/Login";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith("/owner");

  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}
     
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars-details/:id" element={<CarDetails />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
