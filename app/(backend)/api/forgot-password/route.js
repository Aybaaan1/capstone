import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import crypto from "crypto";
import db from "@/lib/db"; // Ensure your db connection is correct

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      throw new Error("Email is required");
    }

    // Generate a reset token and its expiration
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = Date.now() + 3600000; // 1 hour from now

    // Save the reset token and expiration to the database
    const updatedUser = await db.user.update({
      where: { email },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: new Date(resetTokenExpires),
      },
    });

    console.log("User updated successfully:", updatedUser);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Make sure this matches your .env file
      },
    });

    const resetLink = `https://ssgconnect.vercel.app/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: "Password reset email sent successfully.",
    });
  } catch (error) {
    console.error("Error in forgot-password API:", error);
    return NextResponse.json(
      { error: "Failed to send password reset email." },
      { status: 500 }
    );
  }
}
