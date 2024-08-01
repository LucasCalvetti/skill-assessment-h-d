import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PutBlobResult } from "@vercel/blob";

interface ModalProps {
  isOpen: boolean;
  blobData: PutBlobResult;
  onClose: () => void;
  onSave: (file: File, updatedBlobData: Partial<PutBlobResult>) => void;
}

export function EditModalForm({ isOpen, blobData, onClose, onSave }: ModalProps) {
  const [newPathname, setNewPathname] = useState<string>(blobData.pathname);
  const [file, setFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleSave = () => {
    if (file) {
      onSave(file, { pathname: newPathname });
      setNewPathname("");
      setFile(null);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Edit Blob</h2>
        <label className="block mb-2">
          <span className="block text-sm font-medium text-gray-700">New pathname</span>
          <Input type="text" value={newPathname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPathname(e.target.value)} className="mt-1" />
        </label>
        <label className="block mb-2">
          <span className="block text-sm font-medium text-gray-700">Select file</span>
          <input type="file" onChange={handleFileChange} className="mt-1" />
        </label>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
}
