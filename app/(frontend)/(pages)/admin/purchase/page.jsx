"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/lib/imageUpload"; // Assuming imageUpload is set up for image storage

const MerchandiseDashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // For Add Item Modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // For Update Item Modal
  const [file, setFile] = useState(null);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemStocks, setItemStocks] = useState(0);
  const [itemType, setItemType] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const { data: session, status } = useSession();
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false); // New state for "Purchase" dropdown
  const router = useRouter();

  // Fetch all merchandise items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/merch");
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

  // Handle file upload
  const handleFileChange = (e) => setFile(e.target.files[0]);

  // Handle form submission for new items or updates
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      if (file) {
        imageUrl = await uploadImage(file);
      }

      const itemData = {
        name: itemName,
        price: itemPrice,
        stocks: itemStocks,
        type: itemType,
        image: imageUrl || "", // Keep the current image if no new image is selected
      };

      const url = editingItemId
        ? `/api/merch?id=${editingItemId}`
        : "/api/merch";
      const method = editingItemId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });

      if (!response.ok) throw new Error("Failed to save item");
      const newItem = await response.json();

      if (editingItemId) {
        // Update the item in the list
        setItems(
          items.map((item) => (item.id === editingItemId ? newItem : item))
        );
      } else {
        setItems([...items, newItem]);
      }

      // Reset form and close modal
      setFile(null);
      setItemName("");
      setItemPrice(0);
      setItemStocks(0);
      setItemType("");
      setIsAddModalOpen(false);
      setIsUpdateModalOpen(false);
      setEditingItemId(null);
    } catch (error) {
      console.error("Error uploading image or creating item:", error);
      alert(error.message);
    }
  };

  // Edit item (opens modal with current data)
  const handleEdit = (item) => {
    setEditingItemId(item.id);
    setItemName(item.name);
    setItemPrice(item.price);
    setItemStocks(item.stocks);
    setItemType(item.type);
    setIsUpdateModalOpen(true); // Open the Update modal
  };

  // Delete merchandise item
  const handleDelete = async (itemId) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(`/api/merch?id=${itemId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete item");
        }
        setItems(items.filter((item) => item.id !== itemId));
      } catch (error) {
        alert(error.message);
      }
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
                    Item Reservation Form
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
      <main className="flex-1 p-10">
        <header className="flex justify-between mb-5">
          <h1 className="text-2xl font-medium">SSG Merch List</h1>
        </header>
        <button
          onClick={() => setIsAddModalOpen(true)} // This button opens the Add Item Modal
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
                  Name
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Type
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Price
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Stocks
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
                <tr key={item.id}>
                  <td className="border p-3">{item.id}</td>
                  <td className="border p-3">{item.name}</td>
                  <td className="border p-3">{item.type}</td>
                  <td className="border p-3">{item.price}</td>
                  <td className="border p-3">{item.stocks}</td>
                  <td className="border p-3">
                    <img
                      src={item.image}
                      alt={item.name || item.stocks}
                      className="h-10 w-10"
                    />
                  </td>
                  <td className="border p-3">
                    <button
                      onClick={() => handleEdit(item)} // Opens the update modal
                      className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Add Item Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Add Merchandise
              </h2>
              <form onSubmit={handleUpload}>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor="price"
                  >
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor="stocks"
                  >
                    Stocks
                  </label>
                  <input
                    id="stocks"
                    type="number"
                    value={itemStocks}
                    onChange={(e) => setItemStocks(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600" htmlFor="type">
                    Type
                  </label>
                  <input
                    type="text"
                    id="type"
                    value={itemType}
                    onChange={(e) => setItemType(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600" htmlFor="file">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gray-900 text-white px-3 py-1 rounded-md mb-6 hover:bg-gray-700"
                >
                  Add Item
                </button>
              </form>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Update Item Modal */}
        {isUpdateModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Update Merchandise
              </h2>
              <form onSubmit={handleUpload}>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor="price"
                  >
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor="stocks"
                  >
                    Stocks
                  </label>
                  <input
                    id="stocks"
                    type="number"
                    value={itemStocks}
                    onChange={(e) => setItemStocks(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600" htmlFor="type">
                    Type
                  </label>
                  <input
                    type="text"
                    id="type"
                    value={itemType}
                    onChange={(e) => setItemType(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600" htmlFor="file">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gray-900 text-white px-3 py-1 rounded-md mb-6 hover:bg-gray-700"
                >
                  Update Item
                </button>
              </form>
              <button
                onClick={() => setIsUpdateModalOpen(false)}
                className="text-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MerchandiseDashboard;
