import React, { useState } from "react";
import { assets, dummyCarData, ownerMenuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const user = dummyCarData;

  // Profile image state
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImage, setProfileImage] = useState(
    user?.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70"
  );

  // Save image
  const updateImage = () => {
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setProfileImage(imageUrl);
      setSelectedImage(null);
    }
  };

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm">

      {/* Profile Image Section */}
      <div className="group relative">
        <label htmlFor="image">
          <img
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : profileImage
            }
            alt="Profile"
            className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto object-cover"
          />

          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setSelectedImage(e.target.files[0])}
          />

          <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets.edit_Icon} alt="Edit" />
          </div>
        </label>
      </div>

      {/* Save Button */}
      {selectedImage && (
        <button
          onClick={updateImage}
          className="absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer rounded-md"
        >
          Save
          <img src={assets.check_icon} width={13} alt="Save" />
        </button>
      )}

      {/* User Name */}
      <p className="mt-2 text-base max-md:hidden">{user?.name}</p>

      {/* Menu Links */}
      <div className="w-full">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${
              link.path === location.pathname
                ? "bg-primary/10 text-primary"
                : "text-gray-600"
            }`}
          >
            <img
              src={
                link.path === location.pathname
                  ? link.coloredIcon
                  : link.icon
              }
              alt=""
            />

            <span className="max-md:hidden">{link.name}</span>

            {link.path === location.pathname && (
              <div className="bg-primary w-1.5 h-8 rounded-l right-0 absolute"></div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
