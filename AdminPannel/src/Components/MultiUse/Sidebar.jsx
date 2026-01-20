// import React from 'react'
import { NavLink } from "react-router-dom"
import { assets } from "../../assets/assets"

const Sidebar = () => {
  return (
    <div className="w-[16%] min-h-screen border-r-2 border-gray-200">
        <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
            <NavLink to={"/add"} className="flex items-center gap-3 border border-gray-300 border-r-0 rounded-r-none px-3 py-2 rounded-lg ">
                <img className="w-5 h-5 rotate-45" src={assets.CrossLogo} alt="" />
                <p className="hidden md:block">Add Items</p>
            </NavLink>
            <NavLink to={"/list"} className="flex items-center gap-3 border border-gray-300 border-r-0 rounded-r-none px-3 py-2 rounded-lg ">
                <img className="w-5 h-5 rotate-45" src={assets.CrossLogo} alt="" />
                <p className="hidden md:block">List Items</p>
            </NavLink>
            <NavLink to={"/addService"} className="flex items-center gap-3 border border-gray-300 border-r-0 rounded-r-none px-3 py-2 rounded-lg ">
                <img className="w-5 h-5 rotate-45" src={assets.CrossLogo} alt="" />
                <p className="hidden md:block">Add Service</p>
            </NavLink>
            <NavLink to={"/listService"} className="flex items-center gap-3 border border-gray-300 border-r-0 rounded-r-none px-3 py-2 rounded-lg ">
                <img className="w-5 h-5 rotate-45" src={assets.CrossLogo} alt="" />
                <p className="hidden md:block">List Service</p>
            </NavLink>
            <NavLink to={"/orders"} className="flex items-center gap-3 border border-gray-300 border-r-0 rounded-r-none px-3 py-2 rounded-lg ">
                <img className="w-5 h-5 rotate-45" src={assets.CrossLogo} alt="" />
                <p className="hidden md:block">Orders</p>
            </NavLink>
        </div>
        
    </div>
  )
}

export default Sidebar