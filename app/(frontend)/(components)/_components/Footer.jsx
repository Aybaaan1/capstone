"use client";

import Image from "next/image";

export default function Footer() {
  const sociallinks = [
    { image: "/imgs/fb-icon.png", href: "/", alt: "Facebook Icon" },
    { image: "/imgs/twitter-icon.png", href: "/", alt: "Twitter Icon" },
    { image: "/imgs/instagram-icon.png", href: "/", alt: "Instagram Icon" },
    { image: "/imgs/youtube-icon.png", href: "/", alt: "YouTube Icon" },
  ];

  return (
    <section>
      <div className="w-full bg-[#171A1FFF] flex flex-col-reverse md:flex-row items-center justify-around py-10">
        <div className="text-white text-sm flex flex-col gap-4 md:gap-16">
          <div className="flex items-center justify-center gap-4">
            <Image
              src="/imgs/isda.png"
              height={70}
              width={70}
              className="w-1/6 md:w-1/3"
              alt="SSGConnect Logo"
            />
            <h1 className="font-bold text-slate-500 text-3xl md:text-4xl mt-2">
              SSGConnect
            </h1>
          </div>
          <p className="text-slate-500">
            © 2022 Brand, Inc. • Privacy • Terms • Sitemap
          </p>
        </div>
        <div className="flex flex-col text-end gap-7 text-sm">
          <div className="flex justify-center md:justify-end gap-5">
            <button className="bg-transparent border border-primary text-primary px-4 py-2 rounded-full text-sm">
              Order Merchandise
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-full text-sm">
              Reserve an item
            </button>
          </div>
          <p className="text-slate-500 text-center md:text-right">
            Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit, set
            do eiusmod tempor incidunt
          </p>
          <div className="flex items-center justify-center md:justify-end gap-5">
            {sociallinks.map((links) => (
              <Image
                key={links.href}
                src={links.image}
                href={links.href}
                height={30}
                width={30}
                alt={links.alt} // Add alt attribute here
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
