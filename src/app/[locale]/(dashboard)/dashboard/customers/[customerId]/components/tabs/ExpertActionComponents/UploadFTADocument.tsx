import React, { useState, useTransition } from "react";
import { IResponseCustomer, storeFtaMediaRequest } from "@/entities/dashboard";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal/modal";
import { useForm } from "react-hook-form";
import { storeFtaMediaAction } from "@/app/[locale]/(dashboard)/actions";
import { toast } from "sonner";
import StatusBadge from "../../statusBadg";
import Input from "@/components/form/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomCheckbox from "@/components/form/checkbox";

interface IProps {
  customer: IResponseCustomer;
}

const UploadFTADocument = ({ customer }: IProps) => {
  const { status, id } = customer;
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState<number | boolean>(false);
  const schema = z
    .object({
      document_name: z.string().min(1, "Document name is required"),
      start_date: z.string().min(1, "Start date is required"),
      expire_date: z.string().min(1, "Expiration date is required"),
      fta_document: z.any().optional(),
      send_email: z.boolean().optional(),
      send_invoice: z.boolean().optional(),
    })
    .refine((data) => new Date(data.start_date) <= new Date(data.expire_date), {
      message: "Start date cannot be later than expiration date",
      path: ["start_date"],
    });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm<storeFtaMediaRequest>({
    defaultValues: {
      customerId: id,
      document_name: "",
      start_date: "",
      fta_document: "",
      expire_date: "",
      send_email: false,
      send_invoice: false,
    },
    resolver: zodResolver(schema),
  });
  console.log("errors", errors);

  if (status === 2) return <StatusBadge status={status} />;

  const onSubmit = (data: storeFtaMediaRequest) => {
    const formData = new FormData();
    formData.append("customerId", id.toString());
    formData.append("document_name", data.document_name);
    formData.append("start_date", data.start_date);
    formData.append("expire_date", data.expire_date);
    formData.append("fta_document", data.fta_document);
    formData.append("send_email", data.send_email.toString());
    formData.append("send_invoice", data.send_invoice.toString());

    startTransition(async () => {
      const response = await storeFtaMediaAction(formData);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response?.error || "Something went wrong");
      }

      setOpen(false);

      reset();
    });
  };

  return (
    <>
      <Modal
        open={!!open}
        setOpen={setOpen}
        title="dashboard.customers.uploadFTA.title"
        description="dashboard.customers.uploadFTA.description"
        triggerButton={<Button>Upload FTA document</Button>}
        size="md"
      >
        <form className="space-y-4 px-1" onSubmit={handleSubmit(onSubmit)}>
          <hr className="my-2" />

          <div className="grid grid-cols-2 gap-4">
            {/* Document Name */}
            <div className="flex flex-col gap-1 ">
              <Input
                className=" py-1 px-2"
                i18nNamespace="dashboard.customers.Request_for_Documents"
                label={{ id: "documentName.label" }}
                showLabel
                error={errors.document_name?.message}
                name="document_name"
                register={register}
                placeholder={{ id: "documentName.placeholder" }}
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <Input
                className=" py-1 px-2"
                type="file"
                i18nNamespace="dashboard.customers.uploadFTA"
                name="fta_document"
                showLabel
                // register={register}
                onChange={(e) => {
                  setValue(
                    "fta_document",
                    e?.target?.files[0] as unknown as File
                  );
                }}
                error={errors.fta_document?.message}
                label={{ id: "documentFile.label" }}
              />
            </div>
            {/* Start Date */}
            <div className="flex flex-col gap-1 ">
              <Input
                className=" py-1 px-2"
                type="date"
                name="start_date"
                showLabel
                register={register}
                i18nNamespace="dashboard.customers.Request_for_Documents"
                placeholder={{ id: "startDate.placeholder" }}
                label={{ id: "startDate.label" }}
                error={errors.start_date?.message}
              />
            </div>

            {/* Expiration Date */}
            <div className="flex flex-col gap-1 ">
              <Input
                className=" py-1 px-2"
                type="date"
                i18nNamespace="dashboard.customers.Request_for_Documents"
                showLabel
                name="expire_date"
                register={register}
                placeholder={{ id: "expiry_date.placeholder" }}
                label={{ id: "expiry_date.label" }}
                error={errors.expire_date?.message}
              />
            </div>

            {/* File Upload */}
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-1 gap-2  mt-2">
            <div className="flex items-center gap-2">
              <CustomCheckbox
                name={"send_email"}
                label={"Send Email Notification"}
                control={control}
              />
            </div>

            <div className="flex items-center gap-2">
              <CustomCheckbox
                name={"send_invoice"}
                label={"Email Invoice"}
                control={control}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-4 px-3 py-1.5 text-sm bg-primary text-white hover:bg-primary/90 transition-colors duration-300 ease-in-out rounded-xl"
          >
            {isPending ? <span>loading</span> : <span>submit</span>}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default UploadFTADocument;
