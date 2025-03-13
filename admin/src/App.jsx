import React from 'react';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Order from './pages/Order';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
   const url="http://localhost:3000"
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <ToastContainer/>
      <Navbar />
      <hr className="px-1 w-full border-t-2 border-red-500 h-1" />
      <div className="flex flex-row ">
        <SideBar />
        <div className="flex-1 p-6 bg-gray-100">
          <Routes>
            <Route path='/add' element={<Add url={url} />} />
            <Route path='/list' element={<List url={url} />} />
            <Route path='/order' element={<Order  url={url}/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
