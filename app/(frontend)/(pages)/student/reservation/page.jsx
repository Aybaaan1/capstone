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

  // Fetch items from API
  const fetchItems = async () => {
    try {
      const response = await fetch("/api/reserveitem");
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

  // Handle click on the "Reserve Now" button
  const handleReserveClick = (itemId) => {
    console.log("Item ID clicked:", itemId); // Log the clicked item ID
    setSelectedItemId(itemId);
    setFormVisible(true);
  };

  return (
    <div className="mt-10">
      <section
        style={{ backgroundImage: "url('/imgs/ctulogo.png')" }}
        className="w-full h-56 bg-cover bg-no-repeat bg-center"
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
                style={{ zIndex: 0 }}
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    height={200}
                    width={200}
                    alt={`Picture of ${item.type}`}
                    style={{ zIndex: 1 }}
                  />
                ) : (
                  <div className="bg-gray-200 h-48 w-48 flex items-center justify-center">
                    <p>No image available</p>
                  </div>
                )}

                <div className="text-lg font-semibold">{item.type}</div>
                <div
                  className={`mt-2 ${
                    item.status === "Available"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {item.status === "Available" ? "Available" : "Not Available"}
                </div>

                <button
                  className="bg-primary text-white py-2 px-4 rounded-lg mt-4"
                  onClick={() => handleReserveClick(item.id)}
                  disabled={item.status !== "Available"}
                  style={{
                    position: "relative",
                    zIndex: 10,
                    cursor:
                      item.status === "Available" ? "pointer" : "not-allowed",
                  }}
                >
                  Reserve Now
                </button>
              </div>
            ))
          )}
        </div>

        {isFormVisible && (
          <ReservationForm
            formLabel="Reserve an Item"
            onClose={() => setFormVisible(false)}
            itemId={selectedItemId} // Pass the selected itemId to ReservationForm
            onReservationSuccess={fetchItems}
          />
        )}
      </section>
    </div>
  );
}
