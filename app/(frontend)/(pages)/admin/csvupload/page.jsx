"use client";
import { useState } from "react";

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".csv")) {
      setFile(selectedFile);
      setMessage("");
    } else {
      setMessage("Please select a valid .csv file.");
      setFile(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload-csv", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setMessage(data.message || "File uploaded successfully.");
    } catch (error) {
      setMessage("An error occurred while uploading the file.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleUpload} className="bg-white p-6 shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4">Upload CSV File</h1>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Upload
        </button>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default UploadCSV;
