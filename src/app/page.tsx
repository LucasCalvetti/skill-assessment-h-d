"use client";
import React from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size > 5 * 1024 * 1024) {
      //TODO: error management here
      return console.log("File too big");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-5">Upload your file</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input type="file" onChange={handleInputChange} />
        <Button type="submit">Hola</Button>
      </form>
    </main>
  );
}
