"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [signin, setSignin] = useState([]);

  async function fetchUser() {
    try {
      const res = await fetch("/api/signin");
      const data = await res.json();
      setSignin(data.signin);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(signin);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/signin/new", {
      method: "POST",
      body: JSON.stringify({ email, pass }), // Changed password to pass
    });
    if (res.ok) {
      fetchUser();
      alert("Submitted successfully");
    } else {
      alert("Something went wrong");
    }
  }

  const SignInModal = () => {
    const [openedForm, setOpenedForm] = useState("signin");

    const sociallinks = [
      { image: "/imgs/youtube-icon.png", href: "/" },
      { image: "/imgs/fb-icon.png", href: "/" },
    ];

    function modalHandler() {
      setOpenedForm("signup");
    }

    return (
      <div className="flex absolute z-30 w-full h-full items-center justify-center -bottom-[0.2px] bg-[rgba(0,0,0,0.5)]">
        {openedForm === "signin" ? (
          <form
            onSubmit={handleSubmit}
            className="w-2/5 relative p-6 bg-white rounded-lg"
          >
            {/* close button */}
            <button className="absolute p-2 right-4 top-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* FORM CONTEXT */}
            <h3 className="text-center font-bold text-2xl">
              {openedForm === "signin" ? "Sign in" : "Sign up"}
            </h3>

            <div className="mt-6">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="p-2 mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
              />
            </div>

            <div className="mt-2">
              <label
                htmlFor="pass"
                className="block text-sm font-semibold text-gray-700"
              >
                Pass {/* Updated the label */}
              </label>
              <input
                type="password"
                id="pass"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Enter your pass"
                className="p-2 mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
              />
            </div>

            <label
              htmlFor="Option1"
              className="flex cursor-pointer items-center justify-between gap-2 mt-3"
            >
              <div className="flex gap-2">
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option1"
                  />
                </div>

                <div>
                  <strong className="font-normal text-gray-900">
                    Remember me
                  </strong>
                </div>
              </div>
              <span className="text-primary">Forgot Pass?</span>
            </label>

            <button
              type="submit"
              className="bg-primary text-white w-full py-2 rounded-full text-sm mt-5"
            >
              Sign In
            </button>

            <p className="text-center mt-2 text-sm">
              Don't have an account?{" "}
              <button
                className="text-primary cursor-pointer"
                onClick={modalHandler}
              >
                {openedForm === "signin" ? "Sign up" : "Sign in"}
              </button>
            </p>

            <span className="relative flex justify-center mt-14">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

              <span className="relative z-10 bg-white px-6">OR</span>
            </span>

            <div className="flex border items-center justify-center gap-7">
              {sociallinks.map((links) => (
                <a href={links.href} key={links.image}>
                  <Image
                    src={links.image}
                    alt="Social icon"
                    height={40}
                    width={40}
                  />
                </a>
              ))}
            </div>
          </form>
        ) : (
          // The signup form can be similar with slight differences for your logic
          <form className="w-2/5 relative p-6 bg-white absolute">
            {/* Additional code for the signup form */}
          </form>
        )}
      </div>
    );
  };

  return <SignInModal />;
}
