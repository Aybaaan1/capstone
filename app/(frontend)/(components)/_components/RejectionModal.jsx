import React from "react";

const RejectionModal = ({
  isOpen,
  onClose,
  onSubmit,
  rejectionReason,
  setRejectionReason,
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(rejectionReason);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-md w-96">
        <h2 className="text-xl font-semibold mb-4">Reject Request</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Rejection Reason:</label>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Reject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RejectionModal;
