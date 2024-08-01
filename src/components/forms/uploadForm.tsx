"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { APP_STATUS, UPLOADING_BUTTON_TEXT } from "@/constants";
import { type AppStatusType } from "@/types";

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //TODO: send file to API
  };

  const showButtonFlag = appStatus == APP_STATUS.READY_UPLOAD || appStatus == APP_STATUS.READY_USAGE;
  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label className="block mb-3">
        <input disabled={appStatus == APP_STATUS.UPLOADING} type="file" onChange={handleInputChange} />
      </label>
      {showButtonFlag && <Button variant={"secondary"}>{UPLOADING_BUTTON_TEXT[appStatus]}</Button>}
    </form>
  );
}
