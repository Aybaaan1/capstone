"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import { uploadImage } from "@/lib/imageUpload";
import { FaBell } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
// Fetch merchandise items from the API
const fetchMerchItems = async () => {
  try {
    const response = await fetch("/api/merch");
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch merch items");
    }
  } catch (error) {
    console.error("Error fetching merch items:", error);
    return [];
  }
};

export default function Purchase() {
  const [cart, setCart] = useState(() => {
    // Initialize cart from localStorage or empty array
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");

      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [editedCart, setEditedCart] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [merchItems, setMerchItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("");
  const [proofFile, setProofFile] = useState(null);
  const [error, setError] = useState("");
  const [notifications, setNotifications] = useState([]); // Stores notifications for the user
  const [showNotifications, setShowNotifications] = useState(false);
  const [merchId, setMerchId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("");
  const [status] = useState("pending");
  const [cartItems, setCartItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const { data: session, statuss } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();

  useEffect(() => {
    if (statuss === "loading") return; // If loading, don't do anything
    if (session && session.user.role !== "STUDENT") {
      router.push("/admin"); // Redirect to homepage if the role is not ADMIN
    }
  }, [session, statuss, router]);

  // Fetch merchandise items on component mount
  useEffect(() => {
    const loadMerchItems = async () => {
      const items = await fetchMerchItems();
      setMerchItems(items);
      setLoading(false);
    };
    loadMerchItems();
  }, []);

  useEffect(() => {
    // Update local storage and total price when cart changes
    localStorage.setItem("cart", JSON.stringify(cart));

    const updatedTotal = cart.reduce(
      (total, item) => total + item.price * item.quantity, // Using item.quantity
      0
    );
    setTotalPrice(updatedTotal);
  }, [cart]);

  const handleAddToCart = (item) => {
    console.log("Item added to cart:", item);
    setCart((prevCart) => {
      // Check if an item with the same name and type exists
      const existingItem = prevCart.find(
        (cartItem) => cartItem.name === item.name && cartItem.type === item.type
      );

      if (existingItem) {
        // Update the quantity if the item already exists
        return prevCart.map((cartItem) =>
          cartItem.name === item.name && cartItem.type === item.type
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Add a new entry if the item is "new"
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };
  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications); // Toggle notification visibility
  };

  const handleCheckout = () => {
    setEditedCart(cart);
    setIsModalOpen(true);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
      // Handle file upload, e.g., upload to a server
      setProofFile(file); // Store the file in state to include it in the order
      console.log("File selected:", file.name);
    } else {
      console.error("No file selected");
    }
  };
  const handleUpdateItem = (index, key, value) => {
    const updatedCart = [...editedCart];
    updatedCart[index][key] = value;

    const updatedTotal = updatedCart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    setEditedCart(updatedCart);
    setTotalPrice(updatedTotal);
  };

  const handleLogoutClick = async () => {
    await signOut();
    router.push("/signin");
  };

  const handleConfirmEdit = async () => {
    if (!proofFile) {
      setError("Please upload a proof of payment.");
      return;
    }

    // Prepare cart items
    const preparedCartItems = editedCart.map((item) => ({
      merchId: item.id,
      quantity: item.quantity || 1, // Default quantity to 1 if not provided
      size: item.size || null, // Default size to null if not provided
    }));

    console.log("Prepared Cart Items:", preparedCartItems);

    if (!preparedCartItems || preparedCartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    // Upload proof image
    const fileUrl = await uploadImage(proofFile);

    // Prepare order data
    const orderData = {
      userId,
      cartItems: preparedCartItems,
      proof: fileUrl,
      status: "Pending",
    };

    console.log("DATA:", orderData);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Order placed successfully:", data);
        setSuccessMessage("Your order has been placed successfully!");
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData.error);
        setError(errorData.error || "Error placing the order.");
      }
    } catch (error) {
      console.error("Error submitting the order:", error);
      setError("An error occurred while placing the order.");
    }
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    const removedItem = cart[index];

    const updatedTotal = totalPrice - removedItem.price * removedItem.quantity;
    setCart(updatedCart);
    setTotalPrice(updatedTotal);
  };
  const filteredMerchItems = filterType
    ? merchItems.filter((item) => item.type === filterType)
    : merchItems;

  const renderSizeField = (item, index) => {
    if (item.type === "T-shirt") {
      return (
        <div className="flex items-center gap-2">
          <label htmlFor={`size-${index}`} className="text-sm font-semibold">
            Size:
          </label>
          <select
            id={`size-${index}`}
            value={item.size || ""}
            onChange={(e) => handleUpdateItem(index, "size", e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="">Select</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      );
    } else if (item.type === "Lanyards") {
      return (
        <div className="flex items-center gap-2">
          <label htmlFor={`program-${index}`} className="text-sm font-semibold">
            Program:
          </label>
          <input
            type="text"
            id={`program-${index}`}
            value={item.size || ""}
            onChange={(e) => handleUpdateItem(index, "size", e.target.value)}
            className="border rounded px-2 py-1 text-sm"
            placeholder="Enter Program"
          />
        </div>
      );
    } else if (item.type === "Pins" || item.type === "Stickers") {
      return (
        <div className="flex items-center gap-2">
          <label htmlFor={`design-${index}`} className="text-sm font-semibold">
            Design:
          </label>
          <select
            id={`design-${index}`}
            value={item.size || ""}
            onChange={(e) => handleUpdateItem(index, "size", e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="">Select Design</option>
            <option value="Design1">Design1</option>
            <option value="Design2">Design2</option>
            <option value="Design3">Design3</option>
          </select>
        </div>
      );
    }
  };
  return (
    <div>
      <header className="relative mt-10">
        <section
          style={{ backgroundImage: "url('/imgs/ctulogo.png')" }}
          className="w-full h-56 bg-cover bg-no-repeat bg-center"
        ></section>
      </header>
      {session && (
        <button
          onClick={handleLogoutClick}
          className="bg-black px-3 py-2 rounded-2xl text-sm text-white hidden lg:block absolute top-6 right-40"
        >
          Log out
        </button>
      )}
      <div className="absolute top-6 right-[18%] md:right-[10%] lg:right-10">
        <button onClick={handleNotificationClick} className="relative">
          <FaBell className="text-3xl text-primary" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </button>
        {showNotifications && (
          <div className="absolute right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-3 w-72">
            <h4 className="font-bold text-lg mb-2">Notifications</h4>
            {notifications.length === 0 ? (
              <p className="text-gray-500">No notifications</p>
            ) : (
              <ul className="list-disc list-inside">
                {notifications.map((notification, index) => (
                  <li
                    key={index}
                    className="text-sm mb-1 flex justify-between items-center"
                  >
                    <span>{notification}</span>
                    <button
                      onClick={() => {
                        const updatedNotifications = notifications.filter(
                          (_, i) => i !== index
                        );
                        setNotifications(updatedNotifications);
                      }}
                      className="text-red-500 text-sm ml-2"
                      aria-label="Remove notification"
                    >
                      <span className="font-bold">&times;</span>{" "}
                      {/* Red close icon */}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <section>
        <h1 className="text-center text-4xl font-bold mt-12 tracking-wide">
          University Merchandise
        </h1>
        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          {/* Filter Buttons */}
          <button
            onClick={() => setFilterType("T-shirt")}
            className="px-8 md:px-4 py-1 md:py-2 bg-blue-500 text-white rounded-lg"
          >
            T-shirt
          </button>
          <button
            onClick={() => setFilterType("Lanyards")}
            className="px-8 md:px-4 py-1 md:py-2 bg-green-500 text-white rounded-lg"
          >
            Lanyards
          </button>
          <button
            onClick={() => setFilterType("Pins")}
            className="px-8 md:px-4 py-1 md:py-2 bg-yellow-500 text-white rounded-lg"
          >
            Pins
          </button>
          <button
            onClick={() => setFilterType("Stickers")}
            className="px-8 md:px-4 py-1 md:py-2 bg-purple-500 text-white rounded-lg"
          >
            Stickers
          </button>
          <button
            onClick={() => setFilterType("")}
            className="px-8 md:px-4 py-1 md:py-2 bg-gray-500 text-white rounded-lg"
          >
            All
          </button>
        </div>

        <div className="flex flex-wrap justify-center">
          <button
            onClick={handleToggleCart}
            className="absolute top-4 right-[26%] md:right-[15%] lg:right-24 bg-transparent p-2 rounded-full"
          >
            <Image
              src="/imgs/cart-icon.png"
              height={33}
              width={33}
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
                      src={item.image}
                      height={50}
                      width={50}
                      alt={item.name}
                    />
                    <div>
                      <p>{item.name}</p>
                      <p>Price: P{item.price}</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center px-20 mt-6">
          {loading ? (
            <p>Loading items...</p>
          ) : (
            filteredMerchItems.map((merch, index) => (
              <div
                key={index}
                className="text-black flex flex-col gap-2 bg-white py-12 rounded-xl"
              >
                <Image
                  src={merch.image}
                  height={200}
                  width={200}
                  alt={merch.name}
                />
                <p>{merch.name}</p>
                <p>Price: P{merch.price}</p>
                <p>Stocks: {merch.stocks}</p>
                <div>
                  <button
                    onClick={() => handleAddToCart(merch)}
                    className="bg-primary text-white px-3 py-1 rounded-lg text-m"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      {/* Modal for editing cart */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[800px] max-h-[90%] overflow-y-auto">
            {/* Display success message */}
            {successMessage && (
              <div className="success-message text-green-400 text-center">
                {successMessage}
              </div>
            )}
            {/* Modal Header */}
            <h2 className="text-lg font-bold text-center mb-4">
              Edit Cart & Payment
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Cart Section */}
              <div className="border-r pr-4">
                <h3 className="text-md font-semibold mb-3">Cart Items</h3>
                {editedCart.map((item, index) => (
                  <div
                    key={index}
                    className="border-b pb-3 mb-3 flex justify-between items-start"
                  >
                    <Image
                      src={item.image}
                      height={40}
                      width={40}
                      alt={item.name}
                      className="rounded"
                    />
                    <div className="flex-1 ml-4">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Price: P{item.price}
                      </p>
                      <div className="mt-2 flex flex-col gap-2">
                        {/* Quantity Field */}
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor={`quantity-${index}`}
                            className="text-sm font-semibold"
                          >
                            Quantity:
                          </label>
                          <input
                            type="number"
                            id={`quantity-${index}`}
                            value={item.quantity}
                            onChange={(e) =>
                              handleUpdateItem(
                                index,
                                "quantity",
                                parseInt(e.target.value)
                              )
                            }
                            className="border rounded px-2 py-1 w-16 text-sm"
                            min="1"
                          />
                        </div>

                        {/* Size/Program Field */}
                        {renderSizeField(item, index)}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-right text-sm font-semibold">
                  Total: P{totalPrice.toFixed(2)}
                </div>
              </div>

              {/* Right: Payment Section */}
              <div className="pl-4">
                <h3 className="text-md font-semibold mb-3">Payment</h3>
                <div className="flex flex-col items-center gap-3">
                  <Image
                    src="/imgs/qrcode.png"
                    height={100}
                    width={200}
                    alt="QR Code"
                    className="rounded"
                  />
                  <p className="text-center text-sm">
                    Scan this QR code to complete the payment.
                  </p>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="border rounded px-2 py-1 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleConfirmEdit}
                className="bg-primary text-white px-6 py-2 rounded-full text-sm"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white px-6 py-2 rounded-full text-sm"
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
