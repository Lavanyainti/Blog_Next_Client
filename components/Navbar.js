import React, { useContext, useEffect, useState } from 'react'
import { FaHome, FaSignInAlt, FaSignOutAlt,FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import { AiFillDashboard } from "react-icons/ai";
import { GiQuillInk } from "react-icons/gi";
import { MdArticle } from "react-icons/md";
import { AuthContext } from '@/authUtility/AuthProvider';



const Navbar = () => {
  const [isOpen, setIsOpen]=useState(false)//we are setting a state show hamberger menu symbols
  const router = useRouter();
  const {user,saveUser,logout}=useContext(AuthContext)
  
  return (
    <div className="flex justify-between  sm:mx-20 items-center   p-4 text-primary">{/*we use tailwind classes bg-primary here primary is utility class from index.css */}
      <div className='flex gap-1 items-center text-xl hover:cursor-pointer' onClick={()=>router.push("/")}><GiQuillInk size={30} className='text-white bg-primary bgShadow rounded-lg p-1' />QucikBlogs</div>

      <div className="sm:hidden">{/* hidden on smaller screens */}
          <button onClick={()=>setIsOpen(!isOpen)}>
            {isOpen? <FaTimes size={20} className='text-red-500'/>:<FaBars size={20}/>}
          </button>{/*if isOpen false then three bars shown, if true cross mark shown */}
      </div>
      <div         className={`
          flex-col sm:flex sm:flex-row sm:gap-5 gap-5
          absolute sm:static top-16 right-0 h-auto sm:h-auto sm:w-auto
          bg-white sm:bg-transparent p-4 sm:p-0 shadow-md sm:shadow-none

          /* Default for large screens (always visible) */
          sm:opacity-100 sm:translate-y-0 sm:pointer-events-auto sm:flex

          /* Animation only on mobile */
          transform transition-all duration-300 ease-in-out
          ${isOpen ? "opacity-100 translate-y-0 flex" : "opacity-0 -translate-y-5 pointer-events-none"}
        `}

      >
        {!user ? (
          <>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-white text-primary hover:scale-102 border border-primary rounded-full transition-all duration-300 ease-in-out"
              onClick={() => {
                router.push("/");
                setIsOpen(false);
              }}
            >
              <FaHome size={20} /> Home
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-white text-primary hover:scale-102 border border-primary rounded-full"
              onClick={() => {
                router.push("/register");
                setIsOpen(false);
              }}
            >
              <FaSignInAlt size={20} /> Register
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-white text-primary hover:scale-102 border border-primary rounded-full"
              onClick={() => {
                router.push("/login")
                setIsOpen(false);
              }}
            >
              <FaSignInAlt size={20} /> Login
            </button>
          </>
        ) : (
          <>
            <button
              className="flex items-center gap-2 px-4 py-1  bg-white text-primary hover:scale-102 border border-primary rounded-full"
              onClick={() => {
                router.push('/');
                setIsOpen(false);
              }}
            >
              <FaHome size={20} /> Home
            </button>
            <button
              className="flex items-center gap-2 px-4 py-1 bg-white text-primary hover:scale-102 border border-primary rounded-full"
              onClick={() => {
                router.push("/dashboard");
                setIsOpen(false);
              }}
            >
              <AiFillDashboard size={20} /> Dashboard
            </button>
            <button
              className="flex items-center gap-2 px-4 py-1 bg-white text-primary hover:scale-102 border border-primary rounded-full"
              onClick={logout}
            >
              <FaSignOutAlt size={20} /> LogOut
            </button>
          </>
        )}
      </div>
    </div> 
  )
}

export default Navbar
