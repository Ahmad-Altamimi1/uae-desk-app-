"use client";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import galleryExport from "@/public/images/dashboard/customers/gallery-export.png";
import Image from "next/image";

type FileData = {
  file: File;
  previewUrl: string;
  documentType?: string;
  addedDate: Date;
};
interface IProps {
  setFilesData: React.Dispatch<React.SetStateAction<FileData[]>>;
}

export function DropMediaModal({ setFilesData }: IProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const filesWithPreview = acceptedFiles.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      addedDate: new Date(),
      documentType: getDocumentType(file),
    }));
    setFilesData((prev) => [...prev, ...filesWithPreview]);
  }, []);

  const getDocumentType = (file: File): string => {
    if (file.type.startsWith("image/")) {
      return "Image";
    } else if (file.type === "application/pdf") {
      return "PDF Document";
    } else if (
      file.type.includes("spreadsheet") ||
      file.name.endsWith(".csv")
    ) {
      return "Spreadsheet";
    } else if (file.type.includes("text") || file.name.endsWith(".txt")) {
      return "Text Document";
    } else if (file.name.endsWith(".json")) {
      return "JSON File";
    }
    return "Document";
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div
        {...getRootProps()}
        className={`
        w-full 
        border-2 border-dashed rounded-2xl transition-all duration-300 ease-in-out
        p-6 cursor-pointer bg-background
        ${
          isDragActive
            ? "animate-bounce border-primary bg-muted/50"
            : "border-muted"
        }
      `}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col md:flex-row gap-6 items-center justify-center transition-all">
          <div className="bg-muted p-6 rounded-xl shadow-sm hover:scale-105 transform transition duration-200">
            <Image
              src={galleryExport || "/placeholder.svg"}
              alt="galleryExport"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col gap-2 text-center md:text-left">
            <p className="text-lg font-medium">Upload Image Or File</p>
            <p className="text-muted-foreground text-sm">
              Select from your gallery image or file you want to upload
            </p>
            <div className="text-muted-foreground text-xs leading-tight">
              <p>Available Extensions:</p>
              <p className="font-semibold ">
                (png - jpg - jpeg - pdf - txt - json - csv)
              </p>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
}
