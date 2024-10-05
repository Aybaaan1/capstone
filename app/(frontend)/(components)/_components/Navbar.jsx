"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Modal from "./Modal"; // Modal component
import SignIn from "./Signin"; // SignIn component
import Registration from "./Registration"; // Registration component

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between sign-in and registration

  const handleLoginClick = () => {
    setIsRegistering(false); // Show Sign In form
    setShowModal(true); // Open the modal
  };

  const handleLogoutClick = async () => {
    await signOut();
    router.push("/signin");
  };

  const handleNavClick = (href) => {
    if (!session) {
      alert("Please log in first to access this page.");
    } else {
      router.push(href);
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
      <img src="/imgs/ssglogo.png" alt="Logo" />
      <nav className="flex items-center justify-between gap-5">
        {navs.map((nav) => (
          <button
            key={nav.path}
            className="text-sm text-black"
            onClick={() => handleNavClick(nav.href)}
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

      {/* Modal for Sign In and Registration */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {isRegistering ? (
            <Registration />
          ) : (
            <SignIn switchToRegister={() => setIsRegistering(true)} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default Navbar;
