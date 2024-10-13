"use client";
import React, { useState, useEffect } from "react";

const Purchase = () => {
  const [purchases, setPurchases] = useState([]);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null); // For error handling

  // Fetch purchases from the database
  const fetchPurchases = async () => {
    try {
      const response = await fetch("/api/order"); // Fetch from your API route
      if (!response.ok) {
        throw new Error("Failed to fetch orders"); // Handle errors
      }
      const orders = await response.json();
      setPurchases(orders);
    } catch (error) {
      setError(error.message); // Set error state
    }
  };

  useEffect(() => {
    fetchPurchases(); // Fetch data when the component mounts
  }, []);

  // Toggle claim/unclaim status (you might want to implement this functionality with the backend)
  const toggleClaim = (index) => {
    const updatedPurchases = [...purchases];
    updatedPurchases[index].status =
      updatedPurchases[index].status === "claimed" ? "unclaimed" : "claimed";
    setPurchases(updatedPurchases);
  };

  // Open the details modal
  const openModal = (index) => {
    setSelectedPurchase(purchases[index]);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedPurchase(null);
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
              className="block py-2 px-4 rounded-md bg-gray-900 text-white"
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
      <main className="flex-1 p-10">
        <header className="flex justify-between mb-5">
          <h1 className="text-2xl font-medium">Purchase Dashboard</h1>
        </header>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Purchase Table */}
        <section>
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-[rgb(255,211,70)] text-black">
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Select
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Order ID
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  User ID
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Merch ID
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Order Date
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Payment Mode
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Proof
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Details
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Claim/Unclaim
                </th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase, index) => (
                <tr key={purchase.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-3 text-sm text-center">
                    <input type="checkbox" />
                  </td>
                  <td className="border px-4 py-3 text-sm text-center">
                    {purchase.id}
                  </td>
                  <td className="border px-4 py-3 text-sm text-center">
                    {purchase.userId}
                  </td>
                  <td className="border px-4 py-3 text-sm text-center">
                    {purchase.merchId}
                  </td>
                  <td className="border px-4 py-3 text-sm text-center">
                    {new Date(purchase.createdAt).toLocaleString()}
                  </td>
                  <td className="border px-4 py-3 text-sm text-center">
                    {purchase.paymentMode}
                  </td>
                  <td className="border px-4 py-3 text-center">
                    {purchase.proof && (
                      <img
                        src={purchase.proof}
                        alt="Proof"
                        className="w-16 h-16 object-cover mx-auto"
                      />
                    )}
                  </td>
                  <td className="border px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full ${
                        purchase.status === "claimed"
                          ? "bg-green-500"
                          : "bg-red-500"
                      } text-white text-xs`}
                    >
                      {purchase.status}
                    </span>
                  </td>
                  <td className="border px-4 py-3 text-center">
                    <button
                      onClick={() => openModal(index)}
                      className="bg-[rgb(255,211,70)] text-black px-3 py-1 rounded text-xs"
                    >
                      View Details
                    </button>
                  </td>
                  <td className="border px-4 py-3 text-center">
                    <button
                      onClick={() => toggleClaim(index)}
                      className="bg-[rgb(255,211,70)] text-black px-3 py-1 rounded text-xs"
                    >
                      {purchase.status === "claimed" ? "Unclaim" : "Claim"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Modal */}
        {showModal && selectedPurchase && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
              <h3 className="text-2xl font-semibold mb-4">Order Details</h3>
              <div className="flex items-center mb-4">
                <img
                  src={selectedPurchase.merch.image} // Use the image from the merch object
                  alt="Product"
                  className="w-32 h-32 object-cover mr-4 border border-gray-300 rounded"
                />
                <div className="flex-grow">
                  <p className="text-lg">
                    <span className="font-semibold">Product Name:</span>{" "}
                    {selectedPurchase.merch.name}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Size:</span>{" "}
                    {selectedPurchase.merch.size} {/* If applicable */}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Quantity:</span>{" "}
                    {selectedPurchase.quantity}{" "}
                    {/* Adjust if you track quantity */}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Unit Price:</span>{" "}
                    {selectedPurchase.merch.price}
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-300 mt-4 pt-4">
                <p className="text-lg">
                  <span className="font-semibold">Status:</span>{" "}
                  {selectedPurchase.status}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Payment Mode:</span>{" "}
                  {selectedPurchase.paymentMode}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Order Date:</span>{" "}
                  {new Date(selectedPurchase.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
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

export default Purchase;
