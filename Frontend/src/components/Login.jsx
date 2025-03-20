import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios'
import {  toast } from 'react-toastify';

const Login = ({ setShowlogin }) => {
  const {url,setToken}=useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data,setData]=useState({
    name:"",
    email:"",
    password:""
  })
 
  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))

  }

  const onLogin=async(event)=>{
    event.preventDefault();
    let newUrl=url;
    if(currState==="Login"){
      newUrl+="/api/user/login"
    }else{
      newUrl+="/api/user/register"
    }
    const response=await axios.post(newUrl,data);
    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token);
      toast.success(response.data.message)
      setShowlogin(false)
    }else{
      toast.success(response.data.message)
      alert(response.data.message)
    }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-11/12 sm:w-96 p-6 rounded-lg shadow-lg relative animate-fadeIn">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-2xl font-semibold">{currState}</h2>
          <img 
            onClick={() => setShowlogin(false)} 
            src={assets.cross_icon} 
            alt="Close" 
            className="w-6 h-6 cursor-pointer hover:opacity-70 transition"
          />
        </div>

        {/* Form Fields */}
        <form onSubmit={onLogin} className="mt-4 flex flex-col space-y-4">
          {currState === "Sign Up" && (
            <input name='name' onChange={onChangeHandler} value={data.name}
              type="text" 
              placeholder="Your Name" 
              required 
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          )}
          <input  name='email' onChange={onChangeHandler} value={data.email}
            type="email" 
            placeholder="Your Email" 
            required 
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input name='password' onChange={onChangeHandler} value={data.password}
            type="password" 
            placeholder="Password" 
            required 
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          {/* Terms & Conditions Checkbox */}
          <div className="flex items-center text-sm text-gray-600">
            <input type="checkbox" required className="mr-2" />
            <p>By continuing, I agree to the <span className="text-orange-500 font-medium">Terms of Use & Privacy Policy</span></p>
          </div>

          {/* Submit Button */}
          <button type='submit' className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition">
            {currState === "Sign Up" ? "Create Account" : "Login"}
          </button>
        </form>

        {/* Toggle Between Login & Sign Up */}
        <p className="mt-4 text-center text-gray-600">
          {currState === "Login" ? "Create a new account?" : "Already have an account?"}
          <span 
            className="text-orange-500 cursor-pointer font-medium ml-1 hover:underline"
            onClick={() => setCurrState(currState === "Login" ? "Sign Up" : "Login")}
          >
            {currState === "Login" ? "Click here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
