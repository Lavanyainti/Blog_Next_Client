import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import axiosInstance from '@/Middleware/Middleware';
import axios from 'axios';

const userProfile = ({userBlogsRes=[],userProfileRes=[]}) => {
  
  const [userProfile, setUserProfile] = useState(userProfileRes);
  const [userBlogs, setUserBlogs] = useState(userBlogsRes);
  const router=useRouter();
  const { id } = router.query;
  console.log(id)

//   useEffect(() => {
//     if (!id) return;
//     const getProfile = async () => {
//       try {
//         const getProfileResult = await axiosInstance().get(`/getProfileByUserToUser/${id}`);
//         console.log(getProfileResult)
//         if (getProfileResult.status===200) {
//           setUserProfile(getProfileResult.data.getUsersResult[0]);
//         }
//       } catch(err) {
//     // If backend sent a message
//     if (err.response && err.response.data && err.response.data.message) {
//         toast.error(err.response.data.message)
//     } else {
//         // Fallback: generic error message
//         toast.error(err.message)
//     }
// }
//     };

//     const getBlogs = async () => {
//       try {
//         const getBlogsResult = await axiosInstance().get(`/getBlogByUserToUser/${id}`);
//         console.log(getBlogsResult)
//         if (getBlogsResult.status === 200) {
//           setUserBlogs(getBlogsResult.data.getBlogByUserToUserResult);
//         }
//       } catch(err) {
//     // If backend sent a message
//     if (err.response && err.response.data && err.response.data.message) {
//         toast.error(err.response.data.message)
//     } else {
//         // Fallback: generic error message
//         toast.error(err.message)
//     }
// }
//     };

//     getProfile();
//     getBlogs();
//   }, [id]);

  return (
    <div className="p-5 flex flex-col items-center justify-center gap-4">
      {userProfile ? (
        <>
          <div>
            <img
              src={
                userProfile.profileImage
                  ? userProfile.profileImage
                  : "/user_icon.svg"
              }
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-bold text-primary">{userProfile.userID}</h1>
          <p className="text-lg text-primary font-medium">{userProfile.userName}</p>
          <p className="text-primary/80 text-center max-w-md">{userProfile.profileDesciption}</p>
        </>
      ) : (
        <p className="text-primary">Loading profile...</p>
      )}

     {
         <div className="flex flex-wrap justify-center gap-6 mt-8">
      {userBlogs.length === 0 ? (
        <p className="text-gray-500">No blogs found.</p>
      ) : (
        userBlogs.map((blog) => {
          const imageUrl2 = blog.thumbnailImage;
          return (
            <div key={blog._id} onClick={()=>{router.push(`/blog/${blog._id}`)}} className="w-72 hover:scale-105 rounded-lg shadow-md hover:shadow-xl duration-300 overflow-hidden bg-white hover:cursor-pointer">{/*we fixed that path in app.jsx */}
              <img src={imageUrl2} alt="" className='w-full h-30'/>
              <span className="ml-2 mt-3 inline-block text-primary sm:py-2 px-3 font-semibold  rounded-full">{blog.category}</span>
              <div className="px-5">
                <h5 className="mb-2 font-medium text-gray-900">{blog.title}</h5>
                <p className="mb-3 text-sm text-gray-600">{blog.description}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
     }
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  console.log("===========================userProfile===========================");
  console.log(id)
  const cookies = context.req.headers.cookie || "";

  const axiosSSR = axios.create({
    baseURL: "https://blog-next-server-5nzm.onrender.com/api",
    headers: { Cookie: cookies },
    withCredentials: true,
  });

  try {
    const [userBlogs, userProfiles] = await Promise.all([
      axiosSSR.get(`/getBlogByUserToUser/${id}`),
      axiosSSR.get(`/getProfileByUserToUser/${id}`),
    ]);

    return {
      props: {
        userBlogsRes: userBlogs.data.getBlogByUserToUserResult || [],
        userProfileRes: userProfiles.data.getUsersResult[0] || null,
      },
    };
  } catch (err) {
    return {
      props: {
        userBlogsRes: [],
        userProfileRes: null,
      },
    };
  }
}


export default userProfile;
