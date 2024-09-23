"use client";
import Image from "next/image";
import ReservationForm from "../../../(components)/_components/ReservationForm";
import { useState } from "react";

export default function Reservation() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const reserve = [
    {
      picture: "/imgs/tshirt.png",
      text: "TV",
    },
    {
      picture: "/imgs/tshirt.png",
      text: "Camera",
    },
    {
      picture: "/imgs/tshirt.png",
      text: "Tables",
    },
    {
      picture: "/imgs/tshirt.png",
      text: "Chairs",
    },
    {
      picture: "/imgs/tshirt.png",
      text: "Sports",
    },
    {
      picture: "/imgs/tshirt.png",
      text: "Lights",
    },
    {
      picture: "/imgs/tshirt.png",
      text: "Items",
    },
    {
      picture: "/imgs/tshirt.png",
      text: "HAHAHA",
    },
  ];
  return (
    <div>
      <section
        style={{ backgroundImage: "url('/imgs/ctulogo.png')" }}
        className="w-full h-56 mt-10"
      ></section>
      <section>
        <div>
          <h1 className="text-center text-4xl font-bold mt-12 tracking-wide">
            SSG Reservation Items
          </h1>
        </div>
        <div>
          <div className="grid grid-cols-4 place-items-center px-20 mt-8">
            {reserve.map((item) => (
              <div className="text-black flex flex-col gap-2 bg-white py-12 rounded-xl items-center justify-center">
                <Image
                  src={item.picture}
                  height={200}
                  width={200}
                  alt="Item picture"
                />
                <div>
                  <button
                    className="bg-primary text-white mt-3 px-3 py-2 rounded-full"
                    onClick={() => setIsFormOpen(true)}
                  >
                    Reserve now
                  </button>
                </div>
                {isFormOpen === true ? (
                  <ReservationForm formLabel="Reservation Form" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
