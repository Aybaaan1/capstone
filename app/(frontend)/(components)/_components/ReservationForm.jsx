import React, { useState } from "react";
import { useSession } from "next-auth/react"; // Import useSession

const ReservationForm = ({
  formLabel,
  onClose,
  itemId,
  onReservationSuccess,
}) => {
  const { data: session } = useSession(); // Access the session
  const userId = session?.user?.id; // Assuming the user ID is stored in session.user.id

  const [purpose, setPurpose] = useState("");
  const [reserveDateTime, setReserveDateTime] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [returnDateTime, setReturnDateTime] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const handleSubmit = async (event) => {
    event.preventDefault();

    const reservationData = {
      itemId,
      userId,
      reserveDateTime,
      returnDateTime,
      purpose,
    };

    console.log("Reservation data to be sent:", reservationData); // Debug log

    try {
      const response = await fetch("/api/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData), // Send the dynamic reservation data
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Reservation created:", result);
      if (onReservationSuccess) onReservationSuccess(result); // Call success callback if provided
    } catch (error) {
      console.error("Error submitting reservation:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center z-50">
      <form
        className="relative w-[80%] lg:w-[60%] bg-white shadow-lg p-6 rounded-lg flex"
        onSubmit={handleSubmit}
      >
        <div className="flex-1 pr-4">
          <button onClick={onClose} className="absolute top-6 right-6">
            ❌
          </button>
          <h3 className="text-2xl font-bold mb-4 text-center">{formLabel}</h3>

          <div className="grid grid-cols-2 mt-4 gap-2">
            <div>
              <label
                htmlFor="reserveDateTime"
                className="block text-sm font-semibold text-gray-700"
              >
                Reserve Date
              </label>
              <input
                type="datetime-local"
                id="reserveDateTime"
                className="mt-1.5 p-2 w-full rounded-md border-gray-300 text-gray-700 sm:text-sm"
                value={reserveDateTime}
                onChange={(e) => setReserveDateTime(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="returnDateTime"
                className="block text-sm font-semibold text-gray-700"
              >
                Return Date
              </label>
              <input
                type="datetime-local"
                id="returnDateTime"
                className="mt-1.5 p-2 w-full rounded-md border-gray-300 text-gray-700 sm:text-sm"
                value={returnDateTime}
                onChange={(e) => setReturnDateTime(e.target.value)}
                required
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="purpose"
                className="block text-sm font-semibold text-gray-700"
              >
                Purpose
              </label>
              <input
                type="text"
                id="purpose"
                placeholder="Purpose of reservation"
                className="p-2 mt-1 w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                required
              />
            </div>
          </div>

          <button className="bg-primary text-white py-2 rounded-md mt-4 w-full">
            Reserve Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
