"use client";
import React, { useState, useEffect } from "react";

const ReserveItemDashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all items from the database
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/reserveitem");
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Handle delete action
  const handleDelete = async (itemId) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(`/api/reserveitem?id=${itemId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete item");
        }
        // Filter out the deleted item from the state
        setItems(items.filter((item) => item.id !== itemId));
      } catch (error) {
        alert(error.message);
      }
    }
  };

  // Handle update action to toggle status
  const handleUpdateStatus = async (item) => {
    const newStatus =
      item.status === "Available" ? "Not Available" : "Available";

    try {
      const response = await fetch(`/api/reserveitem?id=${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }), // Send the new status
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const updatedItem = await response.json();
      // Update the UI with the new item status
      setItems(
        items.map((currentItem) =>
          currentItem.id === updatedItem.id ? updatedItem : currentItem
        )
      );
    } catch (error) {
      alert(error.message);
    }
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
              className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Tambayayong
            </a>
          </li>
          <li>
            <a
              href="/admin/reserveitem"
              className="block py-2 px-4 rounded-md bg-gray-900 text-white"
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
          Reserve Item Dashboard
        </h2>

        {/* Table displaying items */}
        <section>
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-[rgb(255,211,70)] text-black">
              <tr>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  ID
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Type
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Image
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {item.id}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {item.type}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {item.status === "Available"
                      ? "Available"
                      : "Not Available"}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    <img
                      src={item.image}
                      alt={item.type}
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    <button
                      onClick={() => handleUpdateStatus(item)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Toggle Status
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default ReserveItemDashboard;
