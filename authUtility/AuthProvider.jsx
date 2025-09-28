import axios from 'axios';
import { useRouter } from 'next/router';
import React, {  createContext, useContext, useEffect, useState } from 'react'

 export const AuthContext=createContext()/* Why export const AuthContext = createContext(); ?
                  Because other components need to access the context.
                  Example:
                  In AuthProvider we wrap the app and provide data.
                  In Login, NavBar, Dashboard etc. we want to consume that data.
                  To consume, we need the same AuthContext object.
                  import { AuthContext } from "../context/AuthProvider";
                  const { user, logout } = useContext(AuthContext); Also we should declare outside of the AuthProvider only.
                  If we declare it inside of the AuthProvider it will created everytime on every re-render*/

const AuthProvider = ({children}) => {
  const router=useRouter()
    const [user, setUser]=useState(null)

    useEffect(()=>{
      const storedUser=localStorage.getItem("userData");
      if(storedUser){
        setUser(JSON.parse(storedUser))
      }

    },[])

    const saveUser=(userData)=>{
      setUser(userData);
        localStorage.setItem("userData",JSON.stringify(userData))
    }

    const logout=async()=>{
     try{
       const logoutResult=await axios.delete("http://localhost:5001/api/removeUser",{withCredentials:true})
      if(logoutResult.status===200){
        setUser(null)
        localStorage.removeItem("userData")
        router.push('/login')
      }
     }catch(err){
      console.log("logout failed",err)
     }
    }

    useEffect(()=>{
      const isTokeExpired=async ()=>{
          try{
            const tokenExpiry=await axios.get('http://localhost:5001/api/checkExpiry',{withCredentials:true})
            if(tokenExpiry.status===200){
              console.log("valid token")
            }

          }catch (err) {
                console.log(err)
                logout();
          }
        }
          isTokeExpired();
    },[])
  return (
    <AuthContext.Provider value={{user,saveUser,logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
