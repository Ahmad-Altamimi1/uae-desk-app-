import React, { useState, useTransition } from "react";
import StatusBadge from "../statusBadg";
import { IResponseCustomer, RequestDocument } from "@/entities/dashboard";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Modal } from "@/components/modal/modal";
import { Key, User2Icon } from "lucide-react";
import CustomSelect from "@/components/form/select";
import { documentTypeOptions } from "@/constants/documentTypes";
import { Textarea } from "@/components/form/textarea";
import { useForm } from "react-hook-form";
import { RequestDocumentAction } from "@/app/[locale]/(dashboard)/actions";
import { toast } from "sonner";
import Input from "@/components/form/input";
import { IconBrandGmail } from "@tabler/icons-react";

interface IProps {
  customer: IResponseCustomer;
}

const ExpertActions = ({ customer }: IProps) => {
  const { status, id } = customer;

  const [isPending, startTransition] = useTransition();

  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [openUploadTRN, setOpenUploadTRN] = useState(false);
  const [openUploadPortal, setOpenUploadPortl] = useState(false);

  const { handleSubmit, control, register, reset } = useForm<RequestDocument>({
    defaultValues: {
      document_details: "",
      document_type: documentTypeOptions[0],
    },
  });

  if (status === 2) return <StatusBadge status={status} />;

  const onSubmit = (data: RequestDocument) => {
    startTransition(async () => {
      const response = await RequestDocumentAction(data, Number(id));

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response?.error || "Something went wrong");
      }

      setOpenRequestModal(false);
      setOpenUploadModal(false);
      setOpenUploadTRN(false);

      reset();
    });
  };

  return (
    <>
      <Link href={`/dashboard/customers/${customer.id}/createservices`}>
        <Button>Create Service</Button>
      </Link>

      {/* Request for Document Modal */}
      <Modal
        open={openRequestModal}
        setOpen={setOpenRequestModal}
        title="dashboard.customers.Request_for_Documents.title"
        description="dashboard.customers.Request_for_Documents.description"
        triggerButton={<Button>Request for Document</Button>}
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <hr className="my-2" />
          <div className="grid grid-cols-1 gap-5">
            <CustomSelect
              options={documentTypeOptions}
              placeholder={{ id: "document_type.label" }}
              i18nNamespace="dashboard.customers.createServices"
              label={{ id: "document_type.label" }}
              control={control}
              startIcon={<Key size={18} />}
              name="document_type"
            />
            <Textarea
              name="document_details"
              register={register}
              i18nNamespace="dashboard.customers.createServices"
              disabled={isPending}
              placeholder="document_details.placeholder"
              label="document_details.label"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors duration-300 ease-in-out rounded-2xl"
          >
            {isPending ? "loading" : "submit"}
          </button>
        </form>
      </Modal>

      {/* Upload FTA Document Modal */}
      <Modal
        open={openUploadModal}
        setOpen={setOpenUploadModal}
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
                name="document_file"
                showLabel
                register={register}
                placeholder={{ id: "documentFile.placeholder" }}
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
              />
            </div>

            {/* Expiration Date */}
            <div className="flex flex-col gap-1 ">
              <Input
                className=" py-1 px-2"
                type="date"
                i18nNamespace="dashboard.customers.Request_for_Documents"
                showLabel
                name="expiry_date"
                register={register}
                placeholder={{ id: "expiry_date.placeholder" }}
                label={{ id: "expiry_date.label" }}
              />
            </div>

            {/* File Upload */}
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-1 gap-2  mt-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="send_email" name="send_email" />
              <label htmlFor="send_email">Send Email Notification</label>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="email_invoice" name="email_invoice" />
              <label htmlFor="email_invoice">Email Invoice</label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 px-3 py-1.5 text-sm bg-primary text-white hover:bg-primary/90 transition-colors duration-300 ease-in-out rounded-xl"
          >
            {isPending ? <span>loading</span> : <span>submit</span>}
          </button>
        </form>
      </Modal>

      {/* Upload TRN Modal */}

      <Modal
        open={openUploadTRN}
        setOpen={setOpenUploadTRN}
        title="dashboard.customers.TRN.title"
        description="dashboard.customers.TRN.description"
        triggerButton={<Button>Add TRN</Button>}
        size="default"
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <hr className="my-2" />
          <div className="grid grid-cols-1 gap-5">
            <label htmlFor=""> Tax Return Number</label>
            <Input
              className="text-sm py-1 px-2"
              label={{ id: "tax.label" }}
              name="document_name"
              i18nNamespace="dashboard.customers.TRN"
              register={register}
              placeholder={{ id: "tax.placeholder" }}
            />
            {/* Checkboxes */}
            <div className="flex items-center gap-2">
              <input type="checkbox" id="send_email" name="send_email" />
              <label htmlFor="send_email">Send Email Notification</label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors duration-300 ease-in-out rounded-2xl"
          >
            {isPending ? "loading" : "submit"}
          </button>
        </form>
      </Modal>

      {/* portal email address */}

      <Modal
        open={openUploadPortal}
        setOpen={setOpenUploadPortl}
        title="dashboard.customers.portal.title"
        description="dashboard.customers.portal.description"
        triggerButton={<Button>portal email</Button>}
        size="default"
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <hr className="my-2" />
          <div className="grid grid-cols-1 gap-5">
            <label htmlFor="" className="flex items-center text-blue-800 gap-2">
              <User2Icon className="w-5 h-5" />
              <strong>Portal Email Address</strong>
            </label>
            <Input
              className="text-sm py-1 px-2"
              label={{ id: "email.label" }}
              showLabel
              i18nNamespace="dashboard.customers.portal"
              name="email"
              register={register}
              placeholder={{ id: "email.placeholder" }}
            />
            <Input
              className="text-sm py-1 px-2"
              label={{ id: "password.label" }}
              i18nNamespace="dashboard.customers.portal"
              name="password"
              showLabel
              register={register}
              placeholder={{ id: "password.placeholder" }}
            />

            <label
              htmlFor=""
              className="flex items-center text-green-700 gap-2"
            >
              <IconBrandGmail className="w-5 h-5" />
              <strong>Gmail Account Details</strong>
            </label>

            <Input
              className="text-sm py-1 px-2"
              label={{ id: "emailAddress.label" }}
              i18nNamespace="dashboard.customers.portal"
              name="emailAddress"
              showLabel
              register={register}
              placeholder={{ id: "emailAddress.placeholder" }}
            />

            <Input
              className="text-sm py-1 px-2"
              label={{ id: "emailPassword.label" }}
              i18nNamespace="dashboard.customers.portal"
              name="emailPassword"
              showLabel
              register={register}
              placeholder={{ id: "emailPassword.placeholder" }}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors duration-300 ease-in-out rounded-2xl"
          >
            {isPending ? "loading" : "submit"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ExpertActions;
