import React, { useState } from 'react';
import Header from '../components/Header';
import ExploreMenu from '../components/ExploreMenu';
import FoodDiplay from '../components/FoodDiplay';
import Footer from '../components/Footer';
import DownloadApp from '../components/DownloadApp';

const Home = () => {
  const [category,setCategory]=useState("All")
 
  return (
    <div className="min-h-screen w-full bg-gray-100 pt-20"> {/* Add pt-20 to account for Navbar height */}
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDiplay  category={category}/>
      <DownloadApp/>
    </div>
  );
};

export default Home;