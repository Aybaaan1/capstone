import { storage } from "./firebase"; // Ensure this path is correct
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImage = async (file) => {
  try {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL; // Return the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image:", error); // Log any upload errors
    throw error; // Rethrow error to handle it in the calling function
  }
};
