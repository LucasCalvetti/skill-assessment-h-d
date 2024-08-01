import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function DELETE(request: Request): Promise<NextResponse> {
  const json = await request.json();
  await del(json.url);
  return NextResponse.json({ message: "File deleted" });
}
export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (filename && request.body) {
    const blob = await put(filename, request.body, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json(blob);
  } else {
    return NextResponse.json({ error: "filename is required" }, { status: 400 });
  }
}
