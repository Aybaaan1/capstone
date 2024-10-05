"use client";
import React, { useState, useEffect } from "react";
import { Calendar } from "@nextui-org/react";
import { today, getLocalTimeZone, isWeekend } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { useSession } from "next-auth/react"; // Import useSession

const ReservationForm = ({
  formLabel,
  onClose,
  itemId,
  onReservationSuccess,
}) => {
  const [userId, setUserId] = useState(null); // Initialize userId to null
  const [purpose, setPurpose] = useState("");
  const [reserveDateTime, setReserveDateTime] = useState("");
  const [returnDateTime, setReturnDateTime] = useState("");

  let now = today(getLocalTimeZone());

  let disabledRanges = [
    [now, now.add({ days: 5 })],
    [now.add({ days: 14 }), now.add({ days: 16 })],
    [now.add({ days: 23 }), now.add({ days: 24 })],
  ];

  let { locale } = useLocale();

  let isDateUnavailable = (date) =>
    isWeekend(date, locale) ||
    disabledRanges.some(
      (interval) =>
        date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
    );

  // Use the useSession hook
  const { data: session, status } = useSession();

  // Fetch the user ID when the session is authenticated
  useEffect(() => {
    if (status === "authenticated" && session) {
      setUserId(session.user.id);
    }
  }, [status, session]); // Dependency on 'status' and 'session'

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure itemId and userId are passed as integers
    const reservationData = {
      itemId: parseInt(itemId, 10), // Convert itemId to integer
      userId, // The userId is now from the session
      reserveDateTime: new Date(reserveDateTime).toISOString(), // Convert to ISO string
      returnDateTime: new Date(returnDateTime).toISOString(), // Convert to ISO string
      purpose,
    };

    console.log("Submitting reservation data:", reservationData);

    // Validate required fields
    if (
      !reservationData.itemId ||
      !reservationData.userId ||
      !reserveDateTime ||
      !returnDateTime ||
      !purpose
    ) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await fetch("/api/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to reserve item"}`);
        return;
      }

      await onReservationSuccess();
      onClose();
    } catch (error) {
      alert(`Error: ${error.message}`);
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

          <div className="mt-2">
            <label
              htmlFor="department"
              className="block text-sm font-semibold text-gray-700"
            >
              Department
            </label>
            <select
              name="department"
              id="department"
              className="mt-1.5 w-full p-2 rounded-md border-gray-300 text-gray-700 sm:text-sm"
              required
            >
              <option value="">From what Department?</option>
              <option value="COEd">COEd</option>
              <option value="CAS">CAS</option>
              {/* Add other department options */}
            </select>
          </div>

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

        <div className="flex-1 h-full">
          <h3 className="text-xl font-bold mb-4 text-center">Calendar</h3>
          <div>
            <Calendar
              aria-label="Date (Unavailable)"
              isDateUnavailable={isDateUnavailable}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
