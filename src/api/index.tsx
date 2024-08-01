export async function uploadFile(file: File, apiUrl: string): Promise<Error[] | [null, boolean]> {
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
    console.log("response: ", response);
    return [null, true];
  } catch (error) {
    if (error instanceof Error) {
      throw [new Error(error.message)];
    }
  }
  return [new Error("Unknown error")];
}
