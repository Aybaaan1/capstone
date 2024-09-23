"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react"; // Import useSession and signOut from next-auth

export default function Navbar() {
  const { data: session } = useSession(); // Get session data
  const router = useRouter(); // Initialize the router

  const handleLoginClick = () => {
    router.push("/signin"); // Navigate to the /signin page
  };

  const handleLogoutClick = async () => {
    await signOut(); // Sign out the user
    router.push("/signin"); // Redirect to the /signin page after logging out
  };

  const handleNavClick = (href) => {
    if (!session) {
      alert("Please log in first to access this page."); // Alert message for unauthenticated users
    } else {
      router.push(href); // Navigate to the desired page if authenticated
    }
  };

  const navs = [
    { path: "Home", href: "/" },
    { path: "Purchase", href: "/student/purchase" },
    { path: "Lost & Found", href: "/student/lostandfound" },
    { path: "Reserve", href: "/student/reservation" },
    { path: "Emergency Assistance", href: "/student/tambayayong" },
    { path: "About us", href: "/student/aboutus" },
  ];

  return (
    <div className="w-full h-20 bg-[rgb(255,211,70)] flex items-center justify-around px-28">
      <Image src="/imgs/ssglogo.png" height={200} width={200} alt="Logo" />
      <nav className="flex items-center justify-between gap-5">
        {navs.map((nav) => (
          <button
            key={nav.path}
            className="text-sm text-black"
            onClick={() => handleNavClick(nav.href)} // Use handleNavClick for navigation
          >
            {nav.path}
          </button>
        ))}
      </nav>

      {session ? (
        <button
          onClick={handleLogoutClick}
          className="bg-black px-3 py-2 rounded-2xl text-sm text-white"
        >
          Log out
        </button>
      ) : (
        <button
          onClick={handleLoginClick}
          className="bg-black px-3 py-2 rounded-2xl text-sm text-white"
        >
          Log in
        </button>
      )}
    </div>
  );
}
