import { NextResponse } from "next/server";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";

export async function POST(request: Request) {
  try {
    connectToDB();

    const { name, email, password } = await request.json();

    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const user = await User.create({ name, email, password });

    return NextResponse.json({
      message: "User registered successfully",
      user,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: `Failed to register user: ${error.message}` },
      { status: 500 }
    );
  }
}
