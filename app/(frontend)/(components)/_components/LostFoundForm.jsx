"use client";
import { useState } from "react";

const LostFoundForm = ({
  formLabel,
  setClose,
  selectedItemId,
  currentUserId,
}) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("Lost"); // Default is "Lost"
  const [place, setPlace] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("itemId", selectedItemId);
    formData.append("userId", currentUserId);
    formData.append("reserveDateTime", dateTime);
    formData.append("returnDateTime", dateTime);
    formData.append("purpose", name);
    formData.append("file", file);
    formData.append("type", type); // Adding the selected type (Lost or Found)

    const response = await fetch("/api/item", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Reservation successful!");
      setClose();
    } else {
      const errorData = await response.json();
      console.error("Error details:", errorData);
      alert("Error: ${errorData.error}");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="relative w-[90%] max-w-[500px] bg-white shadow-lg p-8 rounded-lg flex flex-col"
      >
        <button
          type="button"
          onClick={setClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ❌
        </button>

        <h3 className="text-2xl font-bold mb-4 text-center">{formLabel}</h3>
        <p className="text-center">
          Please provide details about the Reported Item.
        </p>

        <div className="flex mt-6">
          <div className="flex-2 pr-10">
            {/* Dropdown for Type (Lost or Found) */}
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-sm font-semibold text-gray-700"
              >
                Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="p-2 mt-1 w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                required
              >
                <option value="Lost">Lost Item</option>
                <option value="Found">Found Item</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="p-2 mt-1 w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="place"
                className="block text-sm font-semibold text-gray-700"
              >
                Place
              </label>
              <input
                type="text"
                id="place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="Where was it lost or found?"
                className="p-2 mt-1 w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="dateTime"
                className="block text-sm font-semibold text-gray-700"
              >
                Date and Time
              </label>
              <input
                type="datetime-local"
                id="dateTime"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="p-2 mt-1 w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                required
              />
            </div>
          </div>

          {/* File Upload Section */}
          <div className="flex-shrink-5">
            <label
              htmlFor="fileUpload"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Upload File
            </label>
            <div className="w-28 h-28 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center">
              <input
                type="file"
                id="fileUpload"
                onChange={handleFileUpload}
                className="absolute w-32 h-32 opacity-0 cursor-pointer"
              />
              <span className="text-gray-500 text-sm">Click to upload</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-full text-sm"
        >
          Report Now
        </button>
      </form>
    </div>
  );
};

export default LostFoundForm;
