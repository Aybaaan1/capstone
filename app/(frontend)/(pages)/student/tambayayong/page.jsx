"use client";
import Image from "next/image";
import { useState } from "react";
import TambayayongForm from "../../../(components)/_components/TambayayongForm";
export default function Tambayayong() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div className="mt-10">
      <section
        // , backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center"
        style={{ backgroundImage: "url('/imgs/ctulogo.png')" }}
        className="w-full h-56 bg-cover bg-no-repeat bg-center "
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
          <h1 className="text-center mb-2 font-bold">Qualifications:</h1>
          <span></span>
          <h3>1. Bonifide student of CTU Argao.</h3>
          <h3>2. Currently enrolled this Academic Year.</h3>
          <h3>
            3. The patient must only be a 1st-degree relative in your family.
          </h3>
          <h3>4. Qualification 4</h3>
          <h3>5. Qualification 5</h3>
          <h3>6. Qualification 6</h3>
          <h3>7. Qualification 7</h3>
          <h3>8. Qualification 8</h3>
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
