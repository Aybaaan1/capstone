"use client";
import { useState } from "react";
import { uploadImage } from "@/lib/imageUpload"; // Your Firebase upload function
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; // Importing useSession from next-auth/react

const UserProfileModal = ({ user, onClose }) => {
  const { data: session, status } = useSession(); // Fetch session data
  const [name, setName] = useState(user?.firstname || ""); // User name
  const [image, setImage] = useState(user?.image || ""); // User image
  const [file, setFile] = useState(null); // Image file to upload
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Handle image change
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImage(URL.createObjectURL(selectedFile)); // Preview image
  };

  const handleSave = async () => {
    setIsLoading(true);
    let imageUrl = image;
    try {
      if (file) {
        // If there’s a file, upload it and get the image URL
        imageUrl = await uploadImage(file); // Upload image to Firebase and get URL
      }

      // Prepare data for updating the profile
      const updateData = {
        firstname: name,
        image: imageUrl, // Use the uploaded image URL
      };

      // Update user profile via API
      await fetch(`/api/user/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      // Update session with the new image URL
      if (session?.user) {
        session.user.image = imageUrl; // Update session's user image
      }

      // Refresh page or user data
      router.refresh();
      onClose();
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // If session is loading or not available, prevent further rendering
  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>You must be logged in to edit your profile.</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      <div className="flex flex-col gap-4">
        {/* Profile Image */}
        <div className="flex flex-col items-center gap-2">
          <img
            src={image || "/imgs/avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default UserProfileModal;
