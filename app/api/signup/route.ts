import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { firstName, lastName, age, dob, email, password } = body;

    // ✅ Proper validation (sab fields)
    if (!firstName || !lastName || !age || !dob || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // mock user creation
    const newUser = { firstName, lastName, age, dob, email };

    console.log("User created:", newUser);

    return NextResponse.json({
      message: "User registered successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
