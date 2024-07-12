"use client";

import Image from "next/image";
import { useState } from "react";

const AboutUs = () => {
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
        "TESTING TESTING TESSTING orchestrated an inspiring symphony of education with Project Panulat 2.0. The joy radiating from the genuine smiles of children in three schools echoes the success of our mission. In the heart of this activity lies a transformative experience for both givers and receivers. The genuine smiles on every child's face illuminate the profound impact of this initiative. It's not just about handing out pens and papers; it's about instilling a love for learning, igniting curiosity, and creating a positive atmosphere where education becomes an enchanting journey.",
      image: "/imgs/ssgachievement_1.png",
    },
    {
      title: "PROJECT PANULAT 123.0:",
      description:
        "BILAT SA BAKAAAAA orchestrated an inspiring symphony of education with Project Panulat 2.0. The joy radiating from the genuine smiles of children in three schools echoes the success of our mission. In the heart of this activity lies a transformative experience for both givers and receivers. The genuine smiles on every child's face illuminate the profound impact of this initiative. It's not just about handing out pens and papers; it's about instilling a love for learning, igniting curiosity, and creating a positive atmosphere where education becomes an enchanting journey.",
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

  return (
    <div className="w-full">
      <section className="w-full h-screen mx-auto ">
        <div
          className="w-full h-1/2 bg-cover bg-center bg-no-repeat flex items-end justify-center "
          style={{ backgroundImage: "url('/imgs/aboutus_hero.png')" }}
        >
          <div className="flex flex-col items-center w-1/3 p-6 shadow-md bg-white translate-y-60 rounded-lg">
            <div>
              <h2 className="font-bold text-4xl text-center mb-3">About Us</h2>
              <p>
                The SSG Connect is a comprehensive digital platform meticulously
                designed to streamline student services and enhance engagement
                within CTU Argao (CTU-AC)
              </p>
              <h4 className="py-3 font-bold text-lg">What is SSGConnect?</h4>
              <p>
                The SSG Connect is a comprehensive digital platform meticulously
                designed to streamline student services and enhance engagement
                within CTU Argao (CTU-AC)
              </p>
            </div>
            <button className="bg-primary px-8 py-2 rounded-3xl text-white mt-16">
              Chat us
            </button>
          </div>
        </div>
      </section>
      <section className="relative w-full flex bg-slate-50 px-16 py-10 gap-10 ">
        <div className="text-center px-2 flex-1">
          <h1 className="font-bold text-4xl mb-8">SSG Achievements</h1>
          <p className="font-bold font-serif">
            {ssgAchievements[activeAchievement].title}
          </p>
          <p className="text-sm mt-2 italic tracking-wide leading-7">
            {ssgAchievements[activeAchievement].description}
          </p>
        </div>
        <div className="flex-1">
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
      <section className="w-full p-20 bg-white">
        <div className="flex bg-black p-10 rounded-md overflow-hidden">
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
          <div className="flex-1 flex items-center justify-center relative">
            <Image
              src={"/imgs/cta-img.png"}
              width={500}
              height={500}
              className="translate-y-10 absolute -right-7"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
