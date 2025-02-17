"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import ReservationForm from "../../../(components)/_components/ReservationForm";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
export default function Reservation() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const { data: session, statuss } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (statuss === "loading") return; // If loading, don't do anything
    if (session && session.user.role !== "STUDENT") {
      router.push("/admin"); // Redirect to homepage if the role is not ADMIN
    }
  }, [session, statuss, router]);
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

      <section className="py-10 flex flex-col items-center justify-center">
        <h1 className="text-center text-4xl font-bold mt-12 tracking-wide">
          SSG Reservation Items
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-20 mt-8">
          {items.length === 0 ? (
            <p>No items available for reservation.</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="text-black flex flex-col gap-2 px-8 py-4 rounded-xl items-center justify-center relative"
                style={{ zIndex: 0 }}
              >
                {item.image ? (
                  <div className="w-48 h-48 flex items-center justify-center overflow-hidden">
                    <Image
                      src={item.image}
                      alt={`Picture of ${item.type}`}
                      width={192} // Fixed width
                      height={192} // Fixed height
                      className="object-contain" // Maintains aspect ratio
                    />
                  </div>
                ) : (
                  <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
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
