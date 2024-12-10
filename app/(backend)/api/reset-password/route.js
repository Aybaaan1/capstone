import db from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { token, password } = await req.json();

    // Find the user with the reset token that has not expired
    const user = await db.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          gte: new Date(), // Ensure the token hasn't expired
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token." },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and clear the reset token and expiration
    await db.user.update({
      where: { email: user.email },
      data: {
        password: hashedPassword,
        resetPasswordToken: null, // Clear the reset token
        resetPasswordExpires: null, // Clear the expiration time
      },
    });

    return NextResponse.json(
      { message: "Password successfully reset." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { error: "An error occurred while resetting the password." },
      { status: 500 }
    );
  }
}
