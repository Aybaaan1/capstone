"use client";
import { useState } from "react";

const LostFoundForm = ({
  formLabel,
  setClose,
  selectedItemId,
  currentUserId,
}) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [place, setPlace] = useState("");
  const [dateTime, setDateTime] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/reserve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId: selectedItemId, // Ensure this value is correctly passed in
        userId: currentUserId, // Ensure this value is correctly passed in
        reserveDateTime: dateTime, // Use the selected datetime
        returnDateTime: dateTime, // Adjust this as needed
        purpose: name, // Use the name as the purpose
      }),
    });

    if (response.ok) {
      alert("Reservation successful!");
      setClose(); // Close the modal after submission
    } else {
      const errorData = await response.json();
      console.error("Error details:", errorData); // Log the error details to the console
      alert(`Error: ${errorData.error}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="relative w-[80%] max-w-[900px] bg-white shadow-lg p-10 flex"
      >
        <button
          type="button"
          onClick={setClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
        >
          ❌
        </button>
        <div className="p-8 flex-1">
          <h3 className="text-3xl font-bold mb-4">{formLabel}</h3>
          <p>Please provide details about the reservation.</p>

          <div className="mt-6">
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

          <div className="grid grid-cols-2 mt-4 gap-4">
            <div>
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
                placeholder="Where will it be used?"
                className="mt-1.5 w-full p-2 rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                required
              />
            </div>

            <div>
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
                className="mt-1.5 w-full p-2 rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary text-white py-2 col-span-2 rounded-3xl mt-4"
          >
            Reserve Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default LostFoundForm;
