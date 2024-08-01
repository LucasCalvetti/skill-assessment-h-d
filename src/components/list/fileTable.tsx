"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PutBlobResult } from "@vercel/blob";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import { deleteFile, editFile } from "@/api";
import { EditModalForm } from "../forms/editModalForm";
import { toast } from "sonner";

interface FileTableProps {
  initialBlobList: PutBlobResult[];
}

export function FileTable({ initialBlobList }: FileTableProps) {
  const [blobList, setBlobList] = useState<PutBlobResult[]>(initialBlobList);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentBlob, setCurrentBlob] = useState<PutBlobResult | null>(null);

  const handleEdit = (blob: PutBlobResult) => {
    setCurrentBlob(blob);
    setIsModalOpen(true);
  };

  const handleDelete = async (url: string) => {
    try {
      await deleteFile(url);
      setBlobList(blobList.filter((blob) => blob.url !== url));
      toast("File deleted successfully");
    } catch (error) {
      console.error("Error deleting blob:", error);
    }
  };

  const handleSave = async (file: File, updatedBlobData: Partial<PutBlobResult>) => {
    if (currentBlob) {
      try {
        await editFile(currentBlob, file, updatedBlobData);
        setBlobList(blobList.map((blob) => (blob.url === currentBlob.url ? { ...blob, ...updatedBlobData } : blob)));
        setIsModalOpen(false);
        toast("File updated successfully");
      } catch (error) {
        console.error("Error editing blob:", error);
      }
    }
  };

  return (
    <>
      <Table className="w-[60vw] m-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Url</TableHead>
            <TableHead>Pathname</TableHead>
            <TableHead>Download URL</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blobList.length > 0 ? (
            blobList.map((blob, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <a href={blob.url} target="_blank" rel="noopener noreferrer">
                    {blob.url}
                  </a>
                </TableCell>
                <TableCell>{blob.pathname}</TableCell>
                <TableCell>
                  <a href={blob.downloadUrl} target="_blank" rel="noopener noreferrer">
                    Download
                  </a>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(blob)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(blob.url)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {currentBlob && <EditModalForm isOpen={isModalOpen} blobData={currentBlob} onClose={() => setIsModalOpen(false)} onSave={handleSave} />}
    </>
  );
}
