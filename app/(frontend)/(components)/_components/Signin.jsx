"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignIn = ({ switchToRegister, setIsOpen }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: session, status } = useSession(); // Use session hook to get session
  const router = useRouter();

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for sign-in
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Attempt login with credentials
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      // Check the result of the sign-in attempt
      if (result.error) {
        setError(result.error);
        setSuccess("");
        console.log("Login failed", result.error);
      } else {
        setSuccess("Login successful!");
        setError("");
        console.log("Login succeeded", result);

        // Close the modal after successful login
        setIsOpen(false); // Close modal if login is successful
      }
    } catch (error) {
      console.log("Error in handleSubmit:", error);
    }
  };

  // Wait until session data is loaded before performing the redirect
  useEffect(() => {
    if (status === "loading") return; // Don't do anything while loading

    if (session) {
      if (session.user?.role === "ADMIN") {
        router.push("/admin");
      } else if (session.user?.role === "STUDENT") {
        router.push("/");
      } else {
        router.push("/signin");
      }
    }
  }, [session, status, router]); // Re-run when session or status changes

  return (
    <div className="signin-container">
      <div className="bg-white w-full sm:w-80 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Sign In
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[rgb(255,211,70)] transition duration-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[rgb(255,211,70)] transition duration-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[rgb(255,211,70)] text-gray-900 px-4 py-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[rgb(255,211,70)] transition duration-200"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <button onClick={switchToRegister} className="text-blue-600">
            Register here
          </button>
        </p>
        <p className="text-sm mt-2 text-center text-gray-600">
          Forgot your password?{" "}
          <a href="/forgot-password" className="text-blue-600">
            Reset it here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
