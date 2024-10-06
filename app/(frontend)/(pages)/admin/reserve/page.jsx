"use client";
import React, { useState, useEffect } from "react";

const ReservationDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedReservation, setUpdatedReservation] = useState({});

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("/api/reserve");
        if (!response.ok) {
          throw new Error("Failed to fetch reservations");
        }
        const data = await response.json();
        setReservations(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleDelete = async (reservationId) => {
    if (confirm("Are you sure you want to delete this reservation?")) {
      try {
        const response = await fetch(`/api/reserve/${reservationId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete reservation");
        }
        setReservations(
          reservations.filter((reservation) => reservation.id !== reservationId)
        );
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleUpdate = (reservation) => {
    setSelectedReservation(reservation);
    setUpdatedReservation(reservation);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setUpdatedReservation({
      ...updatedReservation,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/reserve/${updatedReservation.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedReservation),
      });
      if (!response.ok) {
        throw new Error("Failed to update reservation");
      }
      const updatedData = await response.json();
      setReservations(
        reservations.map((reservation) =>
          reservation.id === updatedData.id ? updatedData : reservation
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
            <a
              href="/admin/reserve"
              className="block py-2 px-4 rounded-md bg-gray-900 text-white"
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
      <main className="flex-1 bg-white p-10">
        <h2 className="text-3xl font-semibold text-black mb-8">
          Reservation Dashboard
        </h2>

        {/* Reservations Table */}
        <section>
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-[rgb(255,211,70)] text-black">
              <tr>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Select
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  User Id
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Item Id
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr
                  key={reservation.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="border px-4 py-3">
                    <input type="checkbox" />
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {reservation.id}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {reservation.itemId}
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
                    <button
                      onClick={() => handleUpdate(reservation)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(reservation.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <span className="text-sm text-gray-600">
              {reservations.length} results
            </span>
            <div className="flex space-x-2">
              <button className="bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700">
                «
              </button>
              <button className="bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700">
                1
              </button>
              <button className="bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700">
                2
              </button>
              <button className="bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700">
                3
              </button>
              <button className="bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700">
                »
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Update Reservation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 sticky top-0">
            <h3 className="text-xl font-semibold mb-4">Update Reservation</h3>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="reservationId">
                Reservation ID
              </label>
              <input
                type="text"
                id="reservationId"
                name="id"
                value={updatedReservation.id}
                onChange={handleChange}
                readOnly
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="itemName">
                Item Name
              </label>
              <input
                type="text"
                id="itemName"
                name="itemId"
                value={updatedReservation.itemId}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="reserveDateTime">
                Reserve Date & Time
              </label>
              <input
                type="datetime-local"
                id="reserveDateTime"
                name="reserveDateTime"
                value={new Date(updatedReservation.reserveDateTime)
                  .toISOString()
                  .substring(0, 16)}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="returnDateTime">
                Return Date & Time
              </label>
              <input
                type="datetime-local"
                id="returnDateTime"
                name="returnDateTime"
                value={new Date(updatedReservation.returnDateTime)
                  .toISOString()
                  .substring(0, 16)}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="purpose">
                Purpose
              </label>
              <textarea
                id="purpose"
                name="purpose"
                value={updatedReservation.purpose}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="ml-2 bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationDashboard;
