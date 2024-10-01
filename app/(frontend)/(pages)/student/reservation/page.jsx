"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Reservation() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/reserveitem"); // Adjust to your item reserve API endpoint
      if (!response.ok) throw new Error("Failed to fetch items");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <section
        style={{ backgroundImage: "url('/imgs/ctulogo.png')" }}
        className="w-full h-56 mt-10"
      ></section>
      <section>
        <h1 className="text-center text-4xl font-bold mt-12 tracking-wide">
          SSG Reservation Items
        </h1>
        <div className="grid grid-cols-4 place-items-center px-20 mt-8">
          {items.length === 0 ? (
            <p>No items available for reservation.</p>
          ) : (
            items.map((item, index) => (
              <div
                key={index}
                className="text-black flex flex-col gap-2 bg-white py-12 rounded-xl items-center justify-center"
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    height={200}
                    width={200}
                    alt="Item picture"
                  />
                ) : (
                  <div className="bg-gray-200 h-48 w-48 flex items-center justify-center">
                    <p>No image available</p>
                  </div>
                )}
                <div>{item.type}</div>
                <button className="bg-primary text-white mt-3 px-3 py-2 rounded-full">
                  Reserve now
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
