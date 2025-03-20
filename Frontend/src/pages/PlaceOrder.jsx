import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCardAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const subtotal = getTotalCardAmount();
  const deliveryFee = subtotal > 0 ? 2 : 0; // Delivery fee applies only if subtotal > 0
  const total = subtotal + deliveryFee;

  const onChangeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const orderPlace = async (event) => {
    event.preventDefault();
    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] });
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: total,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const sessionUrl = response.data.session_url; // Fixed key name
        if (sessionUrl) {
          window.location.replace(sessionUrl);
        } else {
          alert("Error: Invalid payment session URL.");
        }
      } else {
        alert("Payment initiation failed. Please try again.");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("An error occurred while placing the order.");
    }
  };
const navigate=useNavigate()
  useEffect(()=>{
    if(!token){
      navigate("/cart")
    }else if(getTotalCardAmount()===0){
      {
        navigate("/cart")
      }
    }
  },[token])

  return (
    <form onSubmit={orderPlace} className="w-[90%] md:w-[80%] mx-auto mt-40 flex flex-col md:flex-row gap-10">
      {/* Left Section - Delivery Information */}
      <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Delivery Information</h2>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input required onChange={onChangeHandler} name="firstname" value={data.firstname} type="text" placeholder="First Name" className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <input required onChange={onChangeHandler} name="lastname" value={data.lastname} type="text" placeholder="Last Name" className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>

          <input required onChange={onChangeHandler} name="email" value={data.email} type="email" placeholder="Email Address" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
          <input required onChange={onChangeHandler} name="street" value={data.street} type="text" placeholder="Street Address" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />

          <div className="flex flex-col sm:flex-row gap-4">
            <input required onChange={onChangeHandler} name="city" value={data.city} type="text" placeholder="City" className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <input required onChange={onChangeHandler} name="state" value={data.state} type="text" placeholder="State" className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>

          <input required onChange={onChangeHandler} name="zipcode" value={data.zipcode} type="text" placeholder="Zip Code" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
          <input required onChange={onChangeHandler} name="country" value={data.country} type="text" placeholder="Country" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />

          <input required onChange={onChangeHandler} name="phone" value={data.phone} type="tel" placeholder="Phone Number" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
        </div>
      </div>

      {/* Right Section - Order Summary */}
      <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>

        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <p>Subtotal</p>
            <p className="font-semibold">${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p>Delivery Fee</p>
            <p className="font-semibold">${deliveryFee.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>

        <button type="submit" disabled={subtotal === 0} className="w-full mt-6 py-3 rounded-md font-semibold transition bg-orange-500 hover:bg-orange-600 text-white">
          PROCEED TO PAYMENT
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
