"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import galleryExport from "@/public/images/dashboard/customers/gallery-export.png";
import Image from "next/image";
import { Download, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type FileData = {
  file: File;
  previewUrl: string;
  documentType?: string;
  addedDate: Date;
};
interface IProps {
  filesData: FileData[];
  setFilesData: React.Dispatch<React.SetStateAction<FileData[]>>;
}

export function MyDropzone({ filesData, setFilesData }: IProps) {
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);

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

  const handleDelete = (index: number) => {
    const newFilesData = [...filesData];
    URL.revokeObjectURL(newFilesData[index].previewUrl);
    newFilesData.splice(index, 1);
    setFilesData(newFilesData);
    if (selectedFile && selectedFile === filesData[index]) {
      setSelectedFile(null);
    }
  };

  const handleDownload = (fileData: FileData) => {
    const link = document.createElement("a");
    link.href = fileData.previewUrl;
    link.download = fileData.file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderFilePreview = (fileData: FileData) => {
    const { file, previewUrl } = fileData;

    if (file.type.startsWith("image/")) {
      return (
        <div className="relative group">
          <img
            src={previewUrl || "/placeholder.svg"}
            alt={file.name}
            className="w-full h-48 object-cover rounded-md"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(fileData);
              }}
            >
              <Eye className="h-5 w-5" />
            </Button>
          </div>
        </div>
      );
    }

    if (file.type === "application/pdf") {
      return (
        <div className="flex items-center justify-center h-48 bg-muted/30 rounded-md">
          <div className="w-24 h-32 bg-red-600 rounded-md relative flex items-center justify-center">
            <div className="absolute top-0 right-0 w-0 h-0 border-t-8 border-r-8 border-t-red-800 border-r-red-800"></div>
            <span className="text-white font-bold">PDF</span>
          </div>
        </div>
      );
    }

    if (
      file.type.startsWith("text/") ||
      file.name.endsWith(".json") ||
      file.name.endsWith(".csv")
    ) {
      return (
        <div className="flex items-center justify-center h-48 bg-muted/30 rounded-md">
          <div className="w-24 h-32 bg-gray-200 rounded-md relative flex items-center justify-center">
            <div className="absolute top-0 right-0 w-0 h-0 border-t-8 border-r-8 border-t-gray-300 border-r-gray-300"></div>
            <span className="text-gray-600 font-bold">
              {file.name.split(".").pop()?.toUpperCase()}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-48 bg-muted/30 rounded-md">
        <div className="text-xs text-muted-foreground">
          ❗ Unsupported preview. You can still download or open it manually.
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        {...getRootProps()}
        className={`
        w-full md:w-[60%] lg:w-[40%]
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
              <p className="font-semibold text-primary">
                (png - jpg - jpeg - pdf - txt - json - csv)
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        {filesData.length > 0 && (
          <div className="mt-6 space-y-4">
            <p className="font-semibold text-sm text-muted-foreground">
              Uploaded Files:
            </p>
            <div className="grid grid-cols-2 gap-4">
              {filesData.map((fileData, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row border rounded-lg shadow-sm bg-white overflow-hidden"
                >
                  <div className="w-full md:w-64 h-48  flex items-center justify-center p-4">
                    {renderFilePreview(fileData)}
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-medium truncate">
                        {fileData.file.name}
                      </h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Document Type:
                          </p>
                          <p className="text-sm font-medium text-primary">
                            {fileData.documentType}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Added Date:
                          </p>
                          <p className="text-sm font-medium">
                            {fileData.addedDate.toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => handleDownload(fileData)}
                      >
                        <Download className="h-4 w-4 text-amber-500" />
                        <span>Download</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => handleDelete(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* File Preview Modal */}
      {selectedFile && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedFile(null)}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">{selectedFile.file.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFile(null)}
              >
                Close
              </Button>
            </div>
            <div className="flex justify-center">
              {selectedFile.file.type.startsWith("image/") ? (
                <img
                  src={selectedFile.previewUrl || "/placeholder.svg"}
                  alt={selectedFile.file.name}
                  className="max-h-[70vh] object-contain"
                />
              ) : selectedFile.file.type === "application/pdf" ? (
                <iframe
                  src={selectedFile.previewUrl}
                  title={selectedFile.file.name}
                  className="w-full h-[70vh]"
                ></iframe>
              ) : (
                <div className="p-8 text-center">
                  <p>Preview not available for this file type.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => handleDownload(selectedFile)}
                  >
                    Download to view
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
