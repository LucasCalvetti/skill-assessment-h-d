import { API_URL } from "@/constants";
import { PutBlobResult } from "@vercel/blob";
import { list } from "@vercel/blob";

export async function uploadFile(file: File, apiUrl: string): Promise<Error[] | [null, PutBlobResult]> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw [new Error(`HTTP error! Status: ${response.status}`)];
    }
    const blob: PutBlobResult = await response.json();
    return [null, blob];
  } catch (error) {
    if (error instanceof Error) {
      throw [new Error(error.message)];
    }
  }
  return [new Error("Unknown error")];
}

export async function getBlobs(): Promise<any> {
  try {
    const response = await fetch("/api/list-blobs");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Blob[] = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching blobs:", error.message);
      throw new Error(error.message);
    } else {
      console.error("Unknown error:", error);
      throw new Error("An unknown error occurred");
    }
  }
}

export async function deleteFile(url: string): Promise<any> {
  try {
    const response = await fetch(`/api/file`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.message);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting blob:", error.message);
      throw new Error(error.message);
    } else {
      console.error("Unknown error:", error);
      throw new Error("An unknown error occurred");
    }
  }
}

export async function editFile(blob: PutBlobResult, file: File, updatedBlobData: Partial<PutBlobResult>): Promise<any> {
  try {
    // Primero, eliminar el blob existente
    await deleteFile(blob.url);

    // Luego, subir el nuevo archivo
    const [error, newBlob] = await uploadFile(file, API_URL);
    if (error) {
      throw new Error(error.message);
    }

    // Retornar el nuevo blob
    return newBlob;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error editing blob:", error.message);
      throw new Error(error.message);
    } else {
      console.error("Unknown error:", error);
      throw new Error("An unknown error occurred");
    }
  }
}
