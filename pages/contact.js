import React, { useState } from "react";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [responseMsg, setResponseMsg] = useState("");

  const validate = () => {
    let errs = {};
    if (!form.name.trim()) errs.name = "Please enter your name";
    if (!form.email.trim()) {
      errs.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email";
    }
    if (!form.message.trim()) errs.message = "Please enter a message";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      emailjs
        .send(
          "service_3r57y0n", // service ID
          "template_48qyzed", // template ID
          {
            from_name: form.name,
            user_email: form.email,
            message: form.message,
          },
          "-h7d-1QYZwY3xm2jZ" // add your public key
        )
        .then(() => {
            toast.success("Email sent")
          setResponseMsg("Email sent successfully!");
          setForm({ name: "", email: "", message: "" });
        })
        .catch(() => {
            toast.error("Failed")
          setResponseMsg("Failed to send the mail.");
        });
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center  mt-16">
        
         <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h1>
      <p className="text-gray-600 mb-10 sm:max-w-2xl text-center">
        Have questions, feedback, or just want to say hi?  
        Fill out the form below and we’ll get back to you soon.
      </p>
       <form id="contact-form" onSubmit={handleSubmit} className="space-y-4 max-w-lg flex flex-col items-center w-full">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full border border-gray-300  px-4 py-2 rounded outline-none hover:ring-2 hover:ring-[#5044e5] text-primary/80 transition-all duration-200"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full border border-gray-300 px-4 py-2 rounded outline-none hover:ring-2 hover:ring-[#5044e5] text-primary/80 transition-all duration-200"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <textarea
        name="message"
        placeholder="Your Message"
        rows="5"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full border border-gray-300 px-4 py-2 rounded outline-none hover:ring-2 hover:ring-[#5044e5] text-primary/80 transition-all duration-200"
      />
      {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}

      <button type="submit" className="bg-primary text-white px-6 py-2 rounded ">
        Send
      </button>

      {responseMsg && <p className="mt-3 text-green-600">{responseMsg}</p>}
    </form>
    </div>
  );
};

export default Contact;
