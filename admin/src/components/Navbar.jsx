import React from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-white p-4 shadow-lg">
      <img src={assets.logo} alt="Logo" className="h-14" />
      <img src={assets.profile_image} alt="Profile" className="w-14 h-14 rounded-full border-2 border-white" />
    </div>
  )
}

export default Navbar
