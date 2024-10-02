"use client"; // Add this line to indicate client-side rendering
import { useState } from "react";
import React from "react";

// Mock data for purchases with added fields
const initialPurchases = [
  {
    id: "1",
    userID: "user_001",
    merchID: "merch_101",
    orderDate: "2024-09-01",
    paymentMethod: "GCash",
    proof: "/img/duha.jpg",
    status: "claimed",
    details: {
      productImage: "/img/una.jpg",
      productName: "Smartphone",
      size: "64GB",
      quantity: 1,
      unitPrice: "₱20,000",
    },
  },
  {
    id: "2",
    userID: "user_002",
    merchID: "merch_102",
    orderDate: "2024-09-02",
    paymentMethod: "GCash",
    proof: "/img/duha.jpg",
    status: "unclaimed",
    details: {
      productImage: "/img/una.jpg",
      productName: "Laptop",
      size: "15.6 inch",
      quantity: 1,
      unitPrice: "₱50,000",
    },
  },
];

const Purchase = () => {
  const [purchases, setPurchases] = useState(initialPurchases);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Toggle claim/unclaim status
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
          <h2 className="text-2xl font-medium">Purchase Dashboard</h2>
          <div className="flex space-x-4">
            <button className="text-lg">🔔</button>
            <button className="text-lg">❓</button>
            <button className="text-lg">👤</button>
          </div>
        </header>

        {/* Purchase Table */}
        <section>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[rgb(255,211,70)] text-black">
                <th className="border px-4 py-2 text-sm font-semibold text-center">
                  <input type="checkbox" />
                </th>
                <th className="border px-4 py-2 text-sm font-semibold text-center">
                  ID
                </th>
                <th className="border px-4 py-2 text-sm font-semibold text-center">
                  User ID
                </th>
                <th className="border px-4 py-2 text-sm font-semibold text-center">
                  Merch ID
                </th>
                <th className="border px-4 py-2 text-sm font-semibold text-center">
                  Order Date
                </th>
                <th className="border px-4 py-2 text-sm font-semibold text-center">
                  Payment Mode
                </th>
                <th className="border px-4 py-2 text-sm font-semibold text-center">
                  Proof
                </th>
                <th className="border px-4 py-2 text-sm font-semibold text-center">
                  Status
                </th>
                <th className="border px-4 py-2 text-sm font-semibold text-center">
                  Details
                </th>
                <th className="border px-4 py-2 text-sm font-semibold text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border px-4 py-3 text-sm text-center">
                    <input type="checkbox" />
                  </td>
                  <td className="border px-4 py-3 text-sm text-center">
                    {purchase.id}
                  </td>
                  <td className="border px-4 py-3 text-sm text-center">
                    {purchase.userID}
                  </td>
                  <td className="border px-4 py-3 text-sm text-center">
                    {purchase.merchID}
                  </td>
                  <td className="border px-4 py-3 text-sm text-center">
                    {purchase.orderDate}
                  </td>
                  <td className="border px-4 py-3 text-sm text-center">
                    {purchase.paymentMethod}
                  </td>
                  <td className="border px-4 py-3 text-center">
                    <img
                      src={purchase.proof}
                      alt="Proof"
                      className="w-16 h-16 object-cover mx-auto"
                    />
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
        {/* Modal */}
        {showModal && selectedPurchase && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
              <h3 className="text-2xl font-semibold mb-4">Order Details</h3>
              <div className="flex items-center mb-4">
                <img
                  src={selectedPurchase.details.productImage}
                  alt="Product"
                  className="w-32 h-32 object-cover mr-4 border border-gray-300 rounded"
                />
                <div className="flex-grow">
                  <p className="text-lg">
                    <span className="font-semibold">Product Name:</span>{" "}
                    {selectedPurchase.details.productName}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Size:</span>{" "}
                    {selectedPurchase.details.size}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Quantity:</span>{" "}
                    {selectedPurchase.details.quantity}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Unit Price:</span>{" "}
                    {selectedPurchase.details.unitPrice}
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-300 mt-4 pt-4">
                <p className="text-lg">
                  <span className="font-semibold">User ID:</span>{" "}
                  {selectedPurchase.userID}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Order Date:</span>{" "}
                  {selectedPurchase.orderDate}
                </p>
              </div>
              <div className="mt-6 text-right">
                <button
                  onClick={closeModal}
                  className="bg-gray-700 text-white px-4 py-2 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Purchase;
