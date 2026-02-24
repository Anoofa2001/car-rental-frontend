import React, { useState } from "react";

const Login = ({ setShowLogin }) => {
  const [state, setState] = useState("login");

  const [formData, setFormData] =useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl px-8 py-10"
      >
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
        <button
          type="submit"
          className="mt-6 w-full h-12 rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition font-medium shadow-md"
        >
          {state === "login" ? "Login" : "Create Account"}
        </button>

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
      </form>
    </div>
  );
};

export default Login;