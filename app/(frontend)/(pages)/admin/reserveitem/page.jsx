"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/lib/imageUpload";

const ReserveItemDashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [itemType, setItemType] = useState("TV");
  const [itemStatus, setItemStatus] = useState("Available");
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);

  // Fetch all items from the database
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/reserveitem");
        if (!response.ok) throw new Error("Failed to fetch items");
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

  // Form functions
  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!file) throw new Error("Please select a file to upload.");
      const imageUrl = await uploadImage(file);

      const reserveResponse = await fetch("/api/reserveitem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: itemType,
          status: itemStatus,
          image: imageUrl,
        }),
      });

      if (!reserveResponse.ok)
        throw new Error("Failed to create item in database");
      const newItem = await reserveResponse.json();

      setItems([...items, newItem]);
      setFile(null);
      setItemType("TV");
      setItemStatus("Available");
      setIsModalOpen(false); // Close modal after adding item
    } catch (error) {
      console.error("Error uploading image or creating item:", error);
      alert(error.message);
    }
  };
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

          {/* Purchase Dropdown */}
          <li>
            <button
              onClick={() => setIsPurchaseOpen(!isPurchaseOpen)} // Toggle the dropdown
              className="block w-full text-left py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none"
            >
              Purchase
            </button>
            {isPurchaseOpen && ( // Show the dropdown if "isPurchaseOpen" is true
              <ul className="ml-4 space-y-2">
                <li>
                  <a
                    href="/admin/purchase"
                    className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
                  >
                    Merchs List
                  </a>
                </li>
                <li>
                  <a
                    href="/admin/orderrequests"
                    className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
                  >
                    Order Requests
                  </a>
                </li>
                <li>
                  <a
                    href="/admin/orderslist"
                    className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
                  >
                    Orders List
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li>
            <a
              href="/admin/lostfound"
              className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Lost & Found
            </a>
          </li>

          {/* Reservation Dropdown */}
          <li>
            <button
              onClick={() => setIsReservationOpen(!isReservationOpen)}
              className="block w-full text-left py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none"
            >
              Reservation
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
                    href="/admin/item"
                    className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
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

      {/* Main Content */}
      <main className="flex-1 bg-white p-10">
        <h2 className="text-3xl font-semibold text-black mb-8">
          SSG Available Items
        </h2>

        {/* Add Item Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-900 text-white px-3 py-1 rounded-md mb-6 hover:bg-gray-700"
        >
          Add Item
        </button>

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
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
              <h2 className="text-2xl font-semibold text-black mb-4">
                Add New Item
              </h2>
              <form onSubmit={handleUpload}>
                <label className="block text-gray-700 font-semibold mb-2">
                  Item Type:
                </label>
                <select
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
                >
                  <option value="TV">TV</option>
                  <option value="Chairs">Chairs</option>
                  <option value="Camera">Camera</option>
                  <option value="Table">Table</option>
                </select>

                <label className="block text-gray-700 font-semibold mb-2">
                  Status:
                </label>
                <select
                  value={itemStatus}
                  onChange={(e) => setItemStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
                >
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>

                <label className="block text-gray-700 font-semibold mb-2">
                  Upload Image:
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
                />

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Save Item
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

export default ReserveItemDashboard;
