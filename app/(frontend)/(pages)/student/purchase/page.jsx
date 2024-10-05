"use client";
import { useState } from "react";
import Image from "next/image";

export default function Purchase() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [editedCart, setEditedCart] = useState([]);

  const merchandise = [
    { picture: "/imgs/tshirt.png", item: "University T-Shirt", price: 250.0 },
    { picture: "/imgs/lanyards.png", item: "Department Lanyards", price: 85.0 },
    { picture: "/imgs/totebag.png", item: "University Tote Bag", price: 160.0 },
    { picture: "/imgs/flask.png", item: "University Tumbler", price: 299.0 },
  ];

  const handleAddToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1, size: null }]); // Set size to null
    setTotalPrice((prevPrice) => prevPrice + item.price);
  };

  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCheckout = () => {
    setEditedCart(cart); // Prepopulate modal with current cart
    setIsModalOpen(true);
  };

  const handleUpdateItem = (index, key, value) => {
    const updatedCart = [...editedCart];
    updatedCart[index][key] = value;

    // Recalculate total price
    const updatedTotal = updatedCart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    setEditedCart(updatedCart);
    setTotalPrice(updatedTotal);
  };

  const handleConfirmEdit = () => {
    setCart(editedCart); // Update the cart with edited values
    setIsModalOpen(false); // Close the modal
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    const removedItem = cart[index];

    // Recalculate total price after removing the item
    const updatedTotal = totalPrice - removedItem.price * removedItem.quantity;
    setCart(updatedCart);
    setTotalPrice(updatedTotal);
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
                        <p>Quantity: {item.quantity}</p>
                        {item.size && <p>Size: {item.size}</p>}{" "}
                        {/* Show size if available */}
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
                  className="bg-primary text-white px-3 py-2 rounded-full"
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
                        value={item.size || ""} // Use empty string if size is null
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
    </div>
  );
}
