"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Proof from "../../../(components)/_components/Proof";

const LostAndFound = () => {
  const [lostFoundItems, setLostFoundItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [filter, setFilter] = useState("all");
  const [proofModalVisible, setProofModalVisible] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  useEffect(() => {
    const fetchLostFoundItems = async () => {
      try {
        const response = await fetch("/api/item");
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setLostFoundItems(data);
      } catch (error) {
        console.error("Error fetching lost and found items:", error);
      }
    };

    fetchLostFoundItems();
  }, []);

  const acceptItem = async (index) => {
    const updatedItems = [...lostFoundItems];
    updatedItems[index].status = "Accepted";
    setLostFoundItems(updatedItems);

    try {
      await updateItemStatus(updatedItems[index].id, "Accepted");
    } catch (error) {
      console.error("Failed to update status in the database:", error);
      updatedItems[index].status = "Pending"; // Rollback to previous status
      setLostFoundItems(updatedItems);
    }
  };

  const declineItem = async (index) => {
    const itemId = lostFoundItems[index].id;
    const updatedItems = lostFoundItems.filter((_, i) => i !== index);
    setLostFoundItems(updatedItems);

    await deleteItemFromDatabase(itemId);
  };

  const updateItemStatus = async (id, status) => {
    try {
      const response = await fetch(`/api/item/${id}`, {
        // Correct URL structure
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }), // Send status in the body
      });
      if (!response.ok) {
        throw new Error("Failed to update item status");
      }
    } catch (error) {
      console.error("Error updating item status:", error);
    }
  };

  const deleteItemFromDatabase = async (id) => {
    try {
      const response = await fetch(`/api/item/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const showDetails = (index) => {
    setSelectedItem(lostFoundItems[index]);
    setModalVisible(true);
  };

  const openProofModal = (imageSrc) => {
    setSelectedImageSrc(imageSrc);
    setProofModalVisible(true);
  };

  const filteredItems = lostFoundItems.filter((item) => {
    const matchesSearch = item.userId.toString().includes(searchId);
    const matchesFilter = filter === "all" || item.type === filter;
    return matchesSearch && matchesFilter;
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
              </ul>
            )}
          </li>
          <li>
            <a
              href="/admin/lostfound"
              className="block py-2 px-4 rounded-md bg-gray-900 text-white"
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

      <main className="flex-1 p-10 bg-white">
        <header className="flex justify-between mb-8">
          <h2 className="text-3xl font-semibold text-black">
            Lost & Found Dashboard
          </h2>
        </header>

        {/* Filter Buttons */}
        <div className="mb-4 flex items-center space-x-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md ${
              filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("lost")}
            className={`mr-2 px-4 py-2 rounded-md ${
              filter === "lost" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Lost
          </button>
          <button
            onClick={() => setFilter("found")}
            className={`mr-2 px-4 py-2 rounded-md ${
              filter === "found" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Found
          </button>
          <input
            type="text"
            placeholder="Search by User ID" // Updated placeholder
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="border rounded-md p-2 ml-4"
          />
        </div>

        <section>
          <table className="w-full text-left bg-white rounded-lg shadow-md border-collapse">
            <thead className="bg-[rgb(255,211,70)] text-black">
              <tr>
                {[
                  "ID",
                  "User ID",
                  "Name",
                  "Type",
                  "Date",
                  "Time",
                  "Place",
                  "Image",
                  "Status",
                  "Actions",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="border-gray-200 border p-4 text-sm font-semibold"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-3 text-sm">{item.id}</td>
                  <td className="border px-4 py-3 text-sm">{item.userId}</td>
                  <td className="border px-4 py-3 text-sm">{item.name}</td>
                  <td className="border px-4 py-3 text-sm">{item.type}</td>
                  <td className="border px-4 py-3 text-sm">
                    {new Date(item.dateTime).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-3 text-sm">
                    {new Date(item.dateTime).toLocaleTimeString()}
                  </td>
                  <td className="border px-4 py-3 text-sm">{item.place}</td>
                  <td className="border px-4 py-3 text-sm">
                    {item.image ? (
                      <>
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                          onClick={() => openProofModal(item.image)}
                        >
                          View
                        </button>
                      </>
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td className="border px-4 py-3 text-sm">
                    {item.status || "Pending"}
                  </td>
                  <td className="border px-4 py-3 text-sm">
                    <button
                      className="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 mr-2"
                      onClick={() => acceptItem(index)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-red-700"
                      onClick={() => declineItem(index)}
                    >
                      Claimed
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <Proof
          isOpen={proofModalVisible}
          onClose={() => setProofModalVisible(false)}
          imageSrc={selectedImageSrc}
        />

        {/* Modal implementation here */}
        {modalVisible && selectedItem && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h3 className="text-lg font-bold">{selectedItem.name}</h3>
              <p>
                <strong>ID:</strong> {selectedItem.id}
              </p>
              <p>
                <strong>User ID:</strong> {selectedItem.userId}
              </p>
              <p>
                <strong>Type:</strong> {selectedItem.type}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedItem.dateTime).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {new Date(selectedItem.dateTime).toLocaleTimeString()}
              </p>
              <p>
                <strong>Place:</strong> {selectedItem.place}
              </p>
              {selectedItem.image && (
                <Image
                  src={selectedItem.image}
                  alt="Item"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              )}
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => setModalVisible(false)}
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

export default LostAndFound;
