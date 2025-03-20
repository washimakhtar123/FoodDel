import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div 
      className="relative w-[90%] md:w-[80%] h-80 md:h-96 mx-auto bg-cover bg-center rounded-lg mt-11 flex items-center justify-center text-center md:text-left px-6 md:px-12" 
      style={{ backgroundImage: `url(${assets.header_img})` }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div> 

      {/* Text Content */}
      <div className="relative z-10 text-white w-full   animate-fadeIn">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Order Your <br /> Favorite Food Here
        </h1>
        <p className="text-sm md:text-lg mb-6 w-3/6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur commodi et quas totam cumque eum, veniam similique suscipit quisquam quidem.
        </p>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-lg">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
