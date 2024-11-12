"use client";
import React, { useState, useEffect } from "react";

const ReturnedItems = () => {
  const [returnedItems, setReturnedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  useEffect(() => {
    const fetchReturnedItems = async () => {
      try {
        const response = await fetch("/api/returned"); // Correct endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch returned items");
        }
        const data = await response.json();
        setReturnedItems(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReturnedItems();
  }, []);

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
            {/* Reservation Dropdown */}
            <button
              onClick={() => setIsReservationOpen(!isReservationOpen)}
              className="block w-full text-left py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none"
            >
              Item Management
            </button>
            {isReservationOpen && (
              <ul className="ml-4 space-y-2">
                <li>
                  <a
                    href="/admin/reserveitem"
                    className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
                  >
                    Available Items
                  </a>
                </li>
                <li>
                  <a
                    href="/admin/reserve"
                    className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
                  >
                    Borrow Items
                  </a>
                </li>
                <li>
                  <a
                    href="/admin/return"
                    className="block py-2 px-4 rounded-md bg-gray-900 text-white"
                  >
                    Return Items
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <a
              href="/admin/tambayayong"
              className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Tambayayong
            </a>
          </li>
        </ul>
      </nav>
      <main className="flex-1 bg-white p-10">
        <h2 className="text-3xl font-semibold text-black mb-8">
          Returned Items
        </h2>
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-[rgb(255,211,70)] text-black">
            <tr>
              <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                Id
              </th>
              <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                Item Id
              </th>
              <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                User Id
              </th>
              <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                Return Date & Time
              </th>
              <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                Status
              </th>
              <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {returnedItems.map((item) => (
              <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                <td className="border px-4 py-3 text-sm text-gray-800">
                  {item.id}
                </td>
                <td className="border px-4 py-3 text-sm text-gray-800">
                  {item.itemId}
                </td>
                <td className="border px-4 py-3 text-sm text-gray-800">
                  {item.userId}
                </td>
                <td className="border px-4 py-3 text-sm text-gray-800">
                  {new Date(item.returnDateTime).toLocaleString()}
                </td>
                <td className="border px-4 py-3 text-sm text-gray-800">
                  {item.status}
                </td>
                <button className="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700">
                  Returned
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">
                  Alert
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ReturnedItems;
