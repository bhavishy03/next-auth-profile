import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    token: "mock-jwt-token-123",
  });
}
