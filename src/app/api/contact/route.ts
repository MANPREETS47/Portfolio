import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
  } catch (err: any) {
    console.error("DB connect error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Database connection error" },
      { status: 500 }
    );
  }

  try {
    const json = await req.json();
    const { name, email, message } = json;

    const contact = await Contact.create({ name, email, message });

    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error: any) {
    console.error("Contact create error:", error);
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e: any) => e.message);
      return NextResponse.json({ success: false, error: errors }, { status: 422 });
    }
    return NextResponse.json({ success: false, error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
