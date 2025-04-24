"use client";

import type { IMediaData, IResponseCustomer } from "@/entities/dashboard";
import { Download, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { BASE_URL } from "@/constants";
import Image from "next/image";
import NoMediaImage from "@/public/images/dashboard/customers/noMediaFound(en).svg";
import {
  deleteMedia,
  submitVerification,
} from "@/app/[locale]/(dashboard)/actions";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/common/ConfirmDeleteDialog";
import { useParams } from "next/navigation";
import StatusBadge from "../statusBadg";

interface IUploadedMediaProps {
  media: IMediaData[];
  onDownload?: (media: IMediaData) => void;
  onDelete?: (mediaId: number) => void;
  customer: IResponseCustomer;
}

const UploadedMedia = ({
  media,
  onDownload,
  onDelete,
  customer,
}: IUploadedMediaProps) => {
  const [selectedMedia, setSelectedMedia] = useState<IMediaData | null>(null);
  const [isPending, startTransition] = useTransition();
  const [iSubmitVerification, startSubmitVerificationTransition] =
    useTransition();
  const { customerId } = useParams();
  const { status } = customer;
  const handelSubmitVerification = () => {
    startSubmitVerificationTransition(async () => {
      const response = await submitVerification(Number(customerId));
      if (response.success) {
        toast.success("Verification submitted successfully");
      } else {
        toast.error(response.message || "unknown error");
      }
    });
  };
  const ConfirmDelete = (item: IMediaData) => {
    ConfirmDeleteDialog({
      title: "Delete Media",
      message: "Are You Sure To Delete This Media",
      itemName: item.document_name,
      html: (
        <div
          key={item.id}
          className="flex flex-col md:flex-row  bg-white overflow-hidden"
        >
          <div className="w-full md:w-24 h-28 bg-gray-50 flex items-center justify-center p-4">
            {renderFilePreview(item)}
          </div>
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-medium truncate">
                {item.document_name}
              </h3>
              <div className="grid grid-cols-2 gap-x-1 gap-y-2 mt-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Document Type:
                  </p>
                  <p className="text-sm font-medium text-primary">
                    {getDocumentType(item.file_type)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Added Date:</p>
                  <p className="text-sm font-medium">
                    {formatDate(item.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      onDelete: () => handleDelete(item.id),
    });
  };
  const handleDelete = async (mediaId: number) => {
    startTransition(async () => {
      await deleteMedia(mediaId).then((res) => {
        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      });
    });
  };

  const getDocumentType = (fileType: string): string => {
    if (
      fileType.trim() == "image/" ||
      fileType.trim() == "jpg" ||
      fileType.trim() == "jpeg" ||
      fileType.trim() == "png" ||
      fileType.trim() == "gif"
    ) {
      return "Image";
    } else if (fileType === "pdf") {
      return "PDF Document";
    } else if (fileType.includes("spreadsheet") || fileType.includes("csv")) {
      return "Spreadsheet";
    } else if (fileType.includes("text") || fileType.includes("txt")) {
      return "Text Document";
    } else if (fileType.includes("json")) {
      return "JSON File";
    }
    return "Document";
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  const handleDownloadClick = (item: IMediaData) => {
    const fullPath = BASE_URL + "storage/" + item.file_path;

    if (onDownload) {
      onDownload(item);
    } else {
      fetch(fullPath)
        .then((response) => {
          if (!response.ok) {
            toast.error("file was not ok");
            throw new Error("Network response was not ok");
          }
          return response.blob();
        })
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = item.document_name;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  };

  const renderFilePreview = (item: IMediaData) => {
    const fileType = item.file_type;

    if (
      fileType.trim() == "image/" ||
      fileType.trim() == "jpg" ||
      fileType.trim() == "jpeg" ||
      fileType.trim() == "png" ||
      fileType.trim() == "gif"
    ) {
      return (
        <div className="relative group">
          <Image
            src={BASE_URL + "storage/" + item.file_path}
            alt={item.document_name}
            width={100}
            height={100}
            className="w-full h-48 object-cover rounded-md"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMedia(item);
              }}
            >
              <Eye className="h-5 w-5" />
            </Button>
          </div>
        </div>
      );
    }

    if (fileType === "application/pdf") {
      return (
        <div className="flex items-center justify-center h-48 bg-muted/30 rounded-md">
          <div className="w-24 h-32 bg-red-600 rounded-md relative flex items-center justify-center">
            <div className="absolute top-0 right-0 w-0 h-0 border-t-8 border-r-8 border-t-red-800 border-r-red-800"></div>
            <span className="text-white font-bold">PDF</span>
          </div>
        </div>
      );
    }

    // For text files, JSON, CSV
    if (
      fileType.startsWith("text/") ||
      fileType.includes("json") ||
      fileType.includes("csv")
    ) {
      return (
        <div className="flex items-center justify-center h-48 bg-muted/30 rounded-md">
          <div className="w-24 h-32 bg-gray-200 rounded-md relative flex items-center justify-center">
            <div className="absolute top-0 right-0 w-0 h-0 border-t-8 border-r-8 border-t-gray-300 border-r-gray-300"></div>
            <span className="text-gray-600 font-bold">
              {fileType?.split("/").pop()?.toUpperCase()}
            </span>
          </div>
        </div>
      );
    }

    // Default for unsupported file types
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
      <div>
        {media.length > 0 && status == 0 ? (
          <div className="mt-6 space-y-4">
            <p className="font-semibold text-sm text-muted-foreground">
              Uploaded Files:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {media.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row border rounded-lg shadow-sm bg-white overflow-hidden"
                >
                  <div className="w-full md:w-64 h-48 bg-gray-50 flex items-center justify-center p-4">
                    {renderFilePreview(item)}
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-medium truncate">
                        {item.document_name}
                      </h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Document Type:
                          </p>
                          <p className="text-sm font-medium text-primary">
                            {getDocumentType(item.file_type)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Added Date:
                          </p>
                          <p className="text-sm font-medium">
                            {formatDate(item.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-6 mt-4">
                      <Button
                        variant={"ghost"}
                        className="group flex items-center gap-2 cursor-pointer hover:bg-[#e88119] hover:text-white "
                        onClick={() => handleDownloadClick(item)}
                      >
                        <div className="bg-[#E880191A] rounded-full p-2 group-hover:bg-transparent">
                          <Download className="h-4 w-4 text-[#E88019] group-hover:text-white" />
                        </div>
                        <span className="text-amber-500 group-hover:text-white">
                          Download
                        </span>
                      </Button>
                      <Button
                        variant={"ghost"}
                        className="group flex items-center gap-2 cursor-pointe hover:bg-red-500 cursor-pointer hover:text-white "
                        onClick={() => ConfirmDelete(item)}
                      >
                        <div className="bg-[#EE030312] rounded-full p-2 group-hover:bg-transparent ">
                          <Trash2 className="h-4 w-4 text-red-500 group-hover:text-white " />
                        </div>
                        <span className="text-red-500  group-hover:text-white">
                          Delete
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center mt-4">
              <div>
                <Button
                  variant="default"
                  onClick={handelSubmitVerification}
                  disabled={!customer.transaction_refrence_number}
                  className="w-full md:w-auto"
                >
                  Submit Verification
                </Button>
                {!customer.transaction_refrence_number && (
                  <p className="mt-2 text-sm text-red-600">
                    You must complete the payment first.
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : media.length > 0 && status != 0 ? (
          <StatusBadge status={status} />
        ) : (
          <div className="mt-6 space-y-4 w-full h-full flex items-center justify-center">
            <Image
              src={NoMediaImage}
              width={200}
              height={200}
              alt="NoMediaImage"
            />
          </div>
        )}
      </div>

      {/* File Preview Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {selectedMedia.document_name}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedMedia(null)}
              >
                Close
              </Button>
            </div>
            <div className="flex justify-center">
              {selectedMedia.file_type.startsWith("image/") ? (
                <img
                  src={selectedMedia.file_path || "/placeholder.svg"}
                  alt={selectedMedia.document_name}
                  className="max-h-[70vh] object-contain"
                />
              ) : selectedMedia.file_type === "application/pdf" ? (
                <iframe
                  src={selectedMedia.file_path}
                  title={selectedMedia.document_name}
                  className="w-full h-[70vh]"
                ></iframe>
              ) : (
                <div className="p-8 text-center">
                  <p>Preview not available for this file type.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => handleDownloadClick(selectedMedia)}
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
};

export default UploadedMedia;
