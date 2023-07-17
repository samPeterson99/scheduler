import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("hi");
  const request = await req.json();
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const password = request.password;

  console.log(password);

  if (password === (process.env.NEXT_PUBLIC_SITE_PASSWORD as string)) {
    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } else {
    return NextResponse.json({ error: "invalid password" }, { status: 401 });
  }
}
