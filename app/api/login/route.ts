import { NextResponse } from "next/server";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    await connectToDB();

    const { email, password } = await request.json();

    const user = await User.findOne({ email });
    const username = await User.findOne({ name });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return NextResponse.json({
      message: "User logged in successfully",
      token,
      user,
      username
    });
  } catch (error: any) {
    console.error("Login error:", error); // Log the error for debugging
    return NextResponse.json(
      { message: `Failed to log in user: ${error.message}` },
      { status: 500 }
    );
  }
}
