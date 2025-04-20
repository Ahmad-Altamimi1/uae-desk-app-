import React, { useState, useTransition } from "react";
import { IResponseCustomer, RequestDocument } from "@/entities/dashboard";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal/modal";
import { documentTypeOptions } from "@/constants/documentTypes";
import { useForm } from "react-hook-form";
import { RequestDocumentAction } from "@/app/[locale]/(dashboard)/actions";
import { toast } from "sonner";
import StatusBadge from "../../statusBadg";
import CustomSelect from "@/components/form/select";
import { Textarea } from "@/components/form/textarea";
import { Key } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DocumentType } from "@/types/enums";

interface IProps {
  customer: IResponseCustomer;
}

const RequestForDocument = ({ customer }: IProps) => {
  const { status, id } = customer;
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState<number | boolean>(false);
  const validation = z.object({
    document_details: z.string().min(1, "Document details are required"),
    document_type: z.nativeEnum(DocumentType, {
      message: "Document type is required",
    }),
  });
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<RequestDocument>({
    defaultValues: {
      document_details: "",
      document_type: documentTypeOptions[0].value,
    },
    resolver: zodResolver(validation),
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

      setOpen(false);

      reset();
    });
  };

  return (
    <>
      <Modal
        open={!!open}
        setOpen={setOpen}
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
              error={errors.document_type?.message}
              startIcon={<Key size={18} />}
              name="document_type"
            />
            <Textarea
              name="document_details"
              register={register}
              i18nNamespace="dashboard.customers.createServices"
              disabled={isPending}
              error={errors.document_details?.message}
              placeholder="document_details.placeholder"
              label="document_details.label"
            />
          </div>
          <Button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors duration-300 ease-in-out rounded-2xl"
          >
            {isPending ? "loading" : "submit"}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default RequestForDocument;
