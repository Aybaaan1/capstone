"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Modal from "./Modal"; // Modal component
import SignIn from "./Signin"; // SignIn component
import Registration from "./Registration"; // Registration component
import { AlignRight } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  console.log(pathname);

  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between sign-in and registration
  const [showNav, setShowNav] = useState(false); // Toggle mobile nav

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
    { path: "Tambayayong", href: "/student/tambayayong" },
    { path: "About us", href: "/student/aboutus" },
  ];

  return (
    <div className="w-full h-20 bg-[rgb(255,211,70)] flex items-center justify-between lg:justify-around lg:px-0 px-10">
      <img src="/imgs/ssglogo.png" alt="Logo" className="w-40 md:w-48 " />

      <nav className="hidden lg:flex items-center justify-between gap-5">
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
      <div></div>
      {pathname !== "/student/purchase" && (
        <div>
          {session ? (
            <button
              onClick={handleLogoutClick}
              className="bg-black px-3 py-2 rounded-2xl text-sm text-white hidden lg:block"
            >
              Log out
            </button>
          ) : (
            <button
              onClick={handleLoginClick}
              className="bg-black px-3 py-2 rounded-2xl text-sm text-white hidden lg:block"
            >
              Log in
            </button>
          )}
        </div>
      )}
      {/* MOBILE REPONSIVE NAVBAR */}
      <div className="lg:hidden relative">
        <AlignRight
          className="lg:hidden cursor-pointer"
          onClick={() => setShowNav((prev) => !prev)}
        />
        {showNav && (
          <nav className="z-20 absolute top-12 right-0 bg-white p-5 border border-gray-200  rounded-lg flex flex-col items-start gap-5">
            {navs.map((nav) => (
              <button
                key={nav.path}
                className="text-sm text-black"
                onClick={() => handleNavClick(nav.href)}
              >
                {nav.path}
              </button>
            ))}
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
          </nav>
        )}
      </div>

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
