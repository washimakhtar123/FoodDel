import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { food_list, cartItems, removeFromCart, getTotalCardAmount,url } = useContext(StoreContext);
  const Navigate=useNavigate();

  const subtotal = getTotalCardAmount();
  const deliveryFee = subtotal > 0 ? 10 : 0; // Applies only if cart has items
  const total = subtotal + deliveryFee;

  return (
    <div className="w-[90%] md:w-[80%] mx-auto mt-20">
      <h2 className="text-2xl font-semibold mb-6 text-center">🛒 Your Cart</h2>

      {/* Cart Items List */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between font-semibold border-b pb-3 text-gray-600">
          <p className="w-1/6">Item</p>
          <p className="w-1/6">Title</p>
          <p className="w-1/6">Price</p>
          <p className="w-1/6">Quantity</p>
          <p className="w-1/6">Total</p>
          <p className="w-1/6">Remove</p>
        </div>

        {/* Cart Items */}
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div 
                key={index} 
                className="flex flex-col sm:flex-row justify-between items-center py-4 border-b last:border-none"
              >
                {/* Item Image & Name */}
                <div className="flex items-center space-x-4 w-1/6">
                  <img src={url+"/images/"+item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  <p className="font-medium">{item.name}</p>
                </div>

                {/* Price */}
                <p className="text-gray-600 w-1/6">${item.price}</p>

                {/* Quantity */}
                <p className="font-medium w-1/6">{cartItems[item._id]}</p>

                {/* Total Price */}
                <p className="text-green-600 font-semibold w-1/6">
                  ${item.price * cartItems[item._id]}
                </p>

                {/* Remove Button */}
                <button 
                  onClick={() => removeFromCart(item._id)} 
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition w-1/6"
                >
                  Remove Item
                </button>
              </div>
            );
          }
        })}

        {/* Empty Cart Message */}
        {Object.values(cartItems).every((qty) => qty === 0) && (
          <p className="text-center text-gray-500 text-lg mt-6">Your cart is empty 🛒</p>
        )}
      </div>

      {/* Cart Totals Section */}
      <div className="flex flex-col md:flex-row justify-between items-start mt-10">
        {/* Total Summary */}
        <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
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

          <button 
          onClick={()=>Navigate('/place-order')} 
            disabled={subtotal === 0} 
            className={`w-full mt-6 py-3 rounded-md font-semibold transition 
              ${subtotal > 0 ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* Promo Code Section */}
        <div className="w-full md:w-1/3 mt-6 md:mt-0 bg-white p-6 rounded-lg shadow-md">
          <p className="font-medium text-gray-600 mb-4">If you have a promo code, enter it here</p>
          <div className="flex">
            <input 
              type="text" 
              placeholder="Promo Code" 
              className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-r-md transition">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
