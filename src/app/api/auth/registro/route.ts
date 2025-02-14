import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetch(`${process.env.API_REST}/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return NextResponse.json("registrando...");
  } catch (error) {
    return NextResponse.json(
      { error: "Error en el servidor" },
      {
        status: 500,
      }
    );
  }
}
