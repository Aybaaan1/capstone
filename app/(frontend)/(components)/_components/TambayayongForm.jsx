"use client";
import React from "react";
import { Calendar } from "@nextui-org/react";
import { today, getLocalTimeZone, isWeekend } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

const ReservationForm = ({ formLabel, setClose }) => {
  return (
    <form className="absolute top-0 left-1/2 -translate-x-1/2  w-[70%] bg-white shadow-lg p-10 flex">
      <div className="p-8 flex-1">
        <button onClick={setClose} className="absolute top-6 right-6">
          ❌
        </button>
        <h3 className="text-3xl font-bold mb-4">{formLabel}</h3>
        <p>Project Tambayayong Form</p>

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
        <div className="mt-6">
          <label
            htmlFor="patient"
            className="block text-sm font-semibold text-gray-700"
          >
            {" "}
            Your Name{" "}
          </label>

          <input
            type="text"
            id="patient"
            placeholder="Name of the patient"
            className="p-2 mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          />
        </div>
        <div className="mt-6">
          <label
            htmlFor="gcash"
            className="block text-sm font-semibold text-gray-700"
          >
            {" "}
            Gcash Number{" "}
          </label>

          <input
            type="text"
            id="gcash"
            placeholder="Enter your Gcash Number"
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

          <button className="bg-primary text-white py-2 col-span-2 rounded-3xl mt-4">
            Report Now
          </button>
        </div>
      </div>
      <div className="flex-1 h-full">
        <h3 className="text-xl font-bold mb-4">Proof/Evidence</h3>
        <div className="relative my-6 w-full h-full">
          <input
            id="id-dropzone01"
            name="file-upload"
            type="file"
            className="hidden"
          />
          <label
            htmlFor="id-dropzone01"
            className="relative flex cursor-pointer flex-col items-center gap-4 rounded border border-dashed border-slate-300 px-3 py-36 text-center text-sm font-medium transition-colors"
          >
            <span className="inline-flex h-12 items-center justify-center self-center rounded-full bg-slate-100/70 px-3 text-slate-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-label="File input icon"
                role="graphics-symbol"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                />
              </svg>
            </span>
            <span className="text-slate-500">
              Drag & drop or
              <span className="text-primary"> upload a file</span>
            </span>
          </label>
        </div>
      </div>
    </form>
  );
};

export default ReservationForm;
