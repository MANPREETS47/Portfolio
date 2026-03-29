import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, email, message } = await req.json();

    const contact = await Contact.create({
      name,
      email,
      message,
    });

    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
