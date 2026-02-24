import React from "react";
import { assets, dummyCarData } from "../../assets/assets";
import { Link } from "react-router-dom";

const NavbarOwner = () => {
  const user = dummyCarData;
  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border border-borderColor relative transition-all">
        <Link to="/" onClick={() => window.scrollTo(0, 0)}>
          <img src={assets.logo} alt="logo" className="h-7 cursor-pointer" />
          <p>Welcome, {user.name || "Owner"}</p>
        </Link>
    </div>
  );
};

export default NavbarOwner;
