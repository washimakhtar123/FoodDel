import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import FoodItem from './FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    // Filtered food items based on category selection
    const filteredFood = food_list.filter(item => category === "All" || category === item.category);

    return (
        <div className="container w-[90%] md:w-[80%] mx-auto px-4 py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">🍽️ Top Dishes Near You</h2>
            
            {/* Responsive Grid Layout */}
            {filteredFood.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
                    {filteredFood.map((item, index) => (
                        <FoodItem
                            key={index}
                            id={item._id}
                            name={item.name}
                            category={item.category}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center text-lg text-gray-500 mt-6">No dishes available for this category. 🍔</p>
             )}
        </div>
    );
};

export default FoodDisplay;
