"use client";
import { useState } from "react";

const Registration = () => {
  const [formData, setFormData] = useState({
    email: "",
    idnumber: "",
    firstname: "",
    lastname: "",
    program: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration successful!");
        setError("");
      } else {
        setError(data.message || "An error occurred during registration");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      {" "}
      {/* Outer div, use bg-transparent to see the background */}
      <h1 className="text-2xl font-bold mb-6 text-center">Registration</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-full max-w-3xl bg-white p-8 rounded-lg shadow-md border border-gray-300"
      >
        {" "}
        {/* Form has white background */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Student ID Number:
            </label>
            <input
              type="text"
              name="idnumber"
              value={formData.idnumber}
              onChange={handleChange}
              placeholder="Enter your student ID number"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Firstname:
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Lastname:
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold mb-1">
              Program:
            </label>
            <select
              name="program"
              value={formData.program}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a program</option>
              <option value="BEED">BEED</option>
              <option value="BTLED">BTLED</option>
              <option value="BSED-MATH">BSED-MATH</option>
              <option value="BIT">BIT</option>
              <option value="BSIT">BSIT</option>
              <option value="BSIE">BSIE</option>
              <option value="BAEL">BAEL</option>
              <option value="BALIT">BALIT</option>
              <option value="BSP">BSP</option>
              <option value="BSF">BSF</option>
              <option value="BSA">BSA</option>
              <option value="BSES">BSES</option>
              <option value="BSHM">BSHM</option>
              <option value="BSTM">BSTM</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Registration;
