"use client"; // Ensure this is included at the top of your file
import React, { useState, useEffect } from "react";
import Proof from "../../../(components)/_components/Proof";

const Dashboard = () => {
  const [assistances, setAssistances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const fetchAssistances = async () => {
      try {
        const response = await fetch("/api/assistance");
        if (!response.ok) {
          throw new Error("Failed to fetch assistance records");
        }
        const data = await response.json();
        setAssistances(data); // Assuming the data is an array of assistance records
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAssistances();
  }, []);

  const handleStatusChange = async (id, action) => {
    try {
      if (action === "rejected") {
        // Make a DELETE request to remove the assistance record from the database
        const response = await fetch(`/api/assistance/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(
            `Failed to delete assistance record: ${response.statusText}`
          );
        }

        // Filter out the deleted assistance record from the state
        const updatedAssistances = assistances.filter(
          (assistance) => assistance.id !== id
        );
        setAssistances(updatedAssistances);
      } else {
        // Update the status of the assistance record locally for "accepted" action
        const updatedAssistances = assistances.map((assistance) =>
          assistance.id === id
            ? { ...assistance, status: "accepted" }
            : assistance
        );
        setAssistances(updatedAssistances);

        // Send an update request to the backend
        const response = await fetch(`/api/assistance/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "accepted" }),
        });

        if (!response.ok) {
          throw new Error(`Failed to update status: ${response.statusText}`);
        }
      }
    } catch (error) {
      console.error("Error handling status change:", error);
      alert("Failed to process the request. Please try again.");
    }
  };

  // Open the modal with the selected image
  const openModal = (imageSrc) => {
    setCurrentImage(imageSrc);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage("");
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
              className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Reservation
            </a>
          </li>

          <li>
            <a
              href="/admin/tambayayong"
              className="block py-2 px-4 rounded-md bg-gray-900 text-white"
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
      <main className="flex-1 bg-white p-10">
        <h2 className="text-3xl font-semibold text-black mb-8">
          Assistance Dashboard
        </h2>

        {/* Assistance Table */}
        <section>
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-[rgb(255,211,70)] text-black">
              <tr>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  ID
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  User ID
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Patient
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Date & Time
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  GCash
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
              {assistances.map((assistance) => (
                <tr
                  key={assistance.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {assistance.id}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {assistance.userId}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {assistance.name}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {assistance.patience}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {new Date(assistance.dateTime).toLocaleString()}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {assistance.gcash}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {assistance.proof ? (
                      <button
                        onClick={() => openModal(assistance.proof)}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      >
                        View
                      </button>
                    ) : (
                      "No proof available"
                    )}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800">
                    {assistance.status}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-800 flex space-x-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                      onClick={() =>
                        handleStatusChange(assistance.id, "accepted")
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() =>
                        handleStatusChange(assistance.id, "rejected")
                      }
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Modal for Image Preview */}
        <Proof
          isOpen={isModalOpen}
          onClose={closeModal}
          imageSrc={currentImage}
        />
      </main>
    </div>
  );
};

export default Dashboard;
