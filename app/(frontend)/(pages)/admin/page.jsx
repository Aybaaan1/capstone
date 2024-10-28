"use client";
import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [filterRole, setFilterRole] = useState(""); // New state for role filtering
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

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
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`/api/user/${userId}`, {
          method: "DELETE",
        });

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
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const responseData = await response.json();
      setUsers(
        users.map((user) => (user.id === responseData.id ? responseData : user))
      );
      setIsModalOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesRole = filterRole ? user.role === filterRole : true;
    const matchesSearch = user.id.toString().includes(searchQuery);
    return matchesRole && matchesSearch;
  });

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
          {/* Sidebar Links */}
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
              href="/admin/reserveitem"
              className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Reserve Item
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

        {/* Filter and Search */}
        <div className="mb-4 flex items-center space-x-4">
          <button
            onClick={() => setFilterRole("")}
            className={`px-4 py-2 rounded-md ${
              filterRole === ""
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterRole("STUDENT")}
            className={`px-4 py-2 rounded-md ${
              filterRole === "STUDENT"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setFilterRole("ADMIN")}
            className={`px-4 py-2 rounded-md ${
              filterRole === "ADMIN"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Admin
          </button>

          <input
            type="text"
            placeholder="Search by UserId"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-md p-2 ml-4"
          />
        </div>

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
              {filteredUsers.map((user) => (
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
        </section>

        {/* Update Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
              <h2 className="text-2xl font-semibold mb-4">Update User</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="email"
                  placeholder="Enter Email Address"
                  value={updatedUser.email || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="text"
                  name="idnumber"
                  placeholder="Enter IdNumber"
                  value={updatedUser.idnumber || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="text"
                  name="firstname"
                  placeholder="Enter First Name"
                  value={updatedUser.firstname || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={updatedUser.lastname || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="text"
                  name="Program"
                  placeholder="Enter Program"
                  value={updatedUser.program || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
                {/* Add additional fields as needed */}
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
