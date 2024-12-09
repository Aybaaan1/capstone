"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Proof from "../../../(components)/_components/Proof";

const Purchase = () => {
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isProofModalOpen, setIsProofModalOpen] = useState(false); // Separate state for proof modal
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false); // Separate state for order details modal
  const [currentImage, setCurrentImage] = useState(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  // Fetch purchases from the database
  const fetchPurchases = async () => {
    try {
      const response = await fetch("/api/order");
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const orders = await response.json();
      setPurchases(orders);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  // Open Order Details Modal
  const openOrderDetailsModal = (orderDetails) => {
    setSelectedOrderDetails(orderDetails);
    setIsOrderDetailsModalOpen(true);
  };

  // Open Proof Modal
  const openProofModal = (imageSrc) => {
    setCurrentImage(imageSrc);
    setIsProofModalOpen(true);
  };

  // Close Modals
  const closeModals = () => {
    setIsOrderDetailsModalOpen(false);
    setIsProofModalOpen(false);
    setSelectedOrderDetails(null);
    setCurrentImage(null);
  };

  // Accept the order (updating the status to "accepted")
  const acceptOrder = async (index, id) => {
    try {
      const response = await fetch(`/api/order/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "accepted" }),
      });

      if (response.ok) {
        const updatedPurchases = [...purchases];
        updatedPurchases[index].status = "accepted";
        setPurchases(updatedPurchases);
      } else {
        throw new Error("Failed to accept order.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Decline the order (deleting it)
  const declineOrder = async (index, id) => {
    try {
      const response = await fetch(`/api/order/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedPurchases = purchases.filter((purchase, i) => i !== index);
        setPurchases(updatedPurchases);
      } else {
        throw new Error("Failed to decline order.");
      }
    } catch (error) {
      setError(error.message);
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
            {/* Reservation Dropdown */}
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
                  Order ID
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  User ID
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Merch ID
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Proof
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
              {purchases.map((purchase, index) => (
                <tr key={purchase.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-3 text-sm text-center">
                    {purchase.id}
                  </td>
                  <td className="border px-4 py-3 text-sm text-center">
                    {purchase.userId}
                  </td>
                  <td className="border px-4 py-3 text-sm text-center">
                    <button
                      onClick={() => openOrderDetailsModal(purchase)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      View Orders
                    </button>
                  </td>
                  <td className="border px-4 py-3 text-sm text-center">
                    {purchase.proof ? (
                      <button
                        onClick={() => openProofModal(purchase.proof)}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      >
                        View
                      </button>
                    ) : (
                      "No proof available"
                    )}
                  </td>
                  <td className="border px-4 py-3 text-sm text-center">
                    <span
                      className={`px-3 py-1 rounded-full ${
                        purchase.status === "accepted"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      } text-white`}
                    >
                      {purchase.status}
                    </span>
                  </td>
                  <td className="border px-4 py-3 text-sm text-center">
                    <button
                      onClick={() => acceptOrder(index, purchase.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => declineOrder(index, purchase.id)}
                      className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Proof Modal */}
        {isProofModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md">
              <button
                onClick={closeModals}
                className="absolute top-2 right-2 text-black"
              >
                X
              </button>
              <h2 className="text-lg mb-4">Proof of Purchase</h2>
              <Image
                src={currentImage}
                alt="Proof"
                width={400}
                height={300}
                className="rounded"
              />
            </div>
          </div>
        )}

        {isOrderDetailsModalOpen && selectedOrderDetails && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md">
              <button
                onClick={closeModals}
                className="absolute top-2 right-2 text-black"
              >
                X
              </button>
              <h2 className="text-lg mb-4">Order Details</h2>
              <div>
                {/* If selectedOrderDetails is an array, map through it */}
                {Array.isArray(selectedOrderDetails) ? (
                  selectedOrderDetails.map((item, index) => (
                    <div key={index} className="mb-4">
                      <p>Item: {item.merch?.name || "N/A"}</p>
                      <p>Price: {item.merch?.price * item.quantity || "N/A"}</p>
                      <p>Quantity: {item.quantity || "N/A"}</p>
                      <p>Size: {item.size || "N/A"}</p>
                      {item.merch?.image && (
                        <Image
                          src={item.merch.image}
                          alt="Merchandise"
                          width={200}
                          height={150}
                          className="rounded"
                        />
                      )}
                    </div>
                  ))
                ) : (
                  // If it's a single object, render its details
                  <div>
                    <p>Item: {selectedOrderDetails.merch?.name || "N/A"}</p>

                    <p>
                      Price:{" "}
                      {selectedOrderDetails.merch?.price *
                        selectedOrderDetails.quantity || "N/A"}
                    </p>
                    <p>Quantity: {selectedOrderDetails.quantity || "N/A"}</p>
                    <p>Size: {selectedOrderDetails.size || "N/A"}</p>
                    {selectedOrderDetails.merch?.image && (
                      <Image
                        src={selectedOrderDetails.merch.image}
                        alt="Merchandise"
                        width={200}
                        height={150}
                        className="rounded"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Purchase;
