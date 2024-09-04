import { NextResponse } from "next/server";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    connectToDB();

    const { email, password } = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const isMatch = await user.matchPassword(password); // Use the matchPassword method

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
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: `Failed to log in user: ${error.message}` },
      { status: 500 }
    );
  }
}
