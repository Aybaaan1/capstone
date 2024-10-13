// components/Modal.js
import React from "react";

const Proof = ({ isOpen, onClose, imageSrc }) => {
  if (!isOpen) return null; // Do not render the modal if it is not open

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-2 rounded shadow-lg">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">
          &times; {/* Close button */}
        </button>
        <img
          src={imageSrc}
          alt="Proof of Submission"
          className="max-w-80 h-96"
        />
      </div>
    </div>
  );
};

export default Proof;
