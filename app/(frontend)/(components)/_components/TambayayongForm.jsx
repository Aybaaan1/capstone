import { useSession } from "next-auth/react"; // Importing useSession
import { useState } from "react";
import { uploadImage } from "@/lib/imageUpload";

const TambayayongForm = ({ setClose }) => {
  const { data: session } = useSession(); // Accessing session
  const userId = session?.user?.id; // Fetching userId from session

  const [name, setName] = useState("");
  const [patience, setPatience] = useState("");
  const [gcash, setGcash] = useState("");
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

    // Upload the proof image and get the URL
    let proofUrl = "";
    if (proofFile) {
      try {
        proofUrl = await uploadImage(proofFile);
      } catch (uploadError) {
        setError("Failed to upload proof image. Please try again.");
        setLoading(false);
        return; // Exit if upload fails
      }
    }

    const assistanceData = {
      userId,
      name,
      patience,
      dateTime,
      gcash,
      proof: proofUrl, // Use the uploaded URL
      status,
    };

    try {
      const response = await fetch("/api/assistance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assistanceData),
      });

      if (!response.ok) {
        throw new Error("Error submitting the form");
      }

      const result = await response.json();
      console.log("Response from server:", result);
      // Optionally reset the form or show a success message here
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
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={setClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold text-center mb-4">
          Assistance Request Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="patience"
              className="block text-sm font-medium text-gray-700"
            >
              Patient
            </label>
            <input
              type="text"
              id="patience"
              value={patience}
              onChange={(e) => setPatience(e.target.value)}
              placeholder="Enter patient name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="gcash"
              className="block text-sm font-medium text-gray-700"
            >
              GCash Number
            </label>
            <input
              type="text"
              id="gcash"
              value={gcash}
              onChange={(e) => setGcash(e.target.value)}
              placeholder="Enter GCash number"
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
              id="dateTime"
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
          <button
            type="submit"
            className="w-full py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition duration-150"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default TambayayongForm;
