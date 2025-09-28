import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { AiFillDashboard, AiOutlinePlusCircle, AiOutlineFileText, AiOutlineComment } from "react-icons/ai";
import { FaUsers ,FaUserCog} from 'react-icons/fa';
import Link from 'next/link'
import axios from 'axios';

import { useEffect } from 'react';

import toast from 'react-hot-toast';
import axiosInstance from '@/Middleware/Middleware';
import DashboardContet from '@/components/DashboardContent';
import AddBlog from '@/components/AddBlog';
import Profile from '@/components/Profile';
import AllBlogs from '@/components/AllBlogs';
import Comments from '@/components/Comments';
import ViewProfile from '@/components/ViewProfile';
import BlogUsers from '@/components/BlogUsers';
import { useRouter } from 'next/router';

const dashboard = ({ initialBlogs, initialComments ,initialProfile,blogUsers}) => {
  const [activeSection, setActiveSection]=useState("dashboard");
  const [profileData,setProfileData]=useState(initialProfile)
  const [hasProfile, setHasProfile]=useState(!!initialProfile);
  const router=useRouter()
  // useEffect(()=>{
  //         const fetchProfile=async()=>{
  //               try{
  //                   const profileResult=await axiosInstance().get('/getProfile')
  //                   if(profileResult.status===200){
  //                         console.log(profileResult)
  //                         setHasProfile(true)
  //                         setProfileData(profileResult.data.getProfileResult)
  //                   }
  //               }catch(err){
  //                 toast.error("Failed to get profile")
  //               }
  //         }
  //       fetchProfile();
  // },[])
  const renderSection=()=>{
        switch(activeSection){
            case "dashboard":
              return <DashboardContet initialBlogs={initialBlogs} initialComments={initialComments}/>;
            case "addblog":
              return hasProfile ? <AddBlog/> : <Profile initialProfile={initialProfile}/>
            case "allblogs":
              return <AllBlogs initialBlogs={initialBlogs}/>
            case "comments":
              return <Comments initialComments={initialComments}/>
            case "profile":
              return hasProfile ? <ViewProfile profileData={initialProfile} initialBlogs={initialBlogs}/> : <Profile/>
            case "allusers":
              return <BlogUsers blogUsers={blogUsers}/>
        }
  }

  
  return (
    <div>
      <div className="flex flex-row">
        <div className=" flex flex-col w-30  text-sm sm:text-base  sm:w-50 sm:h-165 h-screen bg-white  bgShadow rounded">
                {/*<AiFillDashboard size={20} /> <span>Dashboard</span>
                <AiOutlinePlusCircle size={20} /> <span>Add Blog</span>
                <AiOutlineFileText size={20} /> <span>All Blogs</span>
                <AiOutlineComment size={20} /> <span>Comments</span>*/}
                <p onClick={()=>setActiveSection("dashboard")} className='hover:cursor-pointer'> <span className={`flex sm:gap-5 gap-2 text-primary/60 hover:text-primary px-2 py-4 mt-8 ${activeSection==='dashboard' ? ' text-primary/100 bg-primary/8 w-full rounded bgShadow3 ':""}`}> <AiFillDashboard size={20} /><span>Dashboard</span></span> </p>
                <p  onClick={()=>setActiveSection("addblog")} className='hover:cursor-pointer'> <span className={`flex sm:gap-5 gap-2 text-primary/60 hover:text-primary px-2  py-4 ${activeSection==='addblog' ? 'text-primary/100 bg-primary/8 w-full rounded bgShadow3 ':""}`}> <AiOutlinePlusCircle size={20} /> <span>Add Blog</span></span> </p>
                <p href={'/dashboard'} onClick={()=>setActiveSection("allblogs")} className='hover:cursor-pointer'> <span className={`flex sm:gap-5 gap-2 text-primary/60 hover:text-primary px-2 py-4  ${activeSection==='allblogs' ? 'text-primary/100 bg-primary/8 w-full rounded bgShadow3 ':""}`}> <AiOutlineFileText size={20} /> <span>All Blogs</span></span> </p>
                <p href={'/dashboard'} onClick={()=>setActiveSection("comments")} className='hover:cursor-pointer'> <span className={`flex sm:gap-5 gap-2 text-primary/60 hover:text-primary px-2 py-4  ${activeSection==='comments' ? 'text-primary/100 bg-primary/8 w-full rounded bgShadow3 ':""}`}> <AiOutlineComment size={20} /> <span>Comments</span></span> </p>
                <p href={'/dashboard'} onClick={()=>setActiveSection("profile")} className='hover:cursor-pointer'> <span className={`flex sm:gap-5 gap-2 text-primary/60 hover:text-primary px-2 py-4  ${activeSection==='profile' ? 'text-primary/100 bg-primary/8 w-full rounded bgShadow3 ':""}`}> <FaUserCog size={20} /> <span>Profile</span></span> </p>
                <p href={'/dashboard'} onClick={()=>setActiveSection("allusers")} className='hover:cursor-pointer'> <span className={`flex sm:gap-5 gap-2 text-primary/60 hover:text-primary px-2 py-4  ${activeSection==='allusers' ? 'text-primary/100 bg-primary/8 w-full rounded bgShadow3 ':""}`}> <FaUsers size={20} /> <span>All Users</span></span> </p>
        </div>
        <div className="  w-full bg-primary/10 sm:h-165 h-screen overflow-y-auto">
                 {renderSection()}
        </div>
      </div>
    </div>
  )
}

// export async function getServerSideProps(context) {
//   console.log("==========================getServerSideProps=========================")
//   try {
//     const cookies = context.req.headers.cookie || ""; // all cookies as string
//     console.log(cookies)

//     const axiosSSR = axios.create({
//       baseURL: "https://blog-next-server-5nzm.onrender.com/api",
//       headers: {
//         Cookie: cookies, // send cookies to backend
//       },
//       withCredentials: true,
//     });

//     const [blogsRes, commentsRes,profileRes,blogUserRes] = await Promise.all([
//       axiosSSR.get('/getBlogByUser'),
//       axiosSSR.get('/getCommentByUser'),
//       axiosSSR.get('/getProfile'),
//       axiosSSR.get('/getUsers')
//     ]);
//     console.log("=======================================================")
//     console.log(blogsRes)
//     return {
//       props: {
//         initialBlogs: blogsRes.data?.userBlogs || [],
//         initialComments: commentsRes.data?.getCommentsByUserResult || [],
//         initialProfile:profileRes.data?.getProfileResult || [],
//         blogUsers:blogUserRes.data?.getUsersResult || [],
//       },
//     };
//   } catch (err) {
//     console.error("SSR fetch error:", err.message);

//     if (err.response?.status === 401) {
//       return {
//         redirect: { destination: "/login", permanent: false },
//       };
//     }

//     return { props: { initialBlogs: [], initialComments: [] } };
//   }
// }

export async function getServerSideProps(context) {
  try {
    const protocol = context.req.headers['x-forwarded-proto'] || 'https';
    const host = context.req.headers.host;
    const baseURL = `${protocol}://${host}/api/proxy`;

    const [blogsRes, commentsRes, profileRes, blogUserRes] = await Promise.all([
      axios.get(`${baseURL}/getBlogByUser`, { headers: { cookie: context.req.headers.cookie || "" } }),
      axios.get(`${baseURL}/getCommentByUser`, { headers: { cookie: context.req.headers.cookie || "" } }),
      axios.get(`${baseURL}/getProfile`, { headers: { cookie: context.req.headers.cookie || "" } }),
      axios.get(`${baseURL}/getUsers`, { headers: { cookie: context.req.headers.cookie || "" } }),
    ]);

    return {
      props: {
        initialBlogs: blogsRes.data?.userBlogs || [],
        initialComments: commentsRes.data?.getCommentsByUserResult || [],
        initialProfile: profileRes.data?.getProfileResult || [],
        blogUsers: blogUserRes.data?.getUsersResult || [],
      },
    };
  } catch (err) {
    console.error("SSR fetch error:", err.message);

    if (err.response?.status === 401) {
      return {
        redirect: { destination: "/login", permanent: false },
      };
    }

    return { props: { initialBlogs: [], initialComments: [], initialProfile: [], blogUsers: [] } };
  }
}


export default dashboard
