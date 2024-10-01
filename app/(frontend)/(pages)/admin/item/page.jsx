"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadImage } from "/Users/Bernadeth Caballero/Desktop/JOSWA/ssg/lib/imageUpload"; // Adjust the import path as needed

const ItemReservationPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [itemType, setItemType] = useState("TV");
  const [itemStatus, setItemStatus] = useState("Available");

  // Check session status and redirect accordingly
  useEffect(() => {
    if (status === "loading") return; // Wait until the session is loaded
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (session?.user?.role !== "ADMIN") {
      router.push("/"); // Ensure only admins can access this page
    }
  }, [session, status, router]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      if (!file) {
        throw new Error("Please select a file to upload.");
      }

      // Upload the image using your custom upload function
      const imageUrl = await uploadImage(file);
      console.log("Uploaded file available at:", imageUrl); // Log the uploaded image URL

      // Now call the reserve item API with the uploaded image URL
      const reserveResponse = await fetch("/api/reserveitem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: itemType, // Use item type from form state
          status: itemStatus, // Use item status from form state
          image: imageUrl, // Use the uploaded image URL
        }),
      });

      if (!reserveResponse.ok) {
        throw new Error("Failed to create item in database");
      }

      const reserveData = await reserveResponse.json();
      console.log("Item created:", reserveData);

      // Optionally clear the input fields or provide feedback
      setFile(null);
      setItemType("TV");
      setItemStatus("Available");
    } catch (error) {
      console.error("Error uploading image or creating item:", error);
      alert(error.message); // Alert the user in case of an error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white p-8 border border-gray-200 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Admin Reservation Page
        </h1>
        <h2 className="text-xl font-semibold mb-4">Upload Items</h2>
        <form onSubmit={handleUpload}>
          <label className="block text-gray-700 font-semibold mb-1">
            Item Type:
          </label>
          <select
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          >
            <option value="TV">TV</option>
            <option value="Chairs">Chairs</option>
            <option value="Camera">Camera</option>
            <option value="Table">Table</option>
          </select>

          <label className="block text-gray-700 font-semibold mb-1">
            Status:
          </label>
          <select
            value={itemStatus}
            onChange={(e) => setItemStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          >
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>

          <label className="block text-gray-700 font-semibold mb-1 mt-4">
            Upload Image:
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemReservationPage;
