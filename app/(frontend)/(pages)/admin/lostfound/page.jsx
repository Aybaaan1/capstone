"use client";
import { useState } from "react";
import Image from "next/image";

const lostFoundItems = [
  {
    id: 1,
    userId: 101,
    username: "john_doe",
    type: "Wallet",
    date: "2024-09-10",
    time: "14:30",
    place: "Library",
    image: "/img/una.jpg",
  },
  {
    id: 2,
    userId: 102,
    username: "jane_smith",
    type: "Phone",
    date: "2024-09-12",
    time: "09:15",
    place: "Cafeteria",
    image: "/img/una.jpg",
  },
  {
    id: 3,
    userId: 103,
    username: "mark_jones",
    type: "Keys",
    date: "2024-09-14",
    time: "11:45",
    place: "Gym",
    image: "/img/una.jpg",
  },
];

export default function LostAndFound() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const showDetails = (index) => {
    setSelectedItem(lostFoundItems[index]);
    setModalVisible(true);
  };

  const acceptItem = (index) => {
    alert(`Accepted item from ${lostFoundItems[index].username}`);
  };

  const declineItem = (index) => {
    alert(`Declined item from ${lostFoundItems[index].username}`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <nav className="w-64 bg-[rgb(255,211,70)] text-black p-6">
        <h1 className="text-3xl font-bold mb-10 tracking-wide">SSG CONNECT</h1>
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
              className="block py-2 px-4 rounded-md bg-gray-900 text-white"
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
      <main className="flex-1 p-10 bg-white">
        <header className="flex justify-between mb-8">
          <h2 className="text-3xl font-semibold text-black">
            Lost & Found Dashboard
          </h2>
          <div className="flex space-x-4">
            <button className="text-2xl">🔔</button>
            <button className="text-2xl">❓</button>
            <button className="text-2xl">👤</button>
          </div>
        </header>

        {/* Lost and Found Table */}
        <section>
          <table className="w-full text-left bg-white rounded-lg shadow-md border-collapse">
            <thead className="bg-[rgb(255,211,70)] text-black">
              <tr>
                <th className="border-gray-200 border p-4 text-sm font-semibold">
                  ID
                </th>
                <th className="border-gray-200 border p-4 text-sm font-semibold">
                  User ID
                </th>
                <th className="border-gray-200 border p-4 text-sm font-semibold">
                  Username
                </th>
                <th className="border-gray-200 border p-4 text-sm font-semibold">
                  Type
                </th>
                <th className="border-gray-200 border p-4 text-sm font-semibold">
                  Date
                </th>
                <th className="border-gray-200 border p-4 text-sm font-semibold">
                  Time
                </th>
                <th className="border-gray-200 border p-4 text-sm font-semibold">
                  Place
                </th>
                <th className="border-gray-200 border p-4 text-sm font-semibold">
                  Image
                </th>
                <th className="border-gray-200 border p-4 text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {lostFoundItems.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-3 text-sm">{item.id}</td>
                  <td className="border px-4 py-3 text-sm">{item.userId}</td>
                  <td className="border px-4 py-3 text-sm">{item.username}</td>
                  <td className="border px-4 py-3 text-sm">{item.type}</td>
                  <td className="border px-4 py-3 text-sm">{item.date}</td>
                  <td className="border px-4 py-3 text-sm">{item.time}</td>
                  <td className="border px-4 py-3 text-sm">{item.place}</td>
                  <td className="border px-4 py-3">
                    <Image
                      src={item.image}
                      alt="Item"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </td>
                  <td className="border px-4 py-3 text-sm">
                    <button
                      className="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 mr-2"
                      onClick={() => acceptItem(index)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700"
                      onClick={() => declineItem(index)}
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Modal */}
        {modalVisible && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 relative">
              <button
                className="absolute top-3 right-4 text-2xl text-gray-600"
                onClick={() => setModalVisible(false)}
              >
                &times;
              </button>
              <h3 className="text-xl mb-4 font-semibold">Lost Item Details</h3>
              <p>
                <strong>ID:</strong> {selectedItem.id}
              </p>
              <p>
                <strong>User ID:</strong> {selectedItem.userId}
              </p>
              <p>
                <strong>Username:</strong> {selectedItem.username}
              </p>
              <p>
                <strong>Type:</strong> {selectedItem.type}
              </p>
              <p>
                <strong>Date:</strong> {selectedItem.date}
              </p>
              <p>
                <strong>Time:</strong> {selectedItem.time}
              </p>
              <p>
                <strong>Place:</strong> {selectedItem.place}
              </p>
              <Image
                src={selectedItem.image}
                alt="Item"
                width={200}
                height={200}
                className="rounded-lg mt-4"
              />
              <button
                className="mt-6 bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500"
                onClick={() => setModalVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
