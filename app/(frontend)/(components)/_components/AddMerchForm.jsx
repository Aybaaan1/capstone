import React, { useState } from "react";

const AddMerchForm = ({ onAddItem }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stocks, setStocks] = useState("");
  const [image, setImage] = useState(null);
  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stocks", stocks);
    formData.append("image", image);
    formData.append("type", type);

    try {
      const response = await fetch("/api/merch", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const newItem = await response.json();
        onAddItem(newItem); // Update parent component UI with new merch
        setIsLoading(false);
        setName("");
        setPrice("");
        setStocks("");
        setImage(null);
        setType("");
      } else {
        throw new Error("Failed to add item");
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      alert("Error adding merch item.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Item Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Stocks</label>
        <input
          type="number"
          value={stocks}
          onChange={(e) => setStocks(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Image</label>
        <input type="file" onChange={handleFileChange} required />
      </div>

      <div>
        <label>Type</label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Adding Item..." : "Add Item"}
      </button>
    </form>
  );
};

export default AddMerchForm;
