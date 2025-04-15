"use client";
import React, { useState } from "react";
import CustomSelect from "@/components/form/select";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { handleFileUpload } from "@/app/[locale]/(dashboard)/actions";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { DropMediaModal } from "./modalDrobFile";
import { Modal } from "@/components/modal/modal";
import { documentTypeOptions } from "@/constants/documentTypes";
export type FileData = {
  file: File;
  previewUrl: string;
  documentType?: string;
  addedDate: Date;
};
interface IProps {
  customerId: number;
}
const UploadMediaFromModal = ({ customerId }: IProps) => {
  const [filesData, setFilesData] = useState<FileData[]>([]);
  const [documentType, setDocumentType] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const t = useTranslations();
  const route = useRouter();
  const newCustomerId = customerId;
  return (
    <Modal
      title={"dashboard.customers.UploadNewMedia"}
      description={"dashboard.customers.UploadNewMediaDescription"}
      open={isOpenModal}
      setOpen={setIsOpenModal}
      triggerButton={
        <Button
          className="bg-primary px-6 py-3 text-base flex items-center gap-2 cursor-pointer"
          type={"button"}
        >
          <Image src="/plus.png" alt="Logo" width={24} height={24} />
          <span className="hidden lg:inline">
            {t("dashboard.customers.UploadNewMedia")}
          </span>
        </Button>
      }
    >
      <CustomSelect
        options={documentTypeOptions}
        placeholder={{ id: "Select_Document_Type" }}
        onChange={(value) => setDocumentType(value)}
      />
      <DropMediaModal setFilesData={setFilesData} />
      <Button
        className="bg-primary px-6 py-3 text-base flex items-center gap-2 cursor-pointer 
           text-white
        "
        type={"submit"}
        disabled={filesData.length === 0 || documentType === ""}
        onClick={async () => {
          setIsSubmitting(true);
          try {
            await handleFileUpload(
              newCustomerId,
              documentType,
              filesData.map((file) => file.file)
            );
            toast.success(t("dashboard.customers.UploadMediaSuccess"));
            setIsOpenModal(false);
          } catch (err) {
            toast.error(err.message);
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
            <span>Loading...</span>
          </div>
        ) : (
          <Image src="/plus.png" alt="Logo" width={24} height={24} />
        )}
        <span className="hidden lg:inline">
          {!isSubmitting && t("dashboard.customers.UploadNewMedia")}
        </span>
      </Button>
    </Modal>
  );
};

export default UploadMediaFromModal;
