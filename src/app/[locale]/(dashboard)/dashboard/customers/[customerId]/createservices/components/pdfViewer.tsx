"use client";
import PdfViewer from "@/components/pdfViewr";
import { IMAGE_BASE_URL } from "@/constants";
import { GroupedMediaRequest } from "@/entities/dashboard";
import React from "react";

const PdfViewerComponent = ({ data }: { data: GroupedMediaRequest[] }) => {
  return data?.map(
    (doc, index) =>
      doc.file_type?.includes("pdf") && (
        <PdfViewer
          // fileUrl={IMAGE_BASE_URL + doc.file_path}
          fileUrl="/dummy.pdf"
          key={`${doc.file_type}-${index}`}
        />
      )
  );
};

export default PdfViewerComponent;
