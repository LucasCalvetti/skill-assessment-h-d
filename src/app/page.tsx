import { UploadForm } from "@/components/forms/uploadForm";
import React from "react";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-5">Upload your file</h1>
      <UploadForm />
    </main>
  );
}
