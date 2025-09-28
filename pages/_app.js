import "@/styles/globals.css";
import Navbar from "../components/Navbar"; // your Navbar component
import { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast'
import AuthProvider from "@/authUtility/AuthProvider";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  

  return (
    <AuthProvider>
      <Head>
        <title>Blog App</title> 
        <link rel="icon" href="/blogging.png" />
        <meta name="description" content="Best website ever!" />
      </Head>
      <Toaster position="top-center" />
      {/* Navbar visible on all pages */}
      <Navbar/>
      

      {/* Render the current page and pass userData */}
      <Component {...pageProps}  />
    </AuthProvider>
  );
}
