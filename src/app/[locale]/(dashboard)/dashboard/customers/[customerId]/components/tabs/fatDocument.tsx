"use client";

import type { IFtaData, IResponseCustomer } from "@/entities/dashboard";
import { Download, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { BASE_URL } from "@/constants";
import { deleteMedia, submitVerification } from "@/app/[locale]/(dashboard)/actions";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/common/ConfirmDeleteDialog";
import { useParams } from "next/navigation";
import StatusBadge from "../statusBadg";
import { Modal } from "@/components/modal/modal";
import Input from "@/components/form/input";
import { useForm } from "react-hook-form"; // For form management
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define schema for validation
const formSchema = z.object({
  document_name: z.string().min(1, "Document name is required"),
  start_date: z.string().min(1, "Start date is required"),
  expire_date: z.string().min(1, "Expire date is required"),
});

interface IFatDocProps {
  ftaDocument: IFtaData[];
  customer: IResponseCustomer;
}

const FtaDocument = ({
  ftaDocument,
  customer,
}: IFatDocProps) => {
  const [selectedMedia, setSelectedMedia] = useState<IFtaData | null>(null);
  const [open, setOpen] = useState(false);
  const { customerId } = useParams();
  const { status } = customer;

  // Form handling with react-hook-form and validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Form Submitted: ", data);
    // You can handle your form submission here
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
    <>
      <div>
        {ftaDocument.length > 0 && status == 0 ? (
          <div className="mt-6 space-y-4">
            <p className="font-semibold text-sm text-muted-foreground"></p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ftaDocument.map((item) => (
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

                  <div className="flex gap-4 mt-4 justify-end flex-wrap">
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 text-amber-500 border border-amber-500 hover:bg-[#e88119] hover:text-white rounded-md px-4 py-2"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>

                    <Modal
                      title="Edit FTA Document"
                      triggerButton={
                        <Button
                          variant="ghost"
                          className="flex items-center gap-2 text-green-500 border border-green-500 hover:bg-green-600 hover:text-white rounded-md px-4 py-2"
                          onClick={() => setOpen(true)}
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </Button>
                      }
                      description="Edit the details of the selected FTA document"
                      open={open}
                      setOpen={setOpen}
                    >
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <hr />
                        <div className="grid grid-cols-1 gap-5">
                          <Input
                            label={{ id: "document_name.label" }}
                            name="document_name"
                            register={register}
                            error={errors.document_name?.message}
                            placeholder="Enter document name"
                          />
                          <Input
                            label={{ id: "start_date.label" }}
                            name="start_date"
                            register={register}
                            error={errors.start_date?.message}
                            placeholder="Enter start date"
                          />
                          <Input
                            label={{ id: "expire_date.label" }}
                            name="expire_date"
                            register={register}
                            error={errors.expire_date?.message}
                            placeholder="Enter expire date"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors duration-300 ease-in-out rounded-2xl"
                        >
                          Submit
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
              ))}
            </div>
          </div>
        ) : ftaDocument.length > 0 && status != 0 ? (
          <StatusBadge status={status} />
        ) : (
          <div className="mt-6 space-y-4 w-full h-full flex items-center justify-center">
            <p className="text-muted-foreground">No uploaded FTA document found.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default FtaDocument;
