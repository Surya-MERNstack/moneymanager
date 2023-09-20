import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
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

    if (formData.email === "" || formData.password === "") {
      toast.error("Fill in all required fields", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://moneymanager-acen.onrender.com/api/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.data.status === 401) {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else if (response.data.status === 402) {
        toast.error("Password is wrong", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          theme : "dark"
        });
        setFormData({
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/expense");
        }, 3000);
      }
    } catch (err) {
       if(err.response && err.response.status == 401) {
        toast.error("Email not found, Register first!!!", {
          position: toast.POSITION.TOP_CENTER,
          theme : "dark"
        });
       }
      else if (err.response && err.response.status === 402) {
        toast.error("Password is wrong", {
          position: toast.POSITION.TOP_CENTER,
          theme : "dark"
        });
      } else {
        toast.error("Login failed, Try again!!", {
          position: toast.POSITION.TOP_CENTER,
          theme : "dark"
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-28 mb-4 w-96"
      >
        <h2 className="text-2xl font-semibold mb-4 text-indigo-500">
          Money Manager
        </h2>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <div className="text-center">
          <button
            className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/register" className="text-indigo-500 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
