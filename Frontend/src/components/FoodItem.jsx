import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";

const FoodItem = ({ id, name, category, description, image, price }) => {
    const{ cartItems,addToCart,removeFromCart,url}=useContext(StoreContext)


    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden transition-transform transform hover:scale-105 w-64">
            {/* Image Wrapper */}
            <div className="relative">
                <img className="w-full h-36 object-cover" src={url+"/images/"+image} alt={name} />
                
                {/* Item Count Button - Positioned at Bottom Right */}
                {!cartItems[id]? (
                    <img 
                        onClick={() => addToCart(id)}
                        src={assets.add_icon_white}
                        alt="Add"
                        className="absolute bottom-2 right-2 w-7 h-7 bg-white p-1 rounded-full cursor-pointer shadow-md hover:bg-blue-600 transition"
                    />
                ) : (
                    <div className="absolute bottom-2 right-2 flex items-center bg-white rounded-full shadow-md px-1 py-0.5">
                        <img 
                            onClick={() => removeFromCart(id)}
                            src={assets.remove_icon_red}
                            alt="Remove"
                            className="w-5 h-5 cursor-pointer hover:opacity-80 transition"
                        />
                        <p className="mx-1 text-sm font-semibold text-gray-800">{cartItems[id]}</p>
                        <img 
                           onClick={() => addToCart(id)}
                            src={assets.add_icon_green}
                            alt="Add"
                            className="w-5 h-5 cursor-pointer hover:opacity-80 transition"
                        />
                    </div>
                )}
            </div>

            {/* Food Details */}
            <div className="p-3">
                <div className="flex justify-between items-center">
                    <h3 className="text-md font-semibold text-gray-900">{name}</h3>
                    <img className="h-4" src={assets.rating_starts} alt="Rating" />
                </div>
                <p className="text-gray-500 text-xs">{category}</p>
                <p className="text-gray-700 mt-1 text-xs truncate">{description}</p>
                
                <div className="flex justify-between items-center mt-3">
                    <span className="text-lg font-bold text-yellow-400">${price}</span>
                    <button className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-600 transition">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodItem;
