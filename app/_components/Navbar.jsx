import Image from "next/image";
import Button from "./Button";

export default function Navbar() {
  const navs = [
    { path: "Home", href: "/" },
    { path: "Purchase", href: "/" },
    { path: "Lost & Found", href: "/" },
    { path: "Reserve", href: "/" },
    { path: "Emergency Assistance", href: "/" },
    { path: "About us", href: "/" },
  ];

  return (
    <div className="w-full h-20 bg-[rgb(255,211,23)] flex items-center justify-around px-28">
      <Image src="/imgs/ssglogo.png" height={200} width={200} />
      <nav className="flex items-center justify-between gap-5">
        {navs.map((nav) => (
          <a className="text-sm text-black" href={nav.href}>
            {nav.path}
          </a>
        ))}
      </nav>

      <button className="bg-black px-3 py-2 rounded-2xl text-sm text-white">Log out</button>
    </div>
  );
}
