import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      setData(response.data.data || []);
      console.log("fetchOrders", response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="w-[90%] md:w-[80%] mx-auto mt-20">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        My Orders
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.length > 0 ? (
          data.map((order, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 min-h-[180px] flex flex-col justify-between hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <img
                  src={assets.parcel_icon}
                  alt="Parcel Icon"
                  className="w-16 h-16"
                />
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    {order.items.map((item, idx) => (
                      <span key={idx}>
                        {item.name} X {item.quantity}
                        {idx !== order.items.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                  <p className="text-sm text-gray-500">
                    Items: {order.items.length}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <p className="text-xl font-semibold text-green-600">
                  ${order.amount}.00
                </p>
                <p
                  className={`text-sm font-medium ${
                    order.status === "Delivered"
                      ? "text-green-500"
                      : "text-orange-500"
                  }`}
                >
                  <span className="text-lg">&#x25cf;</span> <b>{order.status}</b>
                </p>
                <button onClick={fetchOrders} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                  Track Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg">
            No orders found. Start shopping now!
          </p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
