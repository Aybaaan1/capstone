"use client"; // Ensure this is included at the top of your file
import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.user);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    console.log("Attempting to delete user with ID:", userId);
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`/api/user/${userId}`, {
          // Use backticks here
          method: "DELETE",
        });
        console.log("Response status:", response.status);
        const responseBody = await response.text();
        console.log("Response body:", responseBody);

        if (!response.ok) {
          throw new Error("Failed to delete user");
        }

        setUsers(users.filter((user) => user.id !== userId));
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setUpdatedUser(user);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/user/${updatedUser.id}`, {
        // Use backticks here
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      console.log("Response Status:", response.status);
      const responseText = await response.text();
      console.log("Response Text:", responseText);

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const responseData = JSON.parse(responseText);
      console.log("Updated Data:", responseData);
      setUsers(
        users.map((user) => (user.id === responseData.id ? responseData : user))
      );
      setIsModalOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <nav className="w-64 bg-[rgb(255,211,70)] text-black p-6">
        <div className="logo mb-10">
          <h1 className="text-3xl font-bold tracking-wide">SSG CONNECT</h1>
        </div>
        <ul className="space-y-4">
          <li>
            <a
              href="/admin"
              className="block py-2 px-4 rounded-md bg-gray-900 text-white"
            >
              Users
            </a>
          </li>
          <li>
            <a
              href="/admin/purchase"
              className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Purchase
            </a>
          </li>
          <li>
            <a
              href="/admin/lostfound"
              className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Lost & Found
            </a>
          </li>
          <li>
            <a
              href="/admin/reserve"
              className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Reservation
            </a>
          </li>
          <li>
            <a
              href="/admin/tambayayong"
              className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Tambayayong
            </a>
          </li>
          <li>
            <a
              href="/admin/item"
              className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Item Reservation Form
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-white p-10">
        <h2 className="text-3xl font-semibold text-black mb-8">
          Admin Dashboard
        </h2>

        {/* Users Table */}
        <section>
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-[rgb(255,211,70)] text-black">
              <tr>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Select
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  UserId
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  ID Number
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  First Name
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Last Name
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Program
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="border px-4 py-3">
                    <input type="checkbox" />
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {user.id}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {user.email}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {user.idnumber}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {user.firstname}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {user.lastname}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {user.program}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    <button
                      onClick={() => handleUpdate(user)}
                      className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-600 text-white text-xs px-2 py-1 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <span className="text-sm text-gray-600">
              {users.length} results
            </span>
            <div className="flex space-x-2">
              <button className="bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700">
                «
              </button>
              <button className="bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700">
                1
              </button>
              <button className="bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700">
                2
              </button>
              <button className="bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700">
                »
              </button>
            </div>
          </div>
        </section>

        {/* Modal for Updating User */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <h3 className="text-lg font-semibold mb-4">Update User</h3>
              <form>
                <div className="mb-4">
                  <label className="block mb-1">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={updatedUser.email || ""}
                    onChange={handleChange}
                    className="border rounded-md p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">ID Number:</label>
                  <input
                    type="text"
                    name="idnumber"
                    value={updatedUser.idnumber || ""}
                    onChange={handleChange}
                    className="border rounded-md p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">First Name:</label>
                  <input
                    type="text"
                    name="firstname"
                    value={updatedUser.firstname || ""}
                    onChange={handleChange}
                    className="border rounded-md p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Last Name:</label>
                  <input
                    type="text"
                    name="lastname"
                    value={updatedUser.lastname || ""}
                    onChange={handleChange}
                    className="border rounded-md p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Program:</label>
                  <input
                    type="text"
                    name="program"
                    value={updatedUser.program || ""}
                    onChange={handleChange}
                    className="border rounded-md p-2 w-full"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-300 text-black px-4 py-2 rounded-md ml-2 hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
