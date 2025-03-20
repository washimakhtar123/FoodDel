import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import {  toast } from 'react-toastify';

const Navbar = ({ setShowlogin }) => {
  const [menu, setMenu] = useState("home");
  const [showDropdown, setShowDropdown] = useState(false); // Toggle dropdown
  const { getTotalCardAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    toast.success("Logged out successfully!");
    setToken(null);
    localStorage.removeItem("token");
    setShowDropdown(false);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="container w-[90%] mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={assets.logo} alt="logo" className="h-10" />
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-gray-600 font-medium">
          <a
            href="/"
            className={`cursor-pointer transition hover:text-orange-500 ${
              menu === "home" ? "text-orange-500 font-semibold pb-1 border-b-2 border-black" : ""
            }`}
            onClick={() => setMenu("home")}
          >
            Home
          </a>
          <a
            href="#explore-menu"
            className={`cursor-pointer transition hover:text-orange-500 ${
              menu === "menu" ? "text-orange-500 font-semibold pb-1 border-b-2 border-black" : ""
            }`}
            onClick={() => setMenu("menu")}
          >
            Menu
          </a>
          <a
            href="#app-dwonload"
            className={`cursor-pointer transition hover:text-orange-500 ${
              menu === "mobile" ? "text-orange-500 font-semibold pb-1 border-b-2 border-black" : ""
            }`}
            onClick={() => setMenu("mobile")}
          >
            Mobile App
          </a>
          <a
            href="#footer"
            className={`cursor-pointer transition hover:text-orange-500 ${
              menu === "contact" ? "text-orange-500 font-semibold pb-1 border-b-2 border-black" : ""
            }`}
            onClick={() => setMenu("contact")}
          >
            Contact
          </a>
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-6 relative">
          {/* Search Icon */}
          <img src={assets.search_icon} alt="Search" className="w-6 cursor-pointer" />

          {/* Basket Icon with Badge */}
          <div className="relative">
            <Link to="/cart">
              <img src={assets.basket_icon} alt="Basket" className="w-7 cursor-pointer" />
            </Link>
            {getTotalCardAmount() > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {getTotalCardAmount()}
              </div>
            )}
          </div>

          {/* User Profile or Sign In Button */}
          {!token ? (
            <button
              onClick={() => setShowlogin(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-medium transition"
            >
              Sign In
            </button>
          ) : (
            <div className="relative">
              {/* Profile Icon */}
              <img
                src={assets.profile_icon}
                alt="Profile"
                className="w-9 h-9 cursor-pointer rounded-full border border-gray-300"
                onClick={() => setShowDropdown(!showDropdown)}
              />

              {/* Dropdown Menu */}
              {showDropdown && (
                <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden">
                  <li
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate("/myorders");
                      setShowDropdown(false);
                    }}
                  >
                    <img src={assets.bag_icon} alt="Orders" className="w-5 mr-2" />
                    Orders
                  </li>
                  <hr />
                  <li
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                    onClick={handleLogout}
                  >
                    <img src={assets.logout_icon} alt="Logout" className="w-5 mr-2" />
                    Logout
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
