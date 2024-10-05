import { NextResponse } from "next/server";
import db from "@/lib/db"; // Adjust the import based on your project structure

// PUT method to update user information
export async function PUT(request, { params }) {
  const { id } = params;
  const { email, idnumber, firstname, lastname, program } =
    await request.json();

  // Validate required fields
  if (!email || !idnumber || !firstname || !lastname || !program) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const updatedUser = await db.user.update({
      where: { id: Number(id) },
      data: { email, idnumber, firstname, lastname, program },
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

// DELETE method to delete a user
// DELETE method to delete user
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await db.user.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ success: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
