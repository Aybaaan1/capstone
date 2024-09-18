// app/(frontend)/(pages)/admin/Dashboard.jsx
import React from "react";

const users = [
  {
    img: "https://via.placeholder.com/40",
    name: "Elizabeth Lee",
    username: "julia_lopez",
    email: "real.danieljackson@hotmail.com",
    status: "offline",
  },
  {
    img: "https://via.placeholder.com/40",
    name: "Carlos Garcia",
    username: "davidjackson",
    email: "jessica_wilson@yahoo.com",
    status: "offline",
  },
  {
    img: "https://via.placeholder.com/40",
    name: "Elizabeth Bailey",
    username: "angel_gomez",
    email: "marktaylor@hotmail.com",
    status: "offline",
  },
  {
    img: "https://via.placeholder.com/40",
    name: "Ryan Brown",
    username: "jhill1995",
    email: "bharris@gmail.com",
    status: "offline",
  },
  {
    img: "https://via.placeholder.com/40",
    name: "Ryan Young",
    username: "lthompson96",
    email: "josephbennett84@hotmail.com",
    status: "online",
  },
  {
    img: "https://via.placeholder.com/40",
    name: "Hailey Adams",
    username: "ebrown89",
    email: "jacobmartinez@gmail.com",
    status: "online",
  },
];

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav className="w-64 bg-teal-600 text-white p-5">
        <div className="logo">
          <h1 className="text-2xl mb-5">SSG CONNECT</h1>
        </div>
        <ul>
          <li>
            <a href="#" className="block py-2">
              Users
            </a>
          </li>
          <li>
            <a href="#" className="block py-2">
              Purchase
            </a>
          </li>
          <li>
            <a href="#" className="block py-2">
              Lost&Found
            </a>
          </li>
          <li>
            <a href="#" className="block py-2">
              Reservation
            </a>
          </li>
          <li>
            <a href="#" className="block py-2">
              Tambayayong
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-white p-5">
        <h2 className="text-2xl text-teal-600 mb-5">Admin Dashboard</h2>

        {/* Users Table */}
        <section>
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-teal-600 text-white">
                <th className="border px-4 py-2">
                  <input type="checkbox" />
                </th>
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Username</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">
                    <input type="checkbox" />
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex items-center">
                      <img
                        src={user.img}
                        alt="profile"
                        className="rounded-full mr-2"
                      />
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-white ${
                        user.status === "online"
                          ? "bg-green-500"
                          : "bg-orange-500"
                      }`}
                    >
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <span>{users.length} results</span>
            <div>
              <button className="bg-teal-600 text-white px-3 py-1 rounded">
                «
              </button>
              <button className="bg-teal-600 text-white px-3 py-1 rounded">
                1
              </button>
              <button className="bg-teal-600 text-white px-3 py-1 rounded">
                2
              </button>
              <button className="bg-teal-600 text-white px-3 py-1 rounded">
                3
              </button>
              <button className="bg-teal-600 text-white px-3 py-1 rounded">
                »
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
