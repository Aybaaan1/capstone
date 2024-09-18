"use client";
import { useState } from "react";
import Image from "next/image";

export default function Purchase() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const merchandise = [
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
    {
      picture: "/imgs/flask.png",
      item: "University Tumbler",
      price: "299.00",
    },
  ];

  const order = [
    {
      picture: "/imgs/tshirt.png",
      text: "Choose an item.",
    },
    {
      picture: "/imgs/lanyards.png",
      text: "Choose an item.",
    },
    {
      picture: "/imgs/totebag.png",
      text: "Choose an item.",
    },
    {
      picture: "/imgs/flask.png",
      text: "Choose an item.",
    },
  ];

  const order1 = [
    {
      picture: "/imgs/tshirt.png",
      text: "Select what you want to buy.",
    },
    {
      picture: "/imgs/lanyards.png",
      text: "Select what you want to buy.",
    },
    {
      picture: "/imgs/totebag.png",
      text: "Select what you want to buy.",
    },
    {
      picture: "/imgs/flask.png",
      text: "Select what you want to buy.",
    },
  ];

  const order2 = [
    {
      picture: "/imgs/tshirt.png",
      text: "Click Order now.",
    },
    {
      picture: "/imgs/lanyards.png",
      text: "Click Order now.",
    },
    {
      picture: "/imgs/totebag.png",
      text: "Click Order now.",
    },
    {
      picture: "/imgs/flask.png",
      text: "Click Order now.",
    },
  ];

  const order3 = [
    {
      picture: "/imgs/tshirt.png",
      text: "Click view items.",
    },
    {
      picture: "/imgs/lanyards.png",
      text: "Click view items.",
    },
    {
      picture: "/imgs/totebag.png",
      text: "Click view items.",
    },
    {
      picture: "/imgs/flask.png",
      text: "Click view items.",
    },
  ];

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
  };

  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div>
      <header className="relative">
        <section
          style={{ backgroundImage: "url('/imgs/ctulogo.png')" }}
          className="w-full h-56 mt-10"
        ></section>
      </header>
      <section>
        <div>
          <h1 className="text-center text-4xl font-bold mt-12 tracking-wide">
            University Merchandise
          </h1>
        </div>
        <div>
          <div className="flex flex-wrap justify-center">
            <button
              onClick={handleToggleCart}
              className="absolute top-4 right-10 bg-transparent p-2 rounded-full"
            >
              <Image
                src="/imgs/cart-icon.png"
                height={35}
                width={35}
                alt="Cart Icon"
              />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                  {cart.length}
                </span>
              )}
            </button>
            {isCartOpen && (
              <div className="absolute top-16 right-4 bg-white p-4 shadow-lg rounded-lg">
                <h2 className="font-bold">Cart</h2>
                {cart.length > 0 ? (
                  cart.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Image
                        src={item.picture}
                        height={50}
                        width={50}
                        alt={item.item}
                      />
                      <div>
                        <p>{item.item}</p>
                        <p>Price: P{item.price}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Your cart is empty.</p>
                )}
                <button className="mt-2 bg-primary text-white px-4 py-2 rounded-full">
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 place-items-center px-20">
          {merchandise.map((merch, index) => (
            <div
              key={index}
              className="text-black flex flex-col gap-2 bg-white py-12 rounded-xl"
            >
              <Image
                src={merch.picture}
                height={200}
                width={200}
                alt="Item picture"
              />
              <p>{merch.item}</p>
              <p>Price: P{merch.price}</p>
              <div>
                <button
                  onClick={() => handleAddToCart(merch)}
                  className="bg-primary text-white px-3 py-2 rounded-full"
                >
                  Order now
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center">
          <button className="border-black border-[1px] text-base rounded-full px-20 py-2">
            See All
          </button>
        </div>
      </section>
      <section className="text-center mt-16">
        <h1 className="text-3xl font-bold">How to Order?</h1>
        <div className="flex items-center gap-2 mt-20 px-32">
          <div>
            <h1 className="text-6xl font-bold text-gray-300">1</h1>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-[12px]">Step 1</p>
            <h3 className="font-bold">Choose an Item</h3>
          </div>
        </div>
        <section>
          <div className="grid grid-cols-4 place-items-center px-20">
            {order.map((merch, index) => (
              <div
                key={index}
                className="text-black flex flex-col gap-2 items-center bg-white py-12"
              >
                <Image
                  className="rounded-full"
                  src={merch.picture}
                  height={200}
                  width={200}
                  alt="Order picture"
                />
                <p className="py-2 px-2 mt-2 ">{merch.text}</p>
              </div>
            ))}
          </div>
        </section>
        <div className="flex items-center gap-2 mt-5 px-32">
          <div>
            <h1 className="text-6xl font-bold text-gray-300">2</h1>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-[12px]">Step 2</p>
            <h3 className="font-bold">Click your Item.</h3>
          </div>
        </div>
        <section>
          <div className="grid grid-cols-4 place-items-center px-20">
            {order1.map((merch, index) => (
              <div
                key={index}
                className="text-black flex flex-col gap-2 items-center bg-white py-12"
              >
                <Image
                  className="rounded-full"
                  src={merch.picture}
                  height={200}
                  width={200}
                  alt="Order picture"
                />
                <p className="py-2 px-2 mt-2 ">{merch.text}</p>
              </div>
            ))}
          </div>
        </section>
        <div className="flex items-center gap-2 mt-5 px-32">
          <div>
            <h1 className="text-6xl font-bold text-gray-300">3</h1>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-[12px]">Step 3</p>
            <h3 className="font-bold">Click Order Now.</h3>
          </div>
        </div>
        <section>
          <div className="grid grid-cols-4 place-items-center px-20">
            {order2.map((merch, index) => (
              <div
                key={index}
                className="text-black flex flex-col gap-2 items-center bg-white py-12"
              >
                <Image
                  className="rounded-full"
                  src={merch.picture}
                  height={200}
                  width={200}
                  alt="Order picture"
                />
                <p className="py-2 px-2 mt-2 ">{merch.text}</p>
              </div>
            ))}
          </div>
        </section>
        <div className="flex items-center gap-2 mt-5 px-32">
          <div>
            <h1 className="text-6xl font-bold text-gray-300">4</h1>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-[12px]">Step 4</p>
            <h3 className="font-bold">Process Payment</h3>
          </div>
        </div>
        <section>
          <div className="grid grid-cols-4 place-items-center px-20">
            {order3.map((merch, index) => (
              <div
                key={index}
                className="text-black flex flex-col gap-2 items-center bg-white py-12"
              >
                <Image
                  className="rounded-full"
                  src={merch.picture}
                  height={200}
                  width={200}
                  alt="Order picture"
                />
                <p className="py-2 px-2 mt-2 ">{merch.text}</p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
