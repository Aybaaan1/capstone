"use client";
import { useState } from "react";
import Image from "next/image";

export default function Purchase() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [editedCart, setEditedCart] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false); // Confirmation state

  const merchandise = [
    { picture: "/imgs/tshirt.png", item: "University T-Shirt", price: 250.0 },
    { picture: "/imgs/lanyards.png", item: "Department Lanyards", price: 85.0 },
    { picture: "/imgs/totebag.png", item: "University Tote Bag", price: 160.0 },
    { picture: "/imgs/flask.png", item: "University Tumbler", price: 299.0 },
    { picture: "/imgs/tshirt.png", item: "University T-Shirt", price: 250.0 },
    { picture: "/imgs/lanyards.png", item: "Department Lanyards", price: 85.0 },
    { picture: "/imgs/totebag.png", item: "University Tote Bag", price: 160.0 },
    { picture: "/imgs/flask.png", item: "University Tumbler", price: 299.0 },
  ];

  const handleAddToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1, size: null }]);
    setTotalPrice((prevPrice) => prevPrice + item.price);
  };

  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCheckout = () => {
    setEditedCart(cart);
    setIsModalOpen(true);
  };

  const handleUpdateItem = (index, key, value) => {
    const updatedCart = [...editedCart];
    updatedCart[index][key] = value;

    const updatedTotal = updatedCart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    setEditedCart(updatedCart);
    setTotalPrice(updatedTotal);
  };

  const handleConfirmEdit = () => {
    setCart(editedCart);
    setIsModalOpen(false);
    setIsConfirmed(true); // Set confirmed state to true
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    const removedItem = cart[index];

    const updatedTotal = totalPrice - removedItem.price * removedItem.quantity;
    setCart(updatedCart);
    setTotalPrice(updatedTotal);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Uploaded file: ", file.name);
      // Handle the uploaded file as needed
    }
  };

  return (
    <div>
      <header className="relative mt-10">
        <section
          // , backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center"
          style={{ backgroundImage: "url('/imgs/ctulogo.png')" }}
          className="w-full h-56 bg-cover bg-no-repeat bg-center "
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
                        <p>Quantity: {item.quantity}</p>
                        {item.size && <p>Size: {item.size}</p>}{" "}
                      </div>
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="ml-auto"
                      >
                        <Image
                          src="/imgs/remove.png"
                          height={20}
                          width={20}
                          alt="Remove Icon"
                          className="hover:opacity-75"
                        />
                      </button>
                    </div>
                  ))
                ) : (
                  <p>Your cart is empty.</p>
                )}
                {cart.length > 0 && (
                  <button
                    onClick={handleCheckout}
                    className="mt-2 bg-primary text-white px-4 py-2 rounded-full"
                  >
                    Checkout
                  </button>
                )}
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
                  className="bg-primary text-white px-3 py-1 rounded-lg text-m"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Cart Items</h2>
            {editedCart.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={item.picture}
                    height={50}
                    width={50}
                    alt={item.item}
                  />
                  <div>
                    <p>{item.item}</p>
                    <p>Price: P{item.price}</p>
                    <div className="mt-2">
                      <label>Size: </label>
                      <select
                        value={item.size || ""}
                        onChange={(e) =>
                          handleUpdateItem(index, "size", e.target.value)
                        }
                        className="border rounded px-2 py-1"
                      >
                        <option value="">Select Size</option>
                        <option value="S">Small</option>
                        <option value="M">Medium</option>
                        <option value="L">Large</option>
                      </select>
                    </div>
                    <div className="mt-2">
                      <label>Quantity: </label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateItem(
                            index,
                            "quantity",
                            parseInt(e.target.value)
                          )
                        }
                        className="border rounded px-2 py-1"
                        min="1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <h3>Total Price: P{totalPrice.toFixed(2)}</h3>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleConfirmEdit}
                className="bg-primary text-white px-4 py-2 rounded-full"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-full ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isConfirmed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-10 rounded-lg shadow-lg relative">
            {" "}
            {/* Add relative positioning here */}
            <button
              onClick={() => setIsConfirmed(false)} // Close modal
              className="absolute top-4 right-4 bg-red-500 text-white hover:bg-red-600 px-2 py-1 rounded-full" // Updated classes for positioning
            >
              &times; {/* Close icon */}
            </button>
            <h2 className="text-xl font-bold text-center mb-4">Payment</h2>
            <div className="flex flex-col items-center">
              <Image
                src="/imgs/qrcode.png"
                height={100}
                width={200}
                alt="QR Code"
              />
              <p className="text-center mt-2">
                Scan this QR code to complete the payment
              </p>
            </div>
            <div className="mt-4">
              <label className="block text-center mb-2 font-semibold">
                Upload Payment Proof:
              </label>
              <input
                type="file"
                onChange={handleFileUpload}
                className="block mx-auto text-center"
              />
            </div>
            <div className="flex justify-center mt-4">
              {" "}
              {/* Centering the button */}
              <button
                onClick={() => {
                  // Handle the confirmation logic here
                  console.log("Payment confirmed!");
                }}
                className="bg-primary text-white px-4 py-2 rounded-full"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
