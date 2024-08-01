"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { APP_STATUS, UPLOADING_BUTTON_TEXT, API_URL } from "@/constants";
import { type AppStatusType } from "@/types";
import { uploadFile } from "@/api";
import { toast } from "sonner";
import { useBlobList } from "@/context/blobContext";
import { useRouter } from "next/navigation";

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const { blobList, setBlobList } = useBlobList();
  const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.IDLE);
  const router = useRouter(); // Use router here

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      toast.error("No file selected");
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      // 5MB
      toast.error("File size must be less than 5MB");
      return;
    }
    //Here you would call the API for an start-uploading message http://example.com/start-upload
    setFile(selectedFile);
    setAppStatus(APP_STATUS.READY_UPLOAD);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (appStatus !== APP_STATUS.READY_UPLOAD || !file) {
      toast.error("Select a file to upload");
      return;
    }
    setAppStatus(APP_STATUS.UPLOADING);
    const [err, newBlob] = await uploadFile(file, API_URL + `/api/file?filename=${file.name}`);
    if (err) {
      setAppStatus(APP_STATUS.ERROR);
      //Here you would call the API for an error message http://example.com/fail-upload
      toast.error(err.message);
      return;
    }
    if (!(newBlob instanceof Error)) {
      setBlobList([...blobList, newBlob]); // Update the blob list
      //Here you would call the API for an success message http://example.com/success
      toast.success(`File ${file.name} uploaded successfully`);
      setAppStatus(APP_STATUS.IDLE);
      setFile(null);
    }
  };

  const showButtonFlag = appStatus === APP_STATUS.READY_UPLOAD || appStatus === APP_STATUS.UPLOADING;

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label className="block mb-3">
        <input disabled={appStatus === APP_STATUS.UPLOADING} type="file" onChange={handleInputChange} />
      </label>
      {showButtonFlag && (
        <Button disabled={appStatus === APP_STATUS.UPLOADING} variant="secondary">
          {UPLOADING_BUTTON_TEXT[appStatus]}
        </Button>
      )}
    </form>
  );
}
