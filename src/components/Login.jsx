import React, { useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {

  const { showLogin, setShowLogin, axios, setToken, navigate } = useAppContext();

  const [state, setState] = useState("login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const { name, email, password } = formData;
      const { data } = await axios.post(`/api/user/${state}`, { name, email, password });

      if (data.success) {
        navigate("/");
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setShowLogin(false);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
    >
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl px-8 py-10"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          aria-label="Close login modal"
        >
          &times;
        </button>

        {/* Title */}
        <h1 className="text-gray-800 text-3xl font-semibold text-center">
          {state === "login" ? "Login" : "Sign Up"}
        </h1>

        <p className="text-gray-500 text-sm text-center mt-2">
          Please sign in to continue
        </p>

        {/* Name Field */}
        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-gray-50 border border-gray-200 h-12 rounded-full px-5 gap-3">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Email Field */}
        <div className="flex items-center mt-4 w-full bg-gray-50 border border-gray-200 h-12 rounded-full px-5 gap-3">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Field */}
        <div className="flex items-center mt-4 w-full bg-gray-50 border border-gray-200 h-12 rounded-full px-5 gap-3">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Forgot Password */}
        {state === "login" && (
          <div className="mt-4 text-right">
            <button
              type="button"
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>
        )}

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="mt-6 w-full h-12 rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition font-medium shadow-md"
        >
          {state === "login" ? "Login" : "Create Account"}
        </motion.button>

        {/* Toggle */}
        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-gray-500 text-sm mt-6 text-center cursor-pointer"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span className="text-indigo-600 hover:underline ml-1 font-medium">
            Click here
          </span>
        </p>
      </motion.form>
    </motion.div>
  );
};

export default Login;