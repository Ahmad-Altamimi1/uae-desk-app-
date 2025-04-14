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
import { useRouter } from "@/i18n/navigation";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations();
  const route = useRouter();
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
            route.push(`/dashboard/customers`);
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
            {/* <span>Loading...</span> */}
          </div>
        ) : (
          <Image src="/plus.png" alt="Logo" width={24} height={24} />
        )}
        <span className="hidden lg:inline">
          {isSubmitting
            ? t("Submitting")
            : t("dashboard.customers.CreateCustomer")}
        </span>
      </Button>
    </>
  );
};

export default UploadFiles;
