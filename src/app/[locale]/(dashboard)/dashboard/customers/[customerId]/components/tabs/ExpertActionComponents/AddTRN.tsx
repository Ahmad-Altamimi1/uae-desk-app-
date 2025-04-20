import React, { useState, useTransition } from "react";
import { addTaxIdRequest, IResponseCustomer } from "@/entities/dashboard";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal/modal";
import { useForm } from "react-hook-form";
import { addTaxIdAction } from "@/app/[locale]/(dashboard)/actions";
import { toast } from "sonner";
import StatusBadge from "../../statusBadg";
import Input from "@/components/form/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomCheckbox from "@/components/form/checkbox";

interface IProps {
  customer: IResponseCustomer;
}

const AddTRN = ({ customer }: IProps) => {
  const { status, id } = customer;
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState<number | boolean>(false);
  const validation = z.object({
    tax_id: z.string().min(1, "Tax ID is required"),
    send_email: z.boolean(),
    customerId: z.number(),
  });
  const { handleSubmit, register, reset, control } = useForm<addTaxIdRequest>({
    defaultValues: {
      send_email: false,
      tax_id: "",
      customerId: id,
    },
    resolver: zodResolver(validation),
  });

  if (status === 2) return <StatusBadge status={status} />;

  const onSubmit = (data: addTaxIdRequest) => {
    console.log("data", data);

    startTransition(async () => {
      const response = await addTaxIdAction(data);

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
              name="tax_id"
              i18nNamespace="dashboard.customers.TRN"
              register={register}
              placeholder={{ id: "tax.placeholder" }}
            />
            {/* Checkboxes */}
            <div className="flex items-center gap-2">
              <CustomCheckbox
                name={"send_email"}
                label={"Send Email Notification"}
                control={control}
              />
            </div>
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

export default AddTRN;
