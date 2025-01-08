import { NextResponse } from "next/server";
import db from "@/lib/db"; // Adjust the import based on your project structure
import { uploadImage } from "@/lib/firebase"; // Import the image upload utility

// PUT method to update user information or role
export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const body = await request.json();
    const { role, email, idnumber, firstname, lastname, program, image } = body;

    // Validate the ID
    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Prepare the data object for update
    const data = {};

    // Handle role update
    if (role !== undefined) {
      data.role = role;
    }

    // Handle other fields update
    if (email) data.email = email;
    if (idnumber) data.idnumber = idnumber;
    if (firstname) data.firstname = firstname;
    if (lastname) data.lastname = lastname;
    if (program) data.program = program;

    // If an image URL is provided, no need to upload it again
    if (image && image !== "") {
      data.image = image; // Use the provided image URL
    }

    // If there's no valid data to update, return an error
    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "No valid data provided for update" },
        { status: 400 }
      );
    }

    // Perform the update
    const updatedUser = await db.user.update({
      where: { id: Number(id) },
      data,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    console.log(`Attempting to delete user with ID: ${id}`); // Debug log

    // Ensure id is a number
    const userId = Number(id);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const deletedUser = await db.user.delete({
      where: { id: userId },
    });

    console.log(`User with ID ${id} deleted successfully`); // Debug log

    return NextResponse.json({
      success: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user", details: error.message },
      { status: 500 }
    );
  }
}
