import React from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6 mt-1 shadow-md">
      <div className="flex flex-col space-y-6">
        <NavLink
          to="/add"
          className="flex items-center space-x-4 cursor-pointer hover:bg-gray-700 p-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <img src={assets.add_icon} alt="Add Items" className="w-6 h-6" />
          <p className="font-semibold">Add Items</p>
        </NavLink>
        <NavLink
          to="/list"
          className="flex items-center space-x-4 cursor-pointer hover:bg-gray-700 p-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <img src={assets.order_icon} alt="List Items" className="w-6 h-6" />
          <p className="font-semibold">List Items</p>
        </NavLink>
        <NavLink
          to="/order"
          className="flex items-center space-x-4 cursor-pointer hover:bg-gray-700 p-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <img src={assets.order_icon} alt="Orders" className="w-6 h-6" />
          <p className="font-semibold">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
