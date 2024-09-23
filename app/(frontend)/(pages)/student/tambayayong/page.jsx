"use client";
import Image from "next/image";
import { useState } from "react";
import TambayayongForm from "../../../(components)/_components/TambayayongForm";
export default function Tambayayong() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div>
      <section
        style={{ backgroundImage: "url('/imgs/ctulogo.png')" }}
        className="w-full h-56 mt-10"
      ></section>
      <section>
        <div>
          <h1 className="text-center text-4xl font-bold mt-12 tracking-wide">
            Project Tambayayong
          </h1>
        </div>
      </section>
      <section>
        <div className="bg-yellow-200 w-1/2  mx-auto px-10 py-6 mt-12 mb-32 rounded-lg shadow-lg relative">
          <h1 className="text-center mb-2">Qualifications:</h1>
          <h3>1. Dapat Sheshable</h3>
          <h3>2. Dapat Maligo</h3>
          <h3>3. Dapat Lig-on</h3>
          <h3>4. Okay mega</h3>
          <h3>5. Bubo</h3>
          <h3>6. Dapat Sheshable</h3>
          <h3>7. Dapat Maligo</h3>
          <h3>8. Dapat Lig-on</h3>
          <button
            className="bg-primary py-1 px-4 mt-2 rounded-lg absolute right-4 bottom-3 text-[12px] text-white"
            onClick={() => setIsFormOpen(true)}
          >
            Request now
          </button>
        </div>
        {isFormOpen === true ? <TambayayongForm /> : null}
      </section>
    </div>
  );
}
