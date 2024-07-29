"use client";
import React from "react";
import { Calendar } from "@nextui-org/react";
import { today, getLocalTimeZone, isWeekend } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

const ReservationForm = ({ formLabel, setClose }) => {
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

  return (
    <form className="absolute top-0 left-1/2 -translate-x-1/2  w-[80%] bg-white shadow-lg p-10 flex">
      <div className="p-8 flex-1">
        <button onClick={setClose} className="absolute top-6 right-6">
          ❌
        </button>
        <h3 className="text-3xl font-bold mb-4">{formLabel}</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit.
        </p>

        <div className="mt-6">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700"
          >
            {" "}
            Your Name{" "}
          </label>

          <input
            type="text"
            id="name"
            placeholder="Your name"
            className="p-2 mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          />
        </div>
        <div className="grid grid-cols-2 mt-4 gap-4">
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-semibold text-gray-700 "
            >
              {" "}
              Department{" "}
            </label>

            <select
              name="department"
              id="department"
              className="mt-1.5 w-full p-2 rounded-lg border-gray-300 text-gray-700 sm:text-sm"
            >
              <option value="">From what Department?</option>
              <option value="JM">John Mayer</option>
              <option value="SRV">Stevie Ray Vaughn</option>
              <option value="JH">Jimi Hendrix</option>
              <option value="BBK">B.B King</option>
              <option value="AK">Albert King</option>
              <option value="BG">Buddy Guy</option>
              <option value="EC">Eric Clapton</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="place"
              className="block text-sm font-semibold text-gray-700"
            >
              {" "}
              Item{" "}
            </label>

            <select
              name="item"
              id="item"
              className="mt-1.5 w-full p-2 rounded-lg border-gray-300 text-gray-700 sm:text-sm"
            >
              <option value="">TV</option>
              <option value="JM">Tables</option>
              <option value="SRV">Chair</option>
              <option value="JH">Jimi Hendrix</option>
              <option value="BBK">B.B King</option>
              <option value="AK">Albert King</option>
              <option value="BG">Buddy Guy</option>
              <option value="EC">Eric Clapton</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              Date{" "}
            </label>

            <select
              name="date"
              id="date"
              className="mt-1.5 p-2 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
            >
              <option value="">Please select</option>
              <option value="JM">John Mayer</option>
              <option value="SRV">Stevie Ray Vaughn</option>
              <option value="JH">Jimi Hendrix</option>
              <option value="BBK">B.B King</option>
              <option value="AK">Albert King</option>
              <option value="BG">Buddy Guy</option>
              <option value="EC">Eric Clapton</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="time"
              className="block text-sm font-semibold text-gray-700"
            >
              {" "}
              Time{" "}
            </label>

            <select
              name="time"
              id="time"
              className="mt-1.5 p-2 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
            >
              <option value="">Please select</option>
              <option value="JM">John Mayer</option>
              <option value="SRV">Stevie Ray Vaughn</option>
              <option value="JH">Jimi Hendrix</option>
              <option value="BBK">B.B King</option>
              <option value="AK">Albert King</option>
              <option value="BG">Buddy Guy</option>
              <option value="EC">Eric Clapton</option>
            </select>
          </div>
          <button className="bg-primary text-white py-2 col-span-2 rounded-3xl mt-4">
            Report Now
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
