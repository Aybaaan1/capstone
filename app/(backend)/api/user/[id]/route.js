import { NextResponse } from "next/server";
import db from "@/lib/db"; // Adjust the import based on your project structure

// PUT method to update user information or role
export async function PUT(request, { params }) {
  const { id } = params;
  const { role, email, idnumber, firstname, lastname, program } =
    await request.json();

  try {
    // Check if only the role is provided
    if (
      role !== undefined &&
      (email === undefined ||
        idnumber === undefined ||
        firstname === undefined ||
        lastname === undefined ||
        program === undefined)
    ) {
      const updatedUserRole = await db.user.update({
        where: { id: Number(id) },
        data: { role }, // Update only the role
      });
      return NextResponse.json(updatedUserRole);
    }

    // If all fields for user information are provided, update the user details
    if (email && idnumber && firstname && lastname && program) {
      const updatedUserDetails = await db.user.update({
        where: { id: Number(id) },
        data: { email, idnumber, firstname, lastname, program },
      });
      return NextResponse.json(updatedUserDetails);
    }

    // If neither is provided, return an error
    return NextResponse.json(
      { error: "No valid data provided for update" },
      { status: 400 }
    );
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
