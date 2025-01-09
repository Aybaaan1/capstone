"use client";
import React, { useState, useEffect } from "react";
import TambayayongForm from "../../../(components)/_components/TambayayongForm";
import { FaBell } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Tambayayong() {
  const [assistances, setAssistances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { data: session, statuss } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();

  useEffect(() => {
    if (statuss === "loading") return; // If loading, don't do anything
    if (session && session.user.role !== "STUDENT") {
      router.push("/admin"); // Redirect to homepage if the role is not ADMIN
    }
  }, [session, statuss, router]);
  useEffect(() => {
    const fetchAssistances = async () => {
      if (!userId) return; // Exit if userId is not available
      try {
        const response = await fetch(`/api/assistance?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch assistance records");
        }
        const data = await response.json();
        setAssistances(data);

        // Extract reasons for only rejected assistance records for the current user
        const reasons = data
          .filter(
            (assistance) =>
              assistance.status === "rejected" && assistance.userId === userId
          ) // Filter for rejected records of the current user
          .map((assistance) => assistance.reason);

        // Set notifications for rejected records only
        setNotifications(reasons);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssistances();
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
      <section>
        <div>
          <h1 className="text-center text-4xl font-bold mt-12 tracking-wide">
            Project Tambayayong
          </h1>
        </div>
      </section>
      <section>
        <div className="bg-yellow-200 w-4/5 md:w-1/2 mx-auto px-10 py-6 mt-12 flex flex-col mb-32 rounded-lg shadow-lg relative">
          <h1 className="text-center mb-2 font-bold">Qualifications:</h1>
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
            className="bg-primary py-1 px-4 mt-6 self-end rounded-lg text-[12px] text-white"
            onClick={() => setIsFormOpen(true)}
          >
            Request now
          </button>
        </div>
        {isFormOpen && (
          <TambayayongForm setClose={() => setIsFormOpen(false)} />
        )}
      </section>

      {/* Notification Icon */}
      <div className="absolute top-6 right-[18%] md:right-[10%] lg:right-[2%]">
        <button onClick={handleNotificationClick} className="relative">
          <FaBell className="text-3xl text-primary" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </button>
        {showNotifications && (
          <div className="absolute right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-3">
            {notifications.length === 0 ? (
              <p>No notifications</p>
            ) : (
              notifications.map((notification, index) => (
                <p key={index}>{notification}</p>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
