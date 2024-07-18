"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export default function Navbar() {
  const navs = [
    { path: "Home", href: "/" },
    { path: "Purchase", href: "/purchase" },
    { path: "Lost & Found", href: "/lostandfound" },
    { path: "Reserve", href: "/reservation" },
    { path: "Emergency Assistance", href: "/emergencyassistance" },
    { path: "About us", href: "/aboutus" },
  ];

  const [isSigninClicked, setIsSigninClicked] = useState(false);

  return (
    <div className="w-full h-20 bg-[rgb(255,211,70)] flex items-center justify-around px-28">
      <Image src="/imgs/ssglogo.png" height={200} width={200} />
      <nav className="flex items-center justify-between gap-5">
        {navs.map((nav) => (
          <Link key={nav.path} className="text-sm text-black" href={nav.href}>
            {nav.path}
          </Link>
        ))}
      </nav>

      <button onClick={() => setIsSigninClicked(true)} className="bg-black px-3 py-2 rounded-2xl text-sm text-white">
        Log in
      </button>
      {isSigninClicked ? (
        <Signin/>
      ) : null}
    </div>
  );
}
