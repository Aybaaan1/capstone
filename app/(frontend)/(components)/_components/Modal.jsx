"use client";
const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500  px-3 py-1"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
