"use client";
import React, { useState } from "react";
import { Calendar } from "@nextui-org/react";
import { today, getLocalTimeZone, isWeekend } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

const ReservationForm = ({
  formLabel,
  onClose,
  itemId,
  onReservationSuccess,
}) => {
  const [userId, setUserId] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reservationData = {
      itemId, // Pass the item ID or text here
      userId,
      reserveDateTime,
      returnDateTime,
      purpose,
    };

    try {
      const response = await fetch("/api/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });
      if (!response.ok) throw new Error("Failed to reserve item");
      await onReservationSuccess(); // Refresh reservations
      onClose(); // Close form on success
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] bg-white shadow-lg p-10 flex"
      onSubmit={handleSubmit}
    >
      <div className="p-8 flex-1">
        <button onClick={onClose} className="absolute top-6 right-6">
          ❌
        </button>
        <h3 className="text-3xl font-bold mb-4">{formLabel}</h3>

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
            placeholder="Your name"
            className="p-2 mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-2 mt-4 gap-4">
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-semibold text-gray-700"
            >
              Department
            </label>
            <select
              name="department"
              id="department"
              className="mt-1.5 w-full p-2 rounded-lg border-gray-300 text-gray-700 sm:text-sm"
              required
            >
              <option value="">From what Department?</option>
              <option value="JM">John Mayer</option>
              <option value="SRV">Stevie Ray Vaughn</option>
              {/* Add other options */}
            </select>
          </div>
          <div>
            <label
              htmlFor="item"
              className="block text-sm font-semibold text-gray-700"
            >
              Item
            </label>
            <select
              name="item"
              id="item"
              className="mt-1.5 w-full p-2 rounded-lg border-gray-300 text-gray-700 sm:text-sm"
              defaultValue={itemId}
              required
            >
              <option value="">Select an item</option>
              <option value="TV">TV</option>
              <option value="Tables">Tables</option>
              {/* Add other options */}
            </select>
          </div>
          <div>
            <label
              htmlFor="reserveDateTime"
              className="block text-sm font-medium text-gray-700"
            >
              Reserve Date
            </label>
            <input
              type="datetime-local"
              id="reserveDateTime"
              className="mt-1.5 p-2 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
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
              className="mt-1.5 p-2 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
              value={returnDateTime}
              onChange={(e) => setReturnDateTime(e.target.value)}
              required
            />
          </div>
          <div>
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
              className="p-2 mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-primary text-white py-2 col-span-2 rounded-3xl mt-4"
            type="submit"
          >
            Reserve Now
          </button>
        </div>
      </div>
      <div className="flex-1 h-full">
        <h3 className="text-xl font-bold mb-4">Calendar</h3>
        <div>
          <Calendar
            aria-label="Date (Unavailable)"
            isDateUnavailable={isDateUnavailable}
          />
        </div>
      </div>
    </form>
  );
};

export default ReservationForm;
