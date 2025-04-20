import React, { useState, useTransition } from "react";
import StatusBadge from "../statusBadg";
import { IResponseCustomer, RequestDocument } from "@/entities/dashboard";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Modal } from "@/components/modal/modal";
import { CheckCheck, Key, User, User2Icon } from "lucide-react";
import CustomSelect from "@/components/form/select";
import { documentTypeOptions } from "@/constants/documentTypes";
import { Textarea } from "@/components/form/textarea";
import { useForm } from "react-hook-form";
import { RequestDocumentAction } from "@/app/[locale]/(dashboard)/actions";
import { toast } from "sonner";
import Input from "@/components/form/input";
import { Checkbox } from "@radix-ui/react-checkbox";
import CustomCheckbox from "@/components/form/checkbox";
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
        title="dashboard.customers.createServices.Request_for_Document"
        description="dashboard.customers.createServices.Request_for_Document_Desc"
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
              disabled={isPending}
              placeholder="dashboard.customers.createServices.document_details.placeholder"
              label="dashboard.customers.createServices.document_details.label"
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
        title="dashboard.customers.createServices.Request_for_Document"
        description="dashboard.customers.createServices.Request_for_Document_Desc"
        triggerButton={<Button>Upload FTA document</Button>}
        size="md"
      >
        <form className="space-y-4 px-1" onSubmit={handleSubmit(onSubmit)}>
          <hr className="my-2" />

          <div className="grid grid-cols-2 gap-4">
            {/* Document Name */}
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="document_name">Document Name</label>
              <Input
                className="text-sm py-1 px-2"
                label={{ id: "document_name.label" }}
                name="document_name"
                register={register}
                placeholder={{ id: "document_name.placeholder" }}
              />
            </div>

            {/* Start Date */}
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="start_date">Start Date</label>
              <Input
                className="text-sm py-1 px-2"
                type="date"
                name="start_date"
                register={register}
                placeholder={{ id: "start_date.placeholder" }}
                label={{ id: "start_date.label" }}
              />
            </div>

            {/* Expiration Date */}
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="expiry_date">Expiration Date</label>
              <Input
                className="text-sm py-1 px-2"
                type="date"
                name="expiry_date"
                register={register}
                placeholder={{ id: "expiry_date.placeholder" }}
                label={{ id: "expiry_date.label" }}
              />
            </div>

            {/* File Upload */}
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="document_file">Upload File</label>
              <Input
                className="text-sm py-1 px-2"
                type="file"
                name="document_file"
                register={register}
                placeholder={{ id: "document_file.placeholder" }}
                label={{ id: "document_file.label" }}
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-1 gap-2 text-sm mt-2">
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
        title="dashboard.customers.createServices.Request_for_Document"
        description="dashboard.customers.createServices.Request_for_Document_Desc"
        triggerButton={<Button>Add TRN</Button>}
        size="default"
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <hr className="my-2" />
          <div className="grid grid-cols-1 gap-5">
            <label htmlFor=""> Tax Return Number</label>
            <Input
              className="text-sm py-1 px-2"
              label={{ id: "document_name.label" }}
              name="document_name"
              register={register}
              placeholder={{ id: "document_name.placeholder" }}
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
        title="dashboard.customers.createServices.Request_for_Document"
        description="dashboard.customers.createServices.Request_for_Document_Desc"
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
            <label htmlFor=""> Portal Email / Username</label>
            <Input
              className="text-sm py-1 px-2"
              label={{ id: "document_name.label" }}
              name="document_name"
              register={register}
              placeholder={{ id: "document_name.placeholder" }}
            />
            <label htmlFor=""> Portal Password</label>
            <Input
              className="text-sm py-1 px-2"
              label={{ id: "document_name.label" }}
              name="document_name"
              register={register}
              placeholder={{ id: "document_name.placeholder" }}
            />

            <label htmlFor="" className="flex items-center text-green-700 gap-2">
              <IconBrandGmail className="w-5 h-5" />
              <strong>Gmail Account Details</strong>
            </label>


            {/* <label htmlFor=""> <strong> Gmail Account Details</strong></label> */}
            <label htmlFor=""> Email Adress</label>
            <Input
              className="text-sm py-1 px-2"
              label={{ id: "document_name.label" }}
              name="document_name"
              register={register}
              placeholder={{ id: "document_name.placeholder" }}
            />

            <label htmlFor=""> Email Password</label>
            <Input
              className="text-sm py-1 px-2"
              label={{ id: "document_name.label" }}
              name="document_name"
              register={register}
              placeholder={{ id: "document_name.placeholder" }}
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
