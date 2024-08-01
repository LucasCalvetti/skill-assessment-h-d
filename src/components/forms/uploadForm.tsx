"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { APP_STATUS, UPLOADING_BUTTON_TEXT, API_URL, BEGIN_UPLOAD_API, SUCCESS_UPLOAD_API, FAILURE_UPLOAD_API } from "@/constants";
import { type AppStatusType } from "@/types";
import { uploadFile } from "@/api";
import { toast } from "sonner";

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.IDLE);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      //TODO: error management here
      return console.log("No file selected");
    }
    if (file.size > 5 * 1024 * 1024) {
      //TODO: error management here
      return console.log("File too big");
    }
    setFile(file);
    setAppStatus(APP_STATUS.READY_UPLOAD);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (appStatus != APP_STATUS.READY_UPLOAD || !file) {
      //TODO: error management here
      return;
    }
    setAppStatus(APP_STATUS.UPLOADING);
    const [err, result] = await uploadFile(file, API_URL);
    if (err) {
      setAppStatus(APP_STATUS.ERROR);
      toast.error(err.message);
      return;
    }
    setAppStatus(APP_STATUS.READY_USAGE);
    toast.success("File uploaded successfully");
  };

  const showButtonFlag = appStatus === APP_STATUS.READY_UPLOAD || appStatus === APP_STATUS.UPLOADING;
  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label className="block mb-3">
        <input disabled={appStatus == APP_STATUS.UPLOADING} type="file" onChange={handleInputChange} />
      </label>
      {showButtonFlag && (
        <Button disabled={appStatus == APP_STATUS.UPLOADING} variant={"secondary"}>
          {UPLOADING_BUTTON_TEXT[appStatus]}
        </Button>
      )}
    </form>
  );
}
