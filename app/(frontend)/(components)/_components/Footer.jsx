"use client";
import Image from "next/image";

export default function Footer() {
  const sociallinks = [
    { image: "/imgs/fb-icon.png", href: "/" },
    { image: "/imgs/twitter-icon.png", href: "/" },
    { image: "/imgs/instagram-icon.png", href: "/" },
    { image: "/imgs/youtube-icon.png", href: "/" },
  ];

  return (
    <section className="bg-[#171A1FFF] text-white py-10">
      <div className="container mx-auto px-5 grid gap-10 sm:grid-cols-2">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Image src="/imgs/isda.png" height={70} width={70} alt="Logo" />
            <h1 className="text-4xl font-bold text-slate-500">SSGConnect</h1>
          </div>
          <p className="text-slate-500">
            © 2022 Brand, Inc. • Privacy • Terms • Sitemap
          </p>
        </div>
        <div className="flex flex-col items-end gap-5">
          <div className="flex gap-5">
            <button className="border border-primary text-primary px-4 py-2 rounded-full text-sm">
              Order Merchandise
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-full text-sm">
              Reserve an item
            </button>
          </div>
          <p className="text-slate-500 text-right">
            Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit, sed
            do eiusmod tempor incidunt
          </p>
          <div className="flex gap-5">
            {sociallinks.map((links, index) => (
              <Image
                key={index}
                src={links.image}
                href={links.href}
                height={30}
                width={30}
                alt="Social Icon"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
