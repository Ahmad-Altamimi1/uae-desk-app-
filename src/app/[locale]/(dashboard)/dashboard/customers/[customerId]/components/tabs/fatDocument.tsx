"use client";

import type {
  IFtaData,
  IResponseCustomer,
  updateFtaMediaRequest,
} from "@/entities/dashboard";
import { Download, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { updateFtaMediaAction } from "@/app/[locale]/(dashboard)/actions";
import { toast } from "sonner";
import StatusBadge from "../statusBadg";
import { Modal } from "@/components/modal/modal";
import Input from "@/components/form/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define schema for validation
const formSchema = z
  .object({
    id: z.number().min(1, "ID is required"),
    document_name: z.string().min(1, "Document name is required"),
    start_date: z.string().min(1, "Start date is required"),
    expire_date: z.string().min(1, "Expire date is required"),
  })
  .refine((data) => new Date(data.start_date) <= new Date(data.expire_date), {
    message: "Start date cannot be later than expiration date",
    path: ["start_date"],
  });

interface IFatDocProps {
  ftaDocument: IFtaData[];
  customer: IResponseCustomer;
}

const FtaDocument = ({ ftaDocument, customer }: IFatDocProps) => {
  const { status } = customer;

  return (
    <>
      <div>
        {ftaDocument.length > 0 && status == 0 ? (
          <div className="mt-6 space-y-4">
            <p className="font-semibold text-sm text-muted-foreground"></p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ftaDocument.map((item) => (
                <FTAUpdateForm key={item.id} item={item} />
              ))}
            </div>
          </div>
        ) : ftaDocument.length > 0 && status != 0 ? (
          <StatusBadge status={status} />
        ) : (
          <div className="mt-6 space-y-4 w-full h-full flex items-center justify-center">
            <p className="text-muted-foreground">
              No uploaded FTA document found.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

interface FTAUpdateFormProps {
  item: IFtaData;
}
const FTAUpdateForm = ({ item }: FTAUpdateFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState<number | boolean>(false);
  console.log("item", item);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<updateFtaMediaRequest>({
    defaultValues: {
      id: item.id,
      document_name: item.document_name,
      start_date: item.start_date,
      expire_date: item.expire_date,
    },

    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: updateFtaMediaRequest) => {
    console.log("Form Submitted: ", data);

    startTransition(async () => {
      const response = await updateFtaMediaAction(data);
      console.log("response", response);

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response?.error || "Something went wrong");
      }

      setOpen(false);

      reset();
    });
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  return (
    <div
      key={item.id}
      className="border rounded-lg shadow-sm bg-white overflow-hidden p-4 flex flex-col justify-between"
    >
      <div className="flex flex-col items-start gap-2">
        <h3 className="text-lg font-medium truncate border-b border-gray-300 pb-1">
          {item.document_name}
        </h3>
        <div className="text-sm text-muted-foreground">
          <p>
            <strong> Start Date : </strong>
            <span className="">
              {item.start_date ? formatDate(item.start_date) : "-"}
            </span>
          </p>
          <p>
            <strong> Expire Date : </strong>
            <span className="">
              {item.expire_date ? formatDate(item.expire_date) : "-"}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1  xl:grid-cols-3 gap-4 mt-4  ">
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-amber-500 border border-amber-500 hover:bg-[#e88119] hover:text-white rounded-md px-4 py-2"
        >
          <Download className="h-4 w-4" />
          Download
        </Button>

        <Modal
          title="dashboard.customers.editFTA.title"
          triggerButton={
            <Button
              variant="ghost"
              className="flex w-full items-center gap-2 text-green-500 border border-green-500 hover:bg-green-600 hover:text-white rounded-md px-4 py-2"
              onClick={() => setOpen(true)}
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          }
          description="dashboard.customers.editFTA.description"
          open={!!open}
          className="m-0"
          setOpen={setOpen}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <hr />
            <div className="grid grid-cols-1 gap-5">
              <Input
                className=" py-1 px-2"
                i18nNamespace="dashboard.customers.Request_for_Documents"
                label={{ id: "documentName.label" }}
                showLabel
                disabled
                error={errors.document_name?.message}
                name="document_name"
                register={register}
                placeholder={{ id: "documentName.placeholder" }}
              />
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
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors duration-300 ease-in-out rounded-2xl"
            >
              {isPending ? "loading..." : "Submit"}
            </button>
          </form>
        </Modal>

        <Button
          variant="ghost"
          className="flex items-center gap-2 text-red-500 border border-red-500 hover:bg-red-500 hover:text-white rounded-md px-4 py-2"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default FtaDocument;
