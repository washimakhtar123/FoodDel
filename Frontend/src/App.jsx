import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import Verify from "./pages/Verify";
import MyOrders from "./pages/MyOrders";

const App = () => {
  const [showLogin, setShowlogin] = useState(false);
  return (
    <div className="app">
      <ToastContainer/>
      {showLogin ? <Login setShowlogin={setShowlogin} /> : ""}
      <Navbar setShowlogin={setShowlogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/verify" element={<Verify/>} />
        <Route path="/myorders" element={<MyOrders/>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
