"use client";
import React, { useEffect, useState } from "react";
import { UploadForm } from "@/components/forms/uploadForm";
import { useBlobList } from "@/context/blobContext";
import { getBlobs } from "@/api";
import { FileTable } from "@/components/list/fileTable";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { blobList, setBlobList } = useBlobList();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlobs()
      .then((data) => {
        setBlobList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blobs:", error);
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-5">Upload your file</h1>
      <UploadForm />
      {loading ? (
        <Skeleton>
          <FileTable initialBlobList={[]} />
        </Skeleton>
      ) : (
        blobList.length > 0 && <FileTable initialBlobList={blobList} />
      )}
    </main>
  );
}
