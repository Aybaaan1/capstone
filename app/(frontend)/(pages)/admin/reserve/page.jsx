"use client";
import React, { useState, useEffect } from "react";

const ReservationDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("/api/reserve"); // Adjust the endpoint if needed
        if (!response.ok) {
          throw new Error("Failed to fetch reservations");
        }
        const data = await response.json();
        // Filter out reservations that are not "borrowed"
        const filteredData = data.filter((item) => item.status === "pending");
        setReservations(filteredData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleAccept = async (reservationId) => {
    try {
      const response = await fetch(`/api/returned`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: reservationId, status: "borrowed" }), // Changing status to "accepted"
      });

      if (!response.ok) {
        throw new Error("Failed to update reservation status");
      }

      await response.json();

      // Remove the reservation from local state
      setReservations((prevReservations) =>
        prevReservations.filter((res) => res.id !== reservationId)
      );
    } catch (error) {
      console.error("Error updating reservation status:", error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const reservation = reservations.filter((item) => {
    const matchesSearch = item.userId.toString().includes(searchId);

    return matchesSearch;
  });
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
                    className="block py-2 px-4 rounded-md bg-gray-900 text-white"
                  >
                    Borrow Items
                  </a>
                </li>
                <li>
                  <a
                    href="/admin/return"
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

      <main className="flex-1 bg-white p-10">
        <h2 className="text-3xl font-semibold text-black mb-8">
          Borrow Items Request
        </h2>
        <input
          type="text"
          placeholder="Search by User ID" // Updated placeholder
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="border rounded-md mb-3 p-2 ml-4"
        />
        <section>
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-[rgb(255,211,70)] text-black">
              <tr>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Id
                </th>

                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Item
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  User Id
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Reserve Date & Time
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Return Date & Time
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Purpose
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
              {reservation.map((reservation) => (
                <tr
                  key={reservation.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {reservation.id}
                  </td>

                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {reservation.item?.type}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {reservation.userId}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {new Date(reservation.reserveDateTime).toLocaleString()}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {new Date(reservation.returnDateTime).toLocaleString()}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {reservation.purpose}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {reservation.status}
                  </td>

                  <td className="border px-4 py-3 text-sm text-gray-800">
                    <button
                      onClick={() => handleAccept(reservation.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                      Reject
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

export default ReservationDashboard;
