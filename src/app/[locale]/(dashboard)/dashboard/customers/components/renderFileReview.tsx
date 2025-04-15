import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { FileData } from "../create/[newCustomerId]/page";
import Image from "next/image";
import { Dispatch } from "react";
interface IProps {
  fileData: FileData;
  setSelectedFile: Dispatch<React.SetStateAction<FileData | null>>;
}
export const RenderFilePreview = ({ fileData, setSelectedFile }: IProps) => {
  const { file, previewUrl } = fileData;

  if (file.type.startsWith("image/")) {
    return (
      <div className="relative group">
        <Image
          src={previewUrl || "/placeholder.svg"}
          alt={file.name}
          width={200}
          height={200}
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
