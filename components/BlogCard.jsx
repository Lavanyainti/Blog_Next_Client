import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { AuthContext } from '@/authUtility/AuthProvider';
import Moment from 'moment'

const BlogCard = ({blog}) => {
    const {_id, title, description, category, thumbnailImage, createdAt}=blog;
    const cleanDescription = description.replace(/<[^>]+>/g, ''); 
    const navigate=useRouter();
    const {user,saveUser}=useContext(AuthContext)

    

    const imageUrl = thumbnailImage;

    const handlClick=()=>{
       if(!user){
          toast.error("Please login to see the blog info")
          navigate.push('/login')
          return
        }
        navigate.push(`/blog/${_id}`)
    }

  return (
    <div onClick={handlClick} className="hover:cursor-pointer sm:w-72 w-50 text-sm sm:text-base sm:h-[400px] hover:scale-102 rounded-lg shadow-md hover:shadow-xl duration-300 overflow-scroll bg-white m-auto">
       <img src={imageUrl} alt="" className='aspect-video w-full h-44 '/>
       <span className='ml-5 mt-3 inline-block py-1 sm:py-2 px-3 bg-primary/40 rounded-full'>{category}</span>
       <p className="ml-5 mt-5 text-sm text-primary/80">Published {Moment(createdAt).fromNow()}</p>
       <div className='p-5'>
            <h5 className="mb-2 font-medium text-gray-900">{title}</h5>
            <p className="mb-3 text-x5 text-gray-600">{description}</p>
       </div>
    </div>
  )
}

export default BlogCard
