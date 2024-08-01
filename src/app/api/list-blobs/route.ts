import { list } from "@vercel/blob";

export async function GET(request: Request) {
  try {
    const { blobs } = await list();
    return Response.json(blobs, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los blobs:", error);
    return Response.json({ error: "Error al obtener los blobs" }, { status: 500 });
  }
}
