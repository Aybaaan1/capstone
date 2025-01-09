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

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError("Password too weak");
      return;
    }

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
    <div className="container">
      <h1 className="text-3xl font-semibold mb-8 text-center">
        Student Registration
      </h1>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {success && <p className="text-green-600 text-center mb-4">{success}</p>}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg border border-gray-200"
      >
        <div className="space-y-6">
          <div className="flex justify-between">
            <div className="w-full mr-3">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[rgb(255,211,70)]"
              />
            </div>
            <div className="w-full ml-3">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Student ID Number:
              </label>
              <input
                type="text"
                name="idnumber"
                value={formData.idnumber}
                onChange={handleChange}
                placeholder="Enter your student ID"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[rgb(255,211,70)]"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="w-full mr-3">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Firstname:
              </label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[rgb(255,211,70)]"
              />
            </div>
            <div className="w-full ml-3">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Lastname:
              </label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[rgb(255,211,70)]"
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Program:
            </label>
            <select
              name="program"
              value={formData.program}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[rgb(255,211,70)]"
            >
              <option value="">Select your program</option>
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

          <div className="flex justify-between">
            <div className="w-full mr-3">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[rgb(255,211,70)]"
              />
            </div>
            <div className="w-full ml-3">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Confirm Password:
              </label>
              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[rgb(255,211,70)]"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-[rgb(255,211,70)] text-gray-900 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[rgb(255,211,70)]"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
