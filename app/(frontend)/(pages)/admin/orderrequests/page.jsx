"use client";
import React, { useState, useEffect } from "react";

const Purchase = () => {
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

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

  // Toggle claim/unclaim status
  const toggleClaim = async (index, id) => {
    try {
      const updatedStatus =
        purchases[index].status === "claimed" ? "unclaimed" : "claimed";

      const response = await fetch(`/api/order/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updatedStatus }),
      });

      if (response.ok) {
        const updatedPurchases = [...purchases];
        updatedPurchases[index].status = updatedStatus;
        setPurchases(updatedPurchases);
      } else {
        throw new Error("Failed to update claim status.");
      }
    } catch (error) {
      setError(error.message);
    }
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
                  Claim Status
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
                    {purchase.merchId}
                  </td>

                  <td className="border px-4 py-3 text-sm text-center">
                    {purchase.proof}
                  </td>
                  <td className="border px-4 py-3 text-sm text-center">
                    <span
                      className={`px-3 py-1 rounded-full ${
                        purchase.status === "claimed"
                          ? "bg-green-500"
                          : purchase.status === "unclaimed"
                          ? "bg-red-500"
                          : purchase.status === "accepted"
                          ? "bg-blue-500"
                          : "bg-gray-500"
                      } text-white text-xs`}
                    >
                      {purchase.status}
                    </span>
                  </td>
                  <td className="border px-4 py-3 text-sm text-center">
                    <button
                      onClick={() => toggleClaim(index, purchase.id)}
                      className="bg-[rgb(255,211,70)] text-black px-3 py-1 rounded text-xs"
                    >
                      {purchase.status === "claimed" ? "Unclaim" : "Claim"}
                    </button>
                  </td>
                  <td className="border px-4 py-3 text-sm text-center">
                    <button
                      onClick={() => acceptOrder(index, purchase.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded text-xs mr-2"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => declineOrder(index, purchase.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Decline
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

export default Purchase;
