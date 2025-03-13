import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const List = ({url}) => {
    
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setList(response.data.data); // Assuming the list is in response.data.data
            } else {
                toast.error("Error fetching food list");
            }
        } catch (error) {
            toast.error("Error fetching food list");
            console.error(error);
        }
    };

    const removeFood=async(foodId)=>{
        const response=await axios.post(`${url}/api/food/remove`,{id:foodId})
        await fetchList();
        if(response.data.success){
            toast.success(response.data.message)
        }
        else{
           toast.error("Error") 
        }
    }

    useEffect(() => {
        fetchList();
    }, []); // Empty dependency array to fetch data only once

    return (
        <div className="p-6">
            <p className="text-2xl font-semibold mb-4">All Food List</p>
            <div className="overflow-x-auto">
                <div className="grid grid-cols-5 gap-4 font-bold border-b-2 border-gray-300 pb-2">
                    <span>Image</span>
                    <span>Name</span>
                    <span>Category</span>
                    <span>Price</span>
                    <span>Actions</span>
                </div>
                {list.map((item, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 items-center border-b-2 border-gray-200 py-4">
                        <img src={`${url}/images/${item.image}`} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>${item.price}</p>
                        <button onClick={()=>removeFood(item._id)} className="text-red-500 hover:text-red-700">X</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;