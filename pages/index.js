import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import BlogList from "@/components/BlogList";
import Footer from "@/components/Footer";
import axios from "axios";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home({blogRes}) {
  return (
    <div>
      <Header/>
      <BlogList blogRes={blogRes}/>
      <Footer/>
    </div>
  );
}

export async function getStaticProps() {
  console.log("===========================================================")
  try{
   
     const axiosSSr=axios.create({
    baseURL:"http://localhost:5001/api"
  })

  const blogRes=await axiosSSr.get('/getBlog')

  return{
    props:{blogRes:blogRes.data?.userBlogs},
    revalidate: 60
  }

  }catch (err) {
  console.error("Error fetching blogs:", err.message);
  return {
    props: { blogRes: [] },
    revalidate: 60,
  }
  }
 
}