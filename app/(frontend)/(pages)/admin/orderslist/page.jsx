"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Proof from "../../../(components)/_components/Proof";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [merchTypes, setMerchTypes] = useState([]);
  const [error, setError] = useState(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);
  const [selectedProof, setSelectedProof] = useState(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [selectedMerchType, setSelectedMerchType] = useState(""); // State to store selected merch type
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [acceptanceSuccess, setAcceptanceSuccess] = useState(false);
  const [searchId, setSearchId] = useState("");

  const openProofModal = (proofUrl) => {
    setSelectedProof(proofUrl);
    setIsProofModalOpen(true);
  };

  const closeProofModal = () => {
    setIsProofModalOpen(false);
    setSelectedProof(null);
  };

  const openOrderDetailsModal = (orderDetails) => {
    setSelectedOrderDetails(orderDetails);
    setIsOrderDetailsModalOpen(true);
  };

  const closeModals = () => {
    setIsProofModalOpen(false);
    setIsOrderDetailsModalOpen(false);
    setSelectedProof(null);
    setSelectedOrderDetails(null);
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orderlist");
      if (!response.ok) {
        throw new Error("Failed to fetch orders list");
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchMerchTypes = async () => {
    try {
      const response = await fetch("/api/merch");
      if (!response.ok) {
        throw new Error("Failed to fetch merch data");
      }
      const merchData = await response.json();
      setMerchTypes(merchData);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchMerchTypes(); // Fetch merch types when component mounts
  }, []);

  // Function to get merch type based on merchId
  const getMerchType = (merchId) => {
    const merch = merchTypes.find((item) => item.id === merchId);
    return merch ? merch.type : "N/A";
  };

  // Handle merch type selection change
  const handleMerchTypeChange = (selectedType) => {
    setSelectedMerchType(selectedType);

    // Filter purchases based on the selected merch type
    const filtered = selectedType
      ? orders.filter(
          (purchase) =>
            getMerchType(purchase.merchId).toLowerCase() ===
            selectedType.toLowerCase()
        )
      : orders;

    setFilteredPurchases(filtered);
  };

  const filteredItems = filteredPurchases.filter((item) => {
    const matchesSearch = item.userId.toString().includes(searchId);
    const matchesFilter =
      selectedMerchType === "" ||
      getMerchType(item.merchId).toLowerCase() ===
        selectedMerchType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleClickOrder = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/orderlist/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus, // Ensure the status is a string
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update order status");
      }

      console.log("Order updated:", data);

      // Update UI or state after successful update
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Navbar */}
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
                    href="/admin/orderlist"
                    className="block py-2 px-4 rounded-md bg-gray-900 text-white"
                  >
                    Orders List
                  </a>
                </li>
                <li>
                  <a
                    href="/admin/sales"
                    className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
                  >
                    Sales Report
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
          <h1 className="text-2xl font-medium">Orders List</h1>
        </header>

        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <div className="space-x-2">
            {/* Buttons for each merch type */}
            <button
              onClick={() => handleMerchTypeChange("")}
              className={`px-4 py-2 border rounded-md ${
                selectedMerchType === ""
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleMerchTypeChange("T-shirt")}
              className={`px-4 py-2 border rounded-md ${
                selectedMerchType === "Tshirt"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Tshirt
            </button>
            <button
              onClick={() => handleMerchTypeChange("Lanyards")}
              className={`px-4 py-2 border rounded-md ${
                selectedMerchType === "Lanyard"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Lanyards
            </button>
            <button
              onClick={() => handleMerchTypeChange("Pins")}
              className={`px-4 py-2 border rounded-md ${
                selectedMerchType === "Pins"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Pins
            </button>
            <button
              onClick={() => handleMerchTypeChange("Stickers")}
              className={`px-4 py-2 border rounded-md ${
                selectedMerchType === "Sticker"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Sticker
            </button>
            <input
              type="text"
              placeholder="Search by User ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="border rounded-md p-2 ml-4"
            />
            {/* Button to clear the filter */}
          </div>
        </div>
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
                  Merch Type
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Order Details
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Proof
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((order) => (
                <tr key={order.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-3 text-sm text-center">
                    {order.id}
                  </td>
                  <td className="border px-4 py-3 text-sm text-center">
                    {order.userId}
                  </td>
                  <td className="border px-4 py-3 text-sm text-center">
                    {getMerchType(order.merchId)} {/* Display the merch type */}
                  </td>
                  <td className="border px-4 py-3 text-sm text-center">
                    <button
                      onClick={() => openOrderDetailsModal(order)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      View Orders
                    </button>
                  </td>
                  <td className="border px-4 py-3 text-sm text-center">
                    {order.proof ? (
                      <button
                        onClick={() => openProofModal(order.proof)}
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
                        order.status === "accepted"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      } text-white`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <button
                    onClick={() => handleClickOrder(order.id, "claimed")} // Pass the order ID and new status here
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Claim
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {isProofModalOpen && selectedProof && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md">
              <button
                onClick={closeProofModal}
                className="absolute top-2 right-2 text-black"
              >
                X
              </button>
              <h2 className="text-lg mb-4">Proof of Purchase</h2>
              <Image
                src={selectedProof}
                alt="Proof of Purchase"
                width={500}
                height={400}
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
                {/* Check if selectedOrderDetails is an array or a single object */}
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

export default OrderList;
