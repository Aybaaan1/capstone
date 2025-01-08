"use client";
import Image from "next/image";
import Button from "./(frontend)/(components)/_components/Button";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  const [activeAchievement, setActiveAchievement] = useState(0);
  const ssgAchievements = [
    {
      title: "PROJECT PANULAT 2.0:",
      description:
        "The Supreme Student Government orchestrated an inspiring symphony of education with Project Panulat 2.0. The joy radiating from the genuine smiles of children in three schools echoes the success of our mission. In the heart of this activity lies a transformative experience for both givers and receivers. The genuine smiles on every child's face illuminate the profound impact of this initiative. It's not just about handing out pens and papers; it's about instilling a love for learning, igniting curiosity, and creating a positive atmosphere where education becomes an enchanting journey.",
      image: "/imgs/ssgachievement_1.png",
    },
    {
      title: "PROJECT PANULAT 3.0:",
      description:
        "The Supreme Student Government brought education to life with Project Panulat 3.0, creating an inspiring harmony of learning. The heartfelt smiles of children across three schools are a testament to the success of this initiative. At its core, this activity offered a transformative experience for both the participants and the beneficiaries. These genuine smiles reflect the profound impact of the project, which goes beyond simply distributing pens and paper. It’s about fostering a love for learning, sparking curiosity, and cultivating a positive environment where education becomes a magical journey..",
      image: "/imgs/ssgachievements.jfif",
    },
    {
      title: "PROJECT PANULAT 4.0:",
      description:
        "The Supreme Student Government orchestrated an inspiring symphony of education with Project Panulat 2.0. The joy radiating from the genuine smiles of children in three schools echoes the success of our mission. In the heart of this activity lies a transformative experience for both givers and receivers. The genuine smiles on every child's face illuminate the profound impact of this initiative. It's not just about handing out pens and papers; it's about instilling a love for learning, igniting curiosity, and creating a positive atmosphere where education becomes an enchanting journey.",
      image: "/imgs/ssgachievement_1.png",
    },
  ];

  const handleNextClick = () => {
    if (activeAchievement < ssgAchievements.length - 1) {
      setActiveAchievement((prev) => prev + 1);
    }
  };

  const handlePrevClick = () => {
    if (activeAchievement > 0) {
      setActiveAchievement((prev) => prev - 1);
    }
  };

  const Merchandise = [
    {
      picture: "/imgs/tshirt.png",
      item: "University T-Shirt",
      price: "250.00",
    },
    {
      picture: "/imgs/lanyards.png",
      item: "Department Lanyards",
      price: "85.00",
    },
    {
      picture: "/imgs/totebag.png",
      item: "University Tote Bag",
      price: "160.00",
    },
    { picture: "/imgs/flask.png", item: "University Tumbler", price: "299.00" },
  ];

  const sociallinks = [
    { image: "/imgs/fb-icon.png", href: "/" },
    { image: "/imgs/twitter-icon.png", href: "/" },
    { image: "/imgs/instagram-icon.png", href: "/" },
    { image: "/imgs/youtube-icon.png", href: "/" },
  ];

  return (
    <div className=" w-full bg-white">
      <section className="flex flex-col md:flex-row px-10 md:px-0 items-start md:items-center justify-center border-b-2 border-gray-100 py-10 md:py-32 gap-10 md:gap-20 ">
        <div className="text-black flex flex-col gap-5">
          <h1 className="font-bold text-6xl lg:text-7xl">
            SSG <br /> Connect
          </h1>
          <p className="text-slate-600">
            Empowering CTU-AC Students through <br />
            Digital Platforms Services.
          </p>
          <div>
            <a
              href="https://www.facebook.com/SSGCTUArgao"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-primary px-10 py-2 text-white rounded-2xl text-sm">
                Chat Us
              </button>
            </a>
          </div>
        </div>
        <Image
          src="/imgs/ssg-group-pic.png"
          height={500}
          width={550}
          className="w-full md:w-1/2"
          alt="ssg group pic"
        />
      </section>
      <section className="text-black flex flex-col items-center justify-center py-16 px-6 md:px-20 lg:px-40 gap-6">
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-center">
          About Us
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-center max-w-3xl">
          The SSG Connect is a comprehensive digital platform meticulously
          designed to streamline student services and enhance engagement within
          CTU Argao (CTU-AC). Through its innovative features and user-friendly
          interface, this system aims to empower students by providing
          convenient access to essential resources and support systems. Beyond
          simplifying administrative tasks, it fosters a sense of community by
          enabling seamless communication, promoting transparency, and
          encouraging active participation in university activities. By
          integrating tools for academic assistance, event coordination, and
          feedback mechanisms, SSG Connect transforms the student experience,
          making it more dynamic, efficient, and inclusive.
        </p>
      </section>

      <section className="text-black w-full bg-slate-50 flex flex-col items-center justify-center py-16 gap-10">
        <h1 className="font-bold text-4xl text-black text-center">
          University Merchandise
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-4/5">
          {Merchandise.map((merchs) => (
            <div className="text-black flex flex-col gap-3 shadow-md py-9 px-5 rounded-xl items-center">
              <Image
                src={merchs.picture}
                height={200}
                width={200}
                alt="Item picture"
                className="w-full sm:w-48 md:w-64 lg:w-80" // Adjusts image size at different screen widths
              />
              <p>{merchs.item}</p>
              <p>Price: P{merchs.price}</p>
              <div>
                <button className="bg-primary text-white px-3 py-2 rounded-full">
                  Order now
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="border-black border px-10 py-3 rounded-full">
          Explore more
        </button>
      </section>
      <section className="relative w-full flex flex-col md:flex-row px-10 lg:px-16 py-10 gap-10 ">
        <div className="text-center px-2 flex-1">
          <h1 className="font-bold text-4xl mb-8">SSG Achievements</h1>
          <p className="font-bold font-serif">
            {ssgAchievements[activeAchievement].title}
          </p>
          <p className="text-sm mt-2 italic tracking-wide leading-7">
            {ssgAchievements[activeAchievement].description}
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <Image
            src={ssgAchievements[activeAchievement].image}
            width={400}
            height={400}
          />
        </div>
        <div className="flex gap-2 absolute bottom-4 transform left-1/2 -translate-x-1/2">
          {activeAchievement > 0 && (
            <button
              onClick={handlePrevClick}
              className=" text-white bg-primary px-4 py-3 rounded-full "
            >
              ＜
            </button>
          )}

          {activeAchievement < ssgAchievements.length - 1 && (
            <button
              onClick={handleNextClick}
              className="text-white bg-primary px-4 py-3 rounded-full "
            >
              ＞
            </button>
          )}
        </div>
      </section>
      <section className="w-full p-10 md:p-20 bg-white">
        <div className="flex bg-black p-6 md:p-10 rounded-md overflow-hidden">
          <div className="flex-1 flex flex-col">
            <h1 className="font-bold text-4xl text-slate-400 mb-10">
              Find our locations
            </h1>
            <p className="text-slate-500 text-sm mb-8">
              Lorem ipsum dolor sit amet, consertor adipscing elit, sed do
              eiusmod tempor incidunt ut labore et dolore magna aliqua
            </p>
            <div>
              <button className="text-white px-8 py-2 bg-primary rounded-3xl text-sm">
                Locations & Hours
              </button>
            </div>
          </div>
          <div className="flex-1 hidden md:flex items-center justify-center relative">
            <Image
              src={"/imgs/cta-img.png"}
              width={500}
              height={500}
              className="translate-y-10 absolute -right-7"
            />
          </div>
        </div>
      </section>
      <section className="bg-slate-50 flex flex-col gap-10 md:flex-row items-center px-5 justify-around  py-10">
        <div className="flex-1 text-black p-10 flex flex-col gap-7">
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
          <div className="flex pr-48 items-center gap-6">
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
        <Image
          src="/imgs/followus_group_pic.png"
          height={450}
          width={450}
          className="flex-1"
        />
      </section>
    </div>
  );
}
