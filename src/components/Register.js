import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      toast.error("Fill in all required fields", {
        position: toast.POSITION.TOP_CENTER,
        theme : "dark"
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://moneymanager-acen.onrender.com/api/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.status === 401) {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          theme : "dark"
        });
      }

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Email already registered", {
          position: toast.POSITION.TOP_CENTER,
          theme: "dark",
        });
      } else {
        toast.error("Registration failed. Please try again.", {
          position: toast.POSITION.TOP_CENTER,
          theme: "dark",
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-15 mt-28 w-96 z-40"
      >
        <h2 className="text-2xl font-semibold mb-4 text-indigo-500">
          Money Manager
        </h2>
        <div className="mb-2">
          <label className="block text-gray-700 font-bold mb-2">UserName</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-gray-700">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
