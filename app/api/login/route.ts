import { NextResponse } from "next/server";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    await connectToDB();

    const { email, password } = await request.json();

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Check if the password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 401 }
      );
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    // Return the response with the token and user information
    return NextResponse.json({
      message: "User logged in successfully",
      token,
      userId: user._id, // Pass the user ID
      userName: user.name, // Pass the username
    });
  } catch (error: any) {
    console.error("Login error:", error); // Log the error for debugging
    return NextResponse.json(
      { message: `Failed to log in user: ${error.message}` },
      { status: 500 }
    );
  }
}
