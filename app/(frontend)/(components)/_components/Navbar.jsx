"use client";
import Image from "next/image";
import Link from "next/link";
<<<<<<< HEAD:app/_components/Navbar.jsx
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
=======
import { useState, useEffect } from "react";
import SignInModal from "./SignInModal";
>>>>>>> 2733bed142748b005cdaffba8ecef1ab5c06d8db:app/(frontend)/(components)/_components/Navbar.jsx

export default function Navbar() {
  const router = useRouter(); // Initialize the router

  const handleLoginClick = () => {
    router.push("/signin"); // Navigate to the /signin page
  };

  const navs = [
    { path: "Home", href: "/" },
    { path: "Purchase", href: "/purchase" },
    { path: "Lost & Found", href: "/lostandfound" },
    { path: "Reserve", href: "/reservation" },
    { path: "Emergency Assistance", href: "/tambayayong" },
    { path: "About us", href: "/aboutus" },
  ];

  return (
    <div className="w-full h-20 bg-[rgb(255,211,70)] flex items-center justify-around px-28">
      <Image src="/imgs/ssglogo.png" height={200} width={200} alt="Logo" />
      <nav className="flex items-center justify-between gap-5">
        {navs.map((nav) => (
          <Link key={nav.path} className="text-sm text-black" href={nav.href}>
            {nav.path}
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLoginClick} // Update to handleLoginClick
        className="bg-black px-3 py-2 rounded-2xl text-sm text-white"
      >
        Log in
      </button>
<<<<<<< HEAD:app/_components/Navbar.jsx
=======
      {isSigninClicked ? <Signin /> : null}
>>>>>>> 2733bed142748b005cdaffba8ecef1ab5c06d8db:app/(frontend)/(components)/_components/Navbar.jsx
    </div>
  );
}
