import React, { useState, useTransition } from "react";
import StatusBadge from "../statusBadg";
import { IResponseCustomer, RequestDocument } from "@/entities/dashboard";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Modal } from "@/components/modal/modal";
import { Key } from "lucide-react";
import CustomSelect from "@/components/form/select";
import { documentTypeOptions } from "@/constants/documentTypes";
import { Textarea } from "@/components/form/textarea";
import { useForm } from "react-hook-form";
import { RequestDocumentAction } from "@/app/[locale]/(dashboard)/actions";
import { toast } from "sonner";

interface IProps {
  customer: IResponseCustomer;
}

const ExpertActions = ({ customer }: IProps) => {
  const { status, id } = customer;
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { handleSubmit, control, register, reset } = useForm({
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
      }
      if (response.error) {
        toast.error(response?.error);
      }
      setOpen(false);
      reset();
    });
  };
  return (
    <>
      <Link href={`/dashboard/customers/${customer.id}/createservices`}>
        <Button>Create Service</Button>
      </Link>

      <Modal
        open={open}
        setOpen={setOpen}
        title="dashboard.customers.createServices.Request_for_Document"
        description="dashboard.customers.createServices.Request_for_Document_Desc"
        triggerButton={<Button>Request for Document</Button>}
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <hr className="my-2" />

          <div className="grid grid-cols-1 gap-5">
            <CustomSelect
              options={documentTypeOptions}
              placeholder={{
                id: "document_type.label",
              }}
              i18nNamespace="dashboard.customers.createServices"
              label={{
                id: "document_type.label",
              }}
              control={control}
              startIcon={<Key size={18} />}
              name="document_type"
            />

            <Textarea
              name="document_details"
              register={register}
              disabled={isPending}
              placeholder={
                "dashboard.customers.createServices.document_details.placeholder"
              }
              label={
                "dashboard.customers.createServices.document_details.label"
              }
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors duration-300 ease-in-out rounded-2xl"
          >
            {isPending ? <span>{"loading"}</span> : <span>{"submit"}</span>}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ExpertActions;
