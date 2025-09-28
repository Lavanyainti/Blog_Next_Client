// import { getUser } from "@/Utility/getUser";
// import axios from "axios";


// const axiosInstance=()=>{
//     const user=getUser();
//     const token=user?.token;

//     return axios.create({
//          baseURL: "http://localhost:5001/api",
//         headers: {
//         Authorization: `Bearer ${token}`
//         }
//     })
// }
// export default axiosInstance;

import axios from "axios";

const axiosInstance =()=> {
   return axios.create({
  baseURL: "https://blog-next-server-5nzm.onrender.com/api",
  withCredentials: true, // important: send cookies automatically
});
}

export default axiosInstance;
