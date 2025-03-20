import React from 'react';
import { assets } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div id='explore-menu' className='w-[90%] md:w-[80%] flex flex-col mx-auto mt-10'>
      <h1 className='text-2xl font-semibold text-center md:text-left'>Explore our menu</h1>
      <p className='mt-4 text-sm md:text-base text-center md:text-left'>
        Lorem ipsum dolor sit amet consectetur.<br />
        Dolor sit amet consectetur adipisicing elit. Magni cumque itaque nobis?
      </p>
      
      {/* Responsive Flexbox Layout with Horizontal Scroll on Small Screens */}
      <div className='flex mt-10 gap-6 md:gap-10 overflow-x-auto md:overflow-visible scrollbar-hide px-2'>
        {menu_list.map((item, index) => (
          <div 
            key={index} 
            onClick={() => setCategory(category === item.menu_name ? "All" : item.menu_name)} 
            className='cursor-pointer text-center flex-shrink-0'
          >
            <img  
              className={`w-20 h-20 md:w-28 md:h-28 object-cover rounded-full mx-auto transition-all duration-300 ${
                category === item.menu_name ? "border-4 border-orange-500" : "border-2 border-transparent"
              }`}
              src={item.menu_image} 
              alt={item.menu_name} 
            />
            <p className={`text-sm md:text-lg mt-2 transition-all duration-300 ${
              category === item.menu_name ? "opacity-100 font-bold text-orange-500" : "opacity-40"
            }`}>
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>
      
      {/* Bottom Divider */}
      <div className='mt-6 h-[2px] bg-zinc-500'></div>
    </div>
  );
};

export default ExploreMenu;
