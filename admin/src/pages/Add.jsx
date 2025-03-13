import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios'
import { toast } from 'react-toastify';

const Add = ({url}) => {
    const [image,setImage]=useState(false);
    const [data,setData]=useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    })
    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }

   const onSubmitHandler=async (event)=>{
    event.preventDefault();
    const formData=new FormData();
    formData.append("name",data.name);
    formData.append("description",data.description);
    formData.append("price",Number(data.price));
    formData.append("category",data.category);
    formData.append("image",image);
    const response=await axios.post(`${url}/api/food/add`,formData)
    if(response.data.success){
        setData({
            name:"",
            description:"",
            price:"",
            category:"Salad"
        })
        setImage(false)
        toast.success(response.data.message)
    }else{
        toast.error(response.data.message)

    }
   }
  return (
    <div className="flex-1 p-3 bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-md h-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Add New Product</h1>
        <form onSubmit={onSubmitHandler} className="space-y-3 h-full">
          {/* Upload Image Section */}
          <div className="flex flex-col items-center">
            <p className="text-gray-700 ">Upload Image</p>
            <label htmlFor="image" className="cursor-pointer">
              <img
                src={image?URL.createObjectURL(image) :assets.upload_area}
                alt="Upload Area"
                className="w-24 h-24 object-cover border-2 border-gray-300 rounded-lg p-2 hover:scale-105 transition-transform duration-300"
              />
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
          </div>

          {/* Product Name Section */}
          <div>
            <p className="text-gray-700 ">Product Name</p>
            <input onChange={onChangeHandler} value={data.name}
              type="text"
              name="name"
              placeholder="Type here"
              className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Product Description Section */}
          <div>
            <p className="text-gray-700 mb-1">Product Description</p>
            <textarea  onChange={onChangeHandler} value={data.descriptionme}
              name="description"
              rows="3"
              placeholder="Write content here"
              className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            ></textarea>
          </div>

          {/* Product Category Section */}
          <div>
            <p className="text-gray-700">Product Category</p>
            <select  onChange={onChangeHandler} value={data.category}
              name="category"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          {/* Product Price Section */}
          <div>
            <p className="text-gray-700=">Product Price</p>
            <input  onChange={onChangeHandler} value={data.price}
              type="number"
              name="price"
              placeholder="$20"
              className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full  bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-all duration-300"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;