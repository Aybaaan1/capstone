import { useState } from "react";

const SignInModal = () => {
  const [openedForm, setOpenedForm] = useState("signin");

  return (
    <form className="w-2/5 relative p-6 bg-white">
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
          {" "}
          Email{" "}
        </label>

        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          className="p-2 mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
        />
      </div>
      <div className="mt-2">
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-gray-700"
        >
          {" "}
          Password{" "}
        </label>

        <input
          type="password"
          id="password"
          placeholder="Enter your pasword"
          className="p-2 mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
        />
      </div>

      <label
        htmlFor="Option1"
        className="flex cursor-pointer items-center justify-between gap-2 mt-3 "
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
            <strong className="font-normal text-gray-900"> Remember me </strong>
          </div>
        </div>
        <span className="text-primary">Forgot Password?</span>
      </label>

      <button className="bg-primary text-white w-full py-2 rounded-full text-sm mt-5">
        Sign In
      </button>
      <p className="text-center mt-2 text-sm">
        Don't have an account?{" "}
        <span className="text-primary cursor-pointer">
          {openedForm === "signin" ? "Sign up" : "Sign in"}
        </span>
      </p>

      <span className="relative flex justify-center mt-14">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

        <span className="relative z-10 bg-white px-6">OR</span>
      </span>

      <div>
        <button className="bg-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="24px"
            height="24px"
            className="bg-black"
          >
            <path
              fill="#ffffff"
              d="M24 9.5c3.3 0 5.7 1.3 7.3 2.6l5.5-5.5C32.6 3.8 28.7 2 24 2 14.7 2 7 9.7 7 19s7.7 17 17 17c5 0 8.7-1.7 11.5-4.6 3.1-3.1 4-7.7 4-11.9H24v7h13.8c-.7 4.1-3.1 7.6-6.8 9.6C28.7 39 26.5 40 24 40c-7.7 0-14-6.3-14-14S16.3 9.5 24 9.5z"
            />
          </svg>
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24px"
            height="24px"
            className="bg-black"
          >
            <path
              d="M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.351C0 23.41.59 24 1.325 24h11.495v-9.294H9.622V10.71h3.198V8.299c0-3.17 1.937-4.898 4.773-4.898 1.362 0 2.531.101 2.871.146v3.33l-1.971.001c-1.545 0-1.843.734-1.843 1.81v2.372h3.688l-.481 3.997h-3.207V24h6.282c.735 0 1.325-.59 1.325-1.325V1.325C24 .59 23.41 0 22.675 0z"
              fill="#4267B2"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SignInModal;
