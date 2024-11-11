"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadImage } from "/Users/Bernadeth Caballero/Desktop/JOSWA/ssg/lib/imageUpload"; // Adjust the import path as needed

const ReserveItemDashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [itemType, setItemType] = useState("TV");
  const [itemStatus, setItemStatus] = useState("Available");

  // Fetch all items from the database
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/reserveitem");
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Handle file change for image upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission to add an item
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      if (!file) throw new Error("Please select a file to upload.");
      const imageUrl = await uploadImage(file);

      const reserveResponse = await fetch("/api/reserveitem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: itemType,
          status: itemStatus,
          image: imageUrl,
        }),
      });

      if (!reserveResponse.ok)
        throw new Error("Failed to create item in database");

      const newItem = await reserveResponse.json();
      setItems((prevItems) => [...prevItems, newItem]);
      setIsAddItemModalOpen(false); // Close the modal after adding
      setFile(null);
      setItemType("TV");
      setItemStatus("Available");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <nav className="w-64 bg-[rgb(255,211,70)] text-black p-6">
        <div className="logo mb-10">
          <h1 className="text-3xl font-bold tracking-wide">SSG CONNECT</h1>
        </div>
        <ul className="space-y-4">
          {/* Sidebar links */}
          <li>
            <a
              href="/admin"
              className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Users
            </a>
          </li>
          {/* Add additional sidebar links here */}
          <li>
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
                    className="block py-2 px-4 rounded-md bg-gray-900 text-white"
                  >
                    Available Items
                  </a>
                </li>
                {/* Other submenu items */}
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-white p-10">
        <h2 className="text-3xl font-semibold text-black mb-8">
          Reserve Item Dashboard
        </h2>

        {/* Add Item Button */}
        <button
          onClick={() => setIsAddItemModalOpen(true)}
          className="mb-6 px-4 py-2 bg-[rgb(255,211,70)] text-black font-semibold rounded-md hover:bg-[rgb(255,200,60)]"
        >
          + Add Item
        </button>

        {/* Table displaying items */}
        <section>
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-[rgb(255,211,70)] text-black">
              <tr>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  ID
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Type
                </th>
                <th className="border-gray-200 border p-3 text-left text-sm font-semibold">
                  Status
                </th>
                {/* Additional columns */}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="border-gray-200 p-3 text-sm">{item.id}</td>
                  <td className="border-gray-200 p-3 text-sm">{item.type}</td>
                  <td className="border-gray-200 p-3 text-sm">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Add Item Modal */}
        {isAddItemModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4 text-black">
                Add Item
              </h2>
              <form onSubmit={handleAddItem}>
                <label className="block text-gray-700 font-semibold mb-2">
                  Item Type:
                </label>
                <select
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
                >
                  <option value="TV">TV</option>
                  <option value="Chairs">Chairs</option>
                  <option value="Camera">Camera</option>
                  <option value="Table">Table</option>
                </select>

                <label className="block text-gray-700 font-semibold mb-2">
                  Status:
                </label>
                <select
                  value={itemStatus}
                  onChange={(e) => setItemStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
                >
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>

                <label className="block text-gray-700 font-semibold mb-2">
                  Upload Image:
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
                />

                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
                >
                  Submit
                </button>
              </form>

              {/* Close Modal Button */}
              <button
                onClick={() => setIsAddItemModalOpen(false)}
                className="mt-4 w-full text-center text-gray-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ReserveItemDashboard;
