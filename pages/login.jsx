import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';

import axios from 'axios';
import { useRouter } from 'next/router';
import { AuthContext } from '@/authUtility/AuthProvider';

const login = () => {
  const router=useRouter()
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const {saveUser}=useContext(AuthContext)

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const userData={
      email:email,
      password:password
    } 
       
    try{
        const userLogin=await axios.post('https://blog-next-server-5nzm.onrender.com/api/login',userData,{ withCredentials: true });

console.log(userLogin.status)
        if(userLogin.status===200 || userLogin.status===201){
           toast.success("Login success");
            const finalData=userLogin.data.data;
            console.log(finalData)
            saveUser(finalData)
            
            return router.push('/dashboard')
        }
    }catch(err) {
    // If backend sent a message
    if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message)
    } else {
        // Fallback: generic error message
        toast.error(err.message)
    }
}
  }
  return (
    <div className='flex flex-col items-center justify-center mt-30  '>{/*h-screen in height to full screen */}
    <img src="/gradientBackground.png" className='absolute -top-50 -z-1 opacity-50' alt="" />
    <h1 className=' text-center font-semibold text-xl sm:text-4xl'>Sign in to your account</h1>
            <div className="border rounded-lg border-primary/10 p-10 max-w-sm sm:max-w-xl gap-2 bg-white mt-10  bgShadow">
                    <form className='flex flex-col ' onSubmit={handleSubmit}>
                        <p className='text-gray-700'>Username</p>
                        <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email Address' className='border border-primary/20 bg-primary-4 px-5 py-2 rounded sm:w-sm focus:outline-none' required/>
                        <p className='mt-4 text-gray-700'>Password</p>
                        <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Password' className='border border-primary/20 bg-primary-4 px-5 py-2 rounded focus:outline-none' required/>
                        <p className='text-primary text-right mt-5 hover:cursor-pointer' onClick={()=>{navigate('/register')}}>Not Registered Yet?</p>
                        <button type='submit'  className='border border-primary/20 bg-primary/90 hover:bg-primary px-5 py-1 text-white mt-5 rounded'>Sign In</button>
                    </form>
            </div>
    </div>
  )
}

export default login
