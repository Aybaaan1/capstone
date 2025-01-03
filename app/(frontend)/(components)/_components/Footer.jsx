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
    <section>
      <div className="w-full bg-[#171A1FFF] flex items-center justify-around gap-11 py-10 ">
        <div className="text-white text-sm flex flex-col gap-16">
          <div className="flex items-center justify-between">
            <Image src="/imgs/isda.png" height={70} width={70} />
            <h1 className="font-bold text-slate-500 text-4xl mt-3">
              SSGConnect
            </h1>
          </div>
          <p className="text-slate-500">
            © 2022 Brand, Inc. • Privacy • Terms • Sitemap
          </p>
        </div>
        <div className="flex flex-col text-end gap-7 text-sm">
          <div className="flex justify-end gap-5">
            <button className="bg-transparent border border-primary text-primary px-4 py-2 rounded-full text-sm">
              Order Merchandise
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-full text-sm">
              Reserve an item
            </button>
          </div>
          <p className="text-slate-500">
            Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit, set
            do eiusmod tempor incidunt
          </p>
          <div className="flex items-center justify-end gap-5">
            {sociallinks.map((links) => (
              <Image
                src={links.image}
                href={links.href}
                height={30}
                width={30}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
