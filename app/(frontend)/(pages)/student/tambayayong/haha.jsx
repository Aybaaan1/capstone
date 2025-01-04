"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import LostFoundForm from "../../../(components)/_components/LostFoundForm";
import { FaBell } from "react-icons/fa";
import { useSession } from "next-auth/react";

const socialLinks = [
  { href: "https://www.facebook.com/SSGCTUArgao", image: "/imgs/facebook.png" },
  // Add more social links here if needed
];

export default function LostFoundPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id; // Get the user ID from the session

  const [isLostFormClicked, setIsLostFormClicked] = useState(false);
  const [isFoundFormClicked, setIsFoundFormClicked] = useState(false);
  const [foundItems, setFoundItems] = useState([]);
  const [lostItems, setLostItems] = useState([]);
  const [notifications, setNotifications] = useState([]); // Stores notifications for the user
  const [showNotifications, setShowNotifications] = useState(false); // Controls notification dropdown visibility

  useEffect(() => {
    const fetchItems = async () => {
      if (!userId) return; // Exit if userId is not available

      try {
        const response = await fetch(`/api/item?userId=${userId}`);
        if (!response.ok) {
          throw new Error(`Error fetching items: ${response.status}`);
        }

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

        // Set notifications for accepted items for the current user
        const newNotifications = data
          .filter(
            (item) => item.status === "Accepted" && item.userId === userId
          )
          .map(
            (item) => `Your request for item "${item.name}" has been accepted.`
          );
        setNotifications(newNotifications);
      } catch (error) {
        console.error("Error fetching items:", error.message);
      }
    };

    fetchItems();
  }, [userId]);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications); // Toggle notification visibility
  };

  return (
    <div className="mt-10">
      <section
        style={{ backgroundImage: "url('/imgs/ctulogo.png')" }}
        className="w-full h-56 bg-cover bg-no-repeat bg-center"
      ></section>

      {/* Notification Bell */}
      <div className="absolute top-6 right-10">
        <button onClick={handleNotificationClick} className="relative">
          <FaBell className="text-3xl text-primary" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </button>
        {showNotifications && (
          <div className="absolute right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-3 w-72">
            <h4 className="font-bold text-lg mb-2">Notifications</h4>
            {notifications.length === 0 ? (
              <p className="text-gray-500">No notifications</p>
            ) : (
              <ul className="list-disc list-inside">
                {notifications.map((notification, index) => (
                  <li
                    key={index}
                    className="text-sm mb-1 flex justify-between items-center"
                  >
                    <span>{notification}</span>
                    <button
                      onClick={() => {
                        const updatedNotifications = notifications.filter(
                          (_, i) => i !== index
                        );
                        setNotifications(updatedNotifications);
                      }}
                      className="text-red-500 text-sm ml-2"
                      aria-label="Remove notification"
                    >
                      <span className="font-bold">&times;</span>{" "}
                      {/* Red close icon */}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

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
            formLabel="Report Lost/Found Item"
            setClose={() => setIsFoundFormClicked(false)}
          />
        )}

        <div className="grid grid-cols-4 place-items-center gap-10">
          {foundItems.length > 0 ? (
            foundItems.map((item) => (
              <div
                key={item.id}
                className="border border-gray-300 shadow-md rounded-lg p-4 w-50 text-center bg-white"
              >
                <Image
                  src={item.image || "/imgs/placeholder.png"}
                  height={200}
                  width={150}
                  alt={item.name}
                  className="rounded-lg mx-auto"
                />
                <h3 className="font-semibold text-lg mt-2">{item.name}</h3>
                <p className="text-sm text-gray-600">Place: {item.place}</p>
              </div>
            ))
          ) : (
            <p>No found items.</p>
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
        <div className="grid grid-cols-4 place-items-center gap-10">
          {lostItems.length > 0 ? (
            lostItems.map((item) => (
              <div
                key={item.id}
                className="border border-gray-300 shadow-md rounded-lg p-4 w-50 text-center bg-white"
              >
                <Image
                  src={item.image || "/imgs/placeholder.png"}
                  height={200}
                  width={150}
                  alt={item.name}
                  className="rounded-lg mx-auto"
                />
                <h3 className="font-semibold text-lg mt-2">{item.name}</h3>
                <p className="text-sm text-gray-600">Place: {item.place}</p>
              </div>
            ))
          ) : (
            <p>No lost items.</p>
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
          <div className="flex flex-col">
            <p className="text-slate-600">
              @https://www.facebook.com/SSGCTUArgao
            </p>
            <p className="text-slate-600">
              Stay updated with the latest news and promotions. Follow us on our
              social media accounts.
            </p>
          </div>
          <div className="flex pr-48 items-center justify-between">
            {socialLinks.map((link) => (
              <a key={link.href} href={link.href}>
                <Image
                  src={link.image}
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
