import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div id='footer' className="bg-gray-900 text-white py-12 px-6 mt-28">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

        {/* Left Section */}
        <div className="space-y-4">
          <img src={assets.logo} alt="logo" className="w-24 md:w-32 mx-auto md:mx-0" />
          <p className="text-gray-400 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae odio repellat voluptatibus optio quia.
          </p>
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            <img src={assets.facebook_icon} alt="Facebook" className="w-6 h-6 cursor-pointer hover:opacity-75 transition" />
            <img src={assets.linkedin_icon} alt="LinkedIn" className="w-6 h-6 cursor-pointer hover:opacity-75 transition" />
            <img src={assets.twitter_icon} alt="Twitter" className="w-6 h-6 cursor-pointer hover:opacity-75 transition" />
          </div>
        </div>

        {/* Center Section */}
        <div>
          <h2 className="text-lg font-semibold border-b-2 border-gray-700 pb-2 mb-4">COMPANY</h2>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white transition cursor-pointer">Home</li>
            <li className="hover:text-white transition cursor-pointer">About Us</li>
            <li className="hover:text-white transition cursor-pointer">Delivery</li>
            <li className="hover:text-white transition cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h2 className="text-lg font-semibold border-b-2 border-gray-700 pb-2 mb-4">GET IN TOUCH</h2>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white transition cursor-pointer">+1-212-456-6530</li>
            <li className="hover:text-white transition cursor-pointer">contact@tomato.com</li>
          </ul>
        </div>
      </div>

      {/* Divider Line */}
      <hr className="border-gray-700 my-8 mx-6" />

      {/* Copyright */}
      <p className="text-center text-gray-500 text-sm">© 2025 Tomato.com - All Rights Reserved</p>
    </div>
  );
};

export default Footer;
