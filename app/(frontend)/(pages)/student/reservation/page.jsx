"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import ReservationForm from "../../../(components)/_components/ReservationForm";

export default function Reservation() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

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

  const handleReserveClick = (itemId) => {
    console.log("Reserve button clicked for item ID:", itemId);
    setSelectedItemId(itemId);
    setFormVisible(true);
  };

  return (
    <div className="mt-10">
      <section
        // , backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center"
        style={{ backgroundImage: "url('/imgs/ctulogo.png')" }}
        className="w-full h-56 bg-cover bg-no-repeat bg-center "
      ></section>
      <section>
        <h1 className="text-center text-4xl font-bold mt-12 tracking-wide">
          SSG Reservation Items
        </h1>

        <div className="grid grid-cols-4 place-items-center px-20 mt-8">
          {items.length === 0 ? (
            <p>No items available for reservation.</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="text-black flex flex-col gap-2 bg-white py-12 rounded-xl items-center justify-center relative"
                style={{ zIndex: 2 }} // Set a higher z-index to make sure button stays on top
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    height={200}
                    width={200}
                    alt="Item picture"
                    style={{ zIndex: 1 }}
                  />
                ) : (
                  <div className="bg-gray-200 h-48 w-48 flex items-center justify-center">
                    <p>No image available</p>
                  </div>
                )}
                <div>{item.type}</div>
                <div
                  className={`mt-2 ${
                    item.available ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.available ? "Available" : "Not Available"}
                </div>
                <button
                  className="bg-primary text-white py-2 px-4 rounded-lg mt-4"
                  onClick={() => handleReserveClick(item.id)} // Call handleReserveClick with the item's id
                  disabled={!item.available}
                  style={{
                    position: "relative",
                    zIndex: 10, // Make sure z-index is higher than any potential overlap
                    cursor: item.available ? "pointer" : "not-allowed", // Add pointer for clarity
                  }}
                >
                  Reserve Now
                </button>
                <button onClick={() => console.log("Test button works!")}>
                  Test Button
                </button>
              </div>
            ))
          )}
        </div>

        {isFormVisible && (
          <ReservationForm
            formLabel="Reserve an Item"
            onClose={() => setFormVisible(false)}
            itemId={selectedItemId}
            onReservationSuccess={fetchItems}
          />
        )}
      </section>
    </div>
  );
}
