"use client";
import PageTitle from "@/components/ui/pageTitle";
import React, { useState } from "react";
import { MyDropzone } from "../../components/UploadFile";
import CustomSelect from "@/components/form/select";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { handleFileUpload } from "@/app/[locale]/(dashboard)/actions";
import { toast } from "sonner";
export type FileData = {
  file: File;
  previewUrl: string;
  documentType?: string;
  addedDate: Date;
};
interface IProps {
  params: Promise<{ newCustomerId: string }>;
}
const UploadFiles = ({ params }: IProps) => {
  const [filesData, setFilesData] = useState<FileData[]>([]);
  const [documentType, setDocumentType] = useState<string>("");
  const t = useTranslations();
  const newCustomerId = params.then((res) => res.newCustomerId);
  return (
    <>
      <PageTitle
        title={"dashboard.customers.CreateCustomer"}
        description="dashboard.customers.CreateCustomerDes"
      />
      <CustomSelect
        options={[
          {
            label: "Option 1",
            value: "option1",
          },
        ]}
        placeholder={{ id: "Select_Document_Type" }}
        onChange={(value) => setDocumentType(value)}
      />
      <MyDropzone filesData={filesData} setFilesData={setFilesData} />
      <Button
        className="bg-[#00713B] px-6 py-3 text-base flex items-center gap-2 cursor-pointer 
        w-full md:w-[50%] lg:w-[40%] text-white
        "
        type={"submit"}
        onClick={() =>
          handleFileUpload(
            newCustomerId,
            documentType,
            filesData.map((file) => file.file)
          )
            .then((res) => toast.success(res.message))
            .catch((err) => toast.error(err.message))
        }
      >
        <Image src="/plus.png" alt="Logo" width={24} height={24} />
        <span className="hidden lg:inline">
          {t("dashboard.customers.CreateCustomer")}
        </span>
      </Button>
    </>
  );
};

export default UploadFiles;
