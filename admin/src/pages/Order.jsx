import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.data) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("An error occurred while fetching orders");
    }
  };

  const statusHandler=async (event,orderId)=>{
    const response=await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if(response.data.success){
     await  fetchAllOrders()
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="p-6 min-h-screen overflow-auto">
      <h3 className="text-3xl font-bold mb-6 ">Order Page</h3>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div key={index} className="w-full h-[150px] bg-white rounded-lg shadow-lg p-6 flex items-center space-x-6">
            <img src={assets.parcel_icon} alt="Parcel Icon" className="w-20 h-20" />
            <div className="flex-1">
              <p className="text-lg font-semibold">
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}
                    {idx !== order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <p className="text-gray-700 mt-2">
                {order.address.firstname} {order.address.lastname}
              </p>
              <div className="text-gray-600 mt-2">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                </p>
              </div>
              <p className="text-gray-700 mt-2">{order.address.phone}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">${order.amount}</p>
              <p className="text-gray-600">{order.items.length} items</p>
              <select onChange={(event)=>statusHandler(event,order._id)}
              value={order.status}
               className="mt-4 p-2 border rounded-lg">
                <option value="Food Processing">Food Processing</option>
                <option value="Out Of Delivery">Out Of Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;