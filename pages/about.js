import React from "react";

const About = () => {
  return (
    <div className="mx-8 sm:mx-24 mt-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
      <p className="text-gray-600 leading-relaxed mb-6 sm:max-w-3xl">
        Welcome to <span className="text-primary font-semibold">Quick Blog</span>!  
        This platform is created for curious minds and passionate storytellers.  
        Whether you’re here to share knowledge, express creativity, or just read 
        what others have to say, this is your space.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Mission</h2>
      <p className="text-gray-600 leading-relaxed mb-6 sm:max-w-3xl">
        Our mission is simple: to empower individuals to write freely and connect 
        with like-minded readers. We believe everyone has a story worth sharing, 
        and we want to make it easier than ever to publish and discover ideas.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">What We Offer</h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>A platform to publish and manage your blogs</li>
        <li>Discover trending topics across multiple categories</li>
        <li>Engage with other writers and readers</li>
        <li>Simple, modern, and distraction-free design</li>
      </ul>
    </div>
  );
};

export default About;
