"use client";
import Image from "next/image";
import { useState } from "react";
import LostFoundForm from "../../../(components)/_components/LostFoundForm";

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
        style={{ backgroundImage: "url('/imgs/ctulogo.png')" }}
        className="w-full h-56 bg-cover bg-no-repeat bg-center"
      ></section>

      {/* Found Items Section */}
      <section className="mt-10 bg-slate-50 flex flex-col items-center justify-center py-10 gap-10 relative">
        <div className="w-full flex flex-col items-center px-6 gap-4">
          <h1 className="font-bold text-5xl text-center">Found Items</h1>
          <div className="w-full flex justify-end px-40 absolute left-6 top-12">
            <button
              onClick={() => setIsFoundFormClicked(true)}
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm"
            >
              Report Found/Lost Item
            </button>
            <span></span>
          </div>
          <span></span>
          <span></span>
        </div>
        {isFoundFormClicked ? (
          <LostFoundForm
            formLabel="Report Found Item"
            setClose={() => setIsFoundFormClicked(false)}
          />
        ) : null}
        <div className="grid grid-cols-4 place-items-center gap-14">
          {items.map((item) => (
            <Image key={item.path} src={item.path} height={200} width={200} />
          ))}
        </div>
        <div className="w-full flex justify-center px-6">
          <button className="border-black border px-10 py-3 rounded-full">
            See All
          </button>
        </div>
      </section>

      {/* Lost Items Section */}
      <section className="flex flex-col items-center justify-center py-10 gap-20 relative">
        <div className="w-full flex justify-center px-6">
          <h1 className="font-bold text-5xl text-center">Lost Items</h1>
        </div>
        <div className="grid grid-cols-4 place-items-center gap-14">
          {items.map((item) => (
            <Image key={item.path} src={item.path} height={200} width={200} />
          ))}
        </div>
        <div className="w-full flex justify-center px-6">
          <button className="border-black border px-10 py-3 rounded-full">
            See All
          </button>
        </div>
      </section>

      {/* Follow Us Section */}
      <section className="flex items-center justify-between px-24 overflow-hidden py-10">
        <div className="text-black w-[450px] flex flex-col gap-7">
          <h1 className="font-medium text-4xl">Follow us</h1>
          <div className="flex flex-col ">
            <p className="text-slate-600">
              @https://www.facebook.com/SSGCTUArgao
            </p>
            <p className="text-slate-600">
              To stay updated with the latest news, promotions, and offerings
              from the poke, make sure to follow us on social media accounts.
              Don't miss out on any updates.
            </p>
          </div>
          <div className="flex pr-48 items-center justify-between">
            {sociallinks.map((links) => (
              <Image
                key={links.href}
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
