import React from 'react';
import { assets } from '../../assets/assets';

const DownloadApp = () => {
  return (
    <div id='app-dwonload' className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-12 px-6 text-center rounded-lg shadow-lg w-[90%] md:w-[80%] mx-auto mb-6">
      
      {/* Title */}
      <p className="text-lg md:text-xl font-semibold mb-4">
        For a Better Experience, Download <br /> 
        <span className="text-yellow-300">Tomato App</span>
      </p>
      
      {/* Store Buttons - Responsive */}
      <div className="flex justify-center space-x-3 md:space-x-4 mt-4">
        <img 
          src={assets.play_store} 
          alt="Play Store" 
          className="w-32 md:w-40 cursor-pointer transform hover:scale-105 transition" 
        />
        <img 
          src={assets.app_store} 
          alt="App Store" 
          className="w-32 md:w-40 cursor-pointer transform hover:scale-105 transition" 
        />
      </div>
    </div>
  );
};

export default DownloadApp;
