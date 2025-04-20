import React, { useState, useTransition } from "react";
import {
  CustomerSubmitReviewRequest,
  IResponseCustomer,
} from "@/entities/dashboard";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal/modal";
import { useForm } from "react-hook-form";
import { submitReviewAction } from "@/app/[locale]/(dashboard)/actions";
import { toast } from "sonner";
import StatusBadge from "../../statusBadg";
import Input from "@/components/form/input";
import { IconBrandGmail } from "@tabler/icons-react";
import { User2Icon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface IProps {
  customer: IResponseCustomer;
}

const Portal = ({ customer }: IProps) => {
  const { status, id } = customer;
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState<number | boolean>(false);
  const schema = z.object({
    customerId: z.number(),
    fta_password: z.string().nonempty("FTA password is required"),
    fta_user_name: z.string().nonempty("FTA username is required"),
    gmail_password: z.string().nonempty("Gmail password is required"),
    gmail_user_name: z
      .string()
      .email("Invalid email address")
      .nonempty("Gmail username is required"),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CustomerSubmitReviewRequest>({
    resolver: zodResolver(schema),
    defaultValues: {
      customerId: id,
      fta_password: "",
      fta_user_name: "",
      gmail_password: "",
      gmail_user_name: "",
    },
  });

  if (status === 2) return <StatusBadge status={status} />;

  const onSubmit = (data: CustomerSubmitReviewRequest) => {
    startTransition(async () => {
      const response = await submitReviewAction(data);

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
              name="fta_user_name"
              error={errors?.fta_user_name?.message}
              register={register}
              placeholder={{ id: "email.placeholder" }}
            />
            <Input
              className="text-sm py-1 px-2"
              label={{ id: "password.label" }}
              i18nNamespace="dashboard.customers.portal"
              name="fta_password"
              showLabel
              error={errors?.fta_password?.message}
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
              name="gmail_user_name"
              showLabel
              error={errors?.gmail_user_name?.message}
              register={register}
              placeholder={{ id: "emailAddress.placeholder" }}
            />

            <Input
              className="text-sm py-1 px-2"
              label={{ id: "emailPassword.label" }}
              i18nNamespace="dashboard.customers.portal"
              name="gmail_password"
              showLabel
              error={errors?.gmail_password?.message}
              register={register}
              placeholder={{ id: "emailPassword.placeholder" }}
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

export default Portal;
