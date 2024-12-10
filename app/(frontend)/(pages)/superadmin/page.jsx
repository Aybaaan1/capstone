"use client";
import React, { useState, useEffect } from "react";

const SuperAdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [filterRole, setFilterRole] = useState(""); // Role filtering state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({});

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
        console.log(`Deleting user with ID: ${userId}`); // Debug log

        const response = await fetch(`/api/user/${userId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`Failed to delete user, status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Delete response data:", responseData); // Debug log

        if (responseData.success) {
          // Remove user from the state if deletion was successful
          setUsers(users.filter((user) => user.id !== userId));
          alert("User deleted successfully");
        } else {
          throw new Error(responseData.error || "Unknown error occurred");
        }
      } catch (error) {
        console.error("Error during user deletion:", error);
        alert(`Error: ${error.message}`);
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

  const handleAddAdmin = async () => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAdmin),
      });

      if (!response.ok) {
        throw new Error("Failed to add new admin");
      }

      const responseData = await response.json();
      setUsers([...users, responseData]);
      setIsAddAdminModalOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }), // Send only the role to update
      });

      if (!response.ok) {
        throw new Error("Failed to update user role");
      }

      const updatedUser = await response.json();
      setUsers(
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      alert("Role updated successfully!");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };
  const filteredUsers = users.filter((user) => {
    const matchesRole = filterRole ? user.role === filterRole : true;
    const matchesSearch = user.idnumber.toString().includes(searchQuery);
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
      <nav className="w-64 bg-[rgb(255,211,70)] text-black p-6">
        <div className="logo mb-10">
          <h1 className="text-3xl font-bold tracking-wide">SSG CONNECT</h1>
        </div>
        <ul className="space-y-4">
          <li>
            <a
              href="/superadmin"
              className="block py-2 px-4 rounded-md bg-gray-900 text-white"
            >
              User Management
            </a>
          </li>
          <li>
            <a
              href="/superadmin/addadmin"
              className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Add Admin
            </a>
          </li>
        </ul>
      </nav>

      <main className="flex-1 bg-white p-10">
        <h2 className="text-3xl font-semibold text-black mb-8">
          Super Admin Dashboard
        </h2>

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

        <section>
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-[rgb(255,211,70)] text-black">
              <tr>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  UserId
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Role
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
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {user.id}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {user.email}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {user.role}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    <button
                      onClick={() =>
                        handleRoleChange(
                          user.id,
                          user.role === "ADMIN" ? "STUDENT" : "ADMIN"
                        )
                      }
                      className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      Toggle Role
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

        {/* Add Admin Modal */}
        {isAddAdminModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
              <h2 className="text-2xl font-semibold mb-4">Add New Admin</h2>
              <input
                type="text"
                name="idnumber"
                placeholder="ID Number"
                className="w-full border rounded-md p-2 mb-2"
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, idnumber: e.target.value })
                }
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border rounded-md p-2 mb-2"
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, email: e.target.value })
                }
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border rounded-md p-2 mb-2"
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, password: e.target.value })
                }
              />
              <button
                onClick={handleAddAdmin}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Add Admin
              </button>
              <button
                onClick={() => setIsAddAdminModalOpen(false)}
                className="w-full mt-2 bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
