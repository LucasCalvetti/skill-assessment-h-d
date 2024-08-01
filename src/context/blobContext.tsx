"use client";
import React, { createContext, PropsWithChildren, useContext, useState } from "react";
import { PutBlobResult } from "@vercel/blob";

type BlobListContextType = {
  blobList: PutBlobResult[];
  setBlobList: (blob: PutBlobResult[]) => void;
};

const BlobListContext = createContext<BlobListContextType | undefined>(undefined);

export const BlobListProvider = ({ children }: { children: React.ReactNode }) => {
  const [blobList, setBlobList] = useState<PutBlobResult[]>([]);

  return <BlobListContext.Provider value={{ blobList, setBlobList }}>{children}</BlobListContext.Provider>;
};

export const useBlobList = () => {
  const context = useContext(BlobListContext);
  if (!context) {
    throw new Error("useBlobList must be used within a BlobProvider");
  }
  return context;
};
