import { useState } from "react";
import { uploadImage } from "@/lib/imageUpload"; // Adjust path as needed
import { useSession } from "next-auth/react";

const LostAndFoundForm = ({ formLabel, setClose }) => {
  const { data: session } = useSession(); // Accessing session
  const userId = session?.user?.id; // Fetching userId from session

  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [type, setType] = useState(""); // Lost or Found
  const [dateTime, setDateTime] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [proofFile, setProofFile] = useState(null); // Store the file
  const [status] = useState("pending");
  const [loading, setLoading] = useState(false); // Loading state for submission
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading state

    // Upload the image and get the URL
    let imageUrl = "";
    if (proofFile) {
      try {
        imageUrl = await uploadImage(proofFile);
      } catch (uploadError) {
        setError("Failed to upload image. Please try again.");
        setLoading(false);
        return; // Exit if upload fails
      }
    }

    const itemData = {
      userId, // Make sure this is fetched correctly from the session
      name,
      place,
      dateTime,
      image: imageUrl,
      type,
      status,
    };

    try {
      const response = await fetch("/api/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });

      if (!response.ok) {
        throw new Error("Error submitting the form");
      }

      const result = await response.json();
      console.log("Response from server:", result);
      // Optionally reset the form or show a success message here
      setClose(); // Close form on success
    } catch (error) {
      console.error("Error submitting the form:", error);
      setError(
        "An error occurred while submitting the form. Please try again."
      );
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          {formLabel}
        </h2>

        {/* Close button */}
        <button onClick={setClose} className="absolute top-6 right-6">
          ❌
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type (Lost/Found)
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:outline-none"
            >
              <option value="">Select</option>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Item Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="place"
              className="block text-sm font-medium text-gray-700"
            >
              Place of Loss/Found
            </label>
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="dateTime"
              className="block text-sm font-medium text-gray-700"
            >
              Date and Time
            </label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="proof"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Proof
            </label>
            <input
              type="file"
              onChange={(e) => setProofFile(e.target.files[0])}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          {error && <p className="text-red-600">{error}</p>}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 text-white bg-primary rounded-md ${
                loading ? "opacity-50" : ""
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LostAndFoundForm;
