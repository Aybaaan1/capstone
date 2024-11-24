"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import LostFoundForm from "../../../(components)/_components/LostFoundForm";

export default function LostFoundPage() {
  const [isLostFormClicked, setIsLostFormClicked] = useState(false);
  const [isFoundFormClicked, setIsFoundFormClicked] = useState(false);
  const [foundItems, setFoundItems] = useState([]);
  const [lostItems, setLostItems] = useState([]);

  const socialLinks = [
    { image: "/imgs/fb-icon.png", href: "/" },
    { image: "/imgs/twitter-icon.png", href: "/" },
    { image: "/imgs/instagram-icon.png", href: "/" },
    { image: "/imgs/youtube-icon.png", href: "/" },
  ];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/item");
        const data = await response.json();

        // Filter the items into 'lost' and 'found' categories based on their status
        const foundItemsList = data.filter(
          (item) => item.type === "found" && item.status === "Accepted"
        );
        const lostItemsList = data.filter(
          (item) => item.type === "lost" && item.status === "Accepted"
        );

        setFoundItems(foundItemsList);
        setLostItems(lostItemsList);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="mt-10">
      <section
        style={{ backgroundImage: "url('/imgs/ctulogo.png')" }}
        className="w-full h-56 bg-cover bg-no-repeat bg-center"
      ></section>

      {/* Found Items Section */}
      <section className="mt-10 bg-slate-50 flex flex-col items-center justify-center py-10 gap-10 relative">
        <div className="w-full flex flex-col items-center px-6 gap-4">
          <h1 className="font-bold text-5xl text-center">Found Items</h1>
          <div className="w-full flex justify-end px-40 absolute left-6 top-12">
            <button
              onClick={() => setIsFoundFormClicked(true)}
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm"
            >
              Report Found/Lost Item
            </button>
          </div>
        </div>

        {isFoundFormClicked && (
          <LostFoundForm
            formLabel="Report Found Item"
            setClose={() => setIsFoundFormClicked(false)}
          />
        )}

        <div className="grid grid-cols-4 place-items-center gap-14">
          {foundItems.length > 0 ? (
            foundItems.map((item) => (
              <div key={item.id}>
                <Image
                  src={item.image || "/imgs/placeholder.png"}
                  height={200}
                  width={200}
                  alt={item.name}
                />
                <h3>Item: {item.name}</h3>
                <p>Place: {item.place}</p>
              </div>
            ))
          ) : (
            <p>No accepted found items available.</p>
          )}
        </div>

        <div className="w-full flex justify-center px-6">
          <button className="border-black border px-10 py-3 rounded-full">
            See All
          </button>
        </div>
      </section>

      {/* Lost Items Section */}
      <section className="flex flex-col items-center justify-center py-10 gap-20 relative">
        <div className="w-full flex justify-center px-6">
          <h1 className="font-bold text-5xl text-center">Lost Items</h1>
        </div>
        <div className="grid grid-cols-4 place-items-center gap-14">
          {lostItems.length > 0 ? (
            lostItems.map((item) => (
              <div key={item.id}>
                <Image
                  src={item.image || "/imgs/placeholder.png"}
                  height={200}
                  width={200}
                  alt={item.name}
                />
                <h3>Item: {item.name}</h3>
                <p>Place: {item.place}</p>
              </div>
            ))
          ) : (
            <p>No accepted lost items available.</p>
          )}
        </div>

        <div className="w-full flex justify-center px-6">
          <button className="border-black border px-10 py-3 rounded-full">
            See All
          </button>
        </div>
      </section>

      {/* Follow Us Section */}
      <section className="flex items-center justify-between px-24 overflow-hidden py-10">
        <div className="text-black w-[450px] flex flex-col gap-7">
          <h1 className="font-medium text-4xl">Follow us</h1>
          <div className="flex flex-col ">
            <p className="text-slate-600">
              @https://www.facebook.com/SSGCTUArgao
            </p>
            <p className="text-slate-600">
              Stay updated with the latest news and promotions. Follow us on our
              social media accounts.
            </p>
          </div>
          <div className="flex pr-48 items-center justify-between">
            {socialLinks.map((links) => (
              <a key={links.href} href={links.href}>
                <Image
                  src={links.image}
                  alt="Social Icon"
                  height={40}
                  width={40}
                />
              </a>
            ))}
          </div>
        </div>
        <Image src="/imgs/followus_group_pic.png" height={450} width={450} />
      </section>
    </div>
  );
}
