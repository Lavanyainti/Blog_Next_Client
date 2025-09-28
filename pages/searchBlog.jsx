import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axiosInstance from "@/Middleware/Middleware";

const SearchBlog = () => {
  const router = useRouter();
  const { query } = router.query; // query param from URL
  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);

  console.log(query)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await axiosInstance().get("/getBlog");
        const blogData = fetchedBlogs.data.userBlogs || [];
        console.log(blogData)
        setBlogs(blogData);

        if (query) {
          const results = blogData.filter(
            (blog) =>
              blog.title?.toLowerCase().includes(query.toLowerCase()) ||
              blog.description?.toLowerCase().includes(query.toLowerCase())
          );
          setFiltered(results);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, [query]);

  return (
    <div className="mx-8 sm:mx-24 mt-10">
      <h2 className="text-2xl font-bold mb-10">
        Results for: <span className="text-primary">"{query}"</span>
      </h2>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((blog) => {
            const imageUrl = blog.thumbnailImage;
            return (
              <div
                key={blog._id}
                className="w-72 hover:scale-105 rounded-lg shadow-md hover:shadow-xl duration-300 overflow-hidden bg-white"
              >
                <img src={imageUrl} alt="Blog" className="aspect-video w-full " />
                <span className="ml-5 mt-3 inline-block py-1 sm:py-2 px-3 bg-primary/40 rounded-full">
                  {blog.category}
                </span>
                <div className="p-5 h-30 overflow-y-auto">
                  <h5 className="mb-2 font-medium text-gray-900">{blog.title}</h5>
                  <p className="mb-3 text-sm text-gray-600">{blog.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">No blogs found.</p>
      )}
    </div>
  );
};

export default SearchBlog;
