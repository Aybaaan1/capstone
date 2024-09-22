"use client";
import Image from "next/image";

import { useState } from "react";
import LostFoundForm from "../../(components)/_components/LostFoundForm";

export default function page() {
  const [isLostFormClicked, setIsLostFormClicked] = useState(false);
  const [isFoundFormClicked, setIsFoundFormClicked] = useState(false);

  const items = [
    { path: "/imgs/tshirt.png" },
    { path: "/imgs/lanyards.png" },
    { path: "/imgs/totebag.png" },
    { path: "/imgs/flask.png" },
    { path: "/imgs/tshirt.png" },
    { path: "/imgs/lanyards.png" },
    { path: "/imgs/totebag.png" },
    { path: "/imgs/flask.png" },
    { path: "/imgs/tshirt.png" },
    { path: "/imgs/lanyards.png" },
    { path: "/imgs/totebag.png" },
    { path: "/imgs/flask.png" },
  ];

  const sociallinks = [
    { image: "/imgs/fb-icon.png", href: "/" },
    { image: "/imgs/twitter-icon.png", href: "/" },
    { image: "/imgs/instagram-icon.png", href: "/" },
    { image: "/imgs/youtube-icon.png", href: "/" },
  ];

  return (
    <div className="mt-10">
      <section
        // , backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center"
        style={{ backgroundImage: "url('/imgs/ctulogo.png')" }}
        className="w-full h-56 bg-cover bg-no-repeat bg-center "
      ></section>
      <section className="mt-10 bg-slate-50 flex flex-col items-center justify-center py-10 gap-10 relative">
        <div className="flex items-center justify-end gap-32 w-4/5 px-6">
          <h1 className="font-bold text-5xl">Found Items</h1>
          <button
            onClick={() => setIsFoundFormClicked(true)}
            className="bg-primary text-white px-6 py-4 rounded-full text-sm"
          >
            Report Found Item
          </button>
          {isFoundFormClicked ? (
            <LostFoundForm
              formLabel="Report Found Item"
              setClose={() => setIsFoundFormClicked(false)}
            />
          ) : null}
        </div>
        <div className="grid grid-cols-4 place-items-center gap-14">
          {items.map((item) => (
            <Image src={item.path} height={200} width={200} />
          ))}
        </div>
        <button className="border-black border px-10 py-3 rounded-full">
          See All
        </button>
      </section>
      <section className=" flex flex-col items-center justify-center py-10 gap-20 relative">
        <div className="flex items-center justify-end gap-44 w-4/5 px-6">
          <h1 className="font-bold text-5xl">Lost Items</h1>
          <button
            onClick={() => setIsLostFormClicked(true)}
            className="bg-primary text-white px-6 py-4 rounded-full text-sm"
          >
            Report Lost Item
          </button>
          {isLostFormClicked ? (
            <LostFoundForm
              formLabel="Report Lost Item"
              setClose={() => setIsLostFormClicked(false)}
            />
          ) : null}
        </div>
        <div className="grid grid-cols-4 place-items-center gap-14">
          {items.map((item) => (
            <Image src={item.path} height={200} width={200} />
          ))}
        </div>
        <button className="border-black border px-10 py-3 rounded-full">
          See All
        </button>
      </section>
      <section className="flex items-center justify-between px-24 overflow-hidden py-10">
        <div className="text-black w-[450px] flex flex-col gap-7">
          <h1 className="font-medium text-4xl">Follow us</h1>
          <div className="flex flex-col ">
            <p className="text-slate-600">
              @https://www.facebook.com/SSGCTUArgao
            </p>
            <p className="text-slate-600">
              To stay updated with the latest news, promotions, and offerings
              from the poke , make sure to follow us social media accounts.
              Don't miss out on any updates
            </p>
          </div>
          <div className="flex pr-48 items-center justify-between">
            {sociallinks.map((links) => (
              <Image
                src={links.image}
                href={links.href}
                height={40}
                width={40}
              />
            ))}
          </div>
        </div>
        <Image src="/imgs/followus_group_pic.png" height={450} width={450} />
      </section>
      <form action=""></form>
    </div>
  );
}
