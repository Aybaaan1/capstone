"use client";
import React, { useState, useEffect } from "react";

const ReturnedItems = () => {
  const [returnedItems, setReturnedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReturnedItems = async () => {
      try {
        const response = await fetch("/api/return"); // Endpoint for returned items
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
        <h1 className="text-3xl font-bold tracking-wide">Returned Items</h1>
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
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ReturnedItems;
