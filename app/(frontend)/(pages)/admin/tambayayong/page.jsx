"use client";
import React, { useState } from "react";

const initialUsers = [
  {
    id: 1,
    userID: "001",
    name: "Elizabeth Lee",
    patient: "John Doe",
    date: "2024-09-01",
    gcashNumber: "09171234567",
    proof: "https://via.placeholder.com/50",
    status: "Pending", // Assuming initial status can be "Pending"
  },
  {
    id: 2,
    userID: "002",
    name: "Carlos Garcia",
    patient: "Jane Doe",
    date: "2024-09-05",
    gcashNumber: "09181234567",
    proof: "https://via.placeholder.com/50",
    status: "Pending",
  },
  // more users...
];

const Dashboard = () => {
  const [users, setUsers] = useState(initialUsers); // State for users

  const handleApprove = (id) => {
    // Change user status to "Approved"
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, status: "Approved" } : user
      )
    );
  };

  const handleDecline = (id) => {
    // Remove user from the list
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

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
              className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
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
              className="block py-2 px-4 rounded-md bg-gray-900 text-white"
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
                  UserID
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Patient
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Date
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  GCash Number
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Proof
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Actions
                </th>{" "}
                {/* New Actions Column */}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {user.userID}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {user.name}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {user.patient}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {user.date}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {user.gcashNumber}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    <img
                      src={user.proof}
                      alt="proof"
                      className="h-8 w-8 rounded"
                    />
                  </td>
                  <td className="border px-4 py-3 text-sm">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-white ${
                        user.status === "Approved"
                          ? "bg-green-500"
                          : user.status === "Declined"
                          ? "bg-red-500"
                          : "bg-orange-500"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="border px-4 py-3 text-sm">
                    <button
                      onClick={() => handleApprove(user.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDecline(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Decline
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
                3
              </button>
              <button className="bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700">
                »
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
