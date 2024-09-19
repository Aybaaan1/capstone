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
              href="#"
              className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Purchase
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Lost & Found
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 rounded-md bg-gray-900 text-white"
            >
              Reservation
            </a>
          </li>
          <li>
            <a
              href="#"
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
                  User ID
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Item ID
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
                    {reservation.userId}
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Update Reservation</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  User ID
                </label>
                <input
                  type="number"
                  name="userId"
                  value={updatedReservation.userId || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Item ID
                </label>
                <input
                  type="number"
                  name="itemId"
                  value={updatedReservation.itemId || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Reserve Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="reserveDateTime"
                  value={updatedReservation.reserveDateTime || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Return Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="returnDateTime"
                  value={updatedReservation.returnDateTime || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Purpose
                </label>
                <input
                  type="text"
                  name="purpose"
                  value={updatedReservation.purpose || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationDashboard;
