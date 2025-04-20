"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { Dispatch, FC, SetStateAction, useState, useTransition } from "react";

import Input from "@/components/form/input";
import { toast } from "sonner";
import { IServicesData } from "@/entities/dashboard";
import { serviceSchema } from "@/app/[locale]/(dashboard)/schema/services";
import { updateService } from "@/app/[locale]/(dashboard)/actions/services";

interface UpdateServiceFormProps {
  service: IServicesData;
  setOpen?: Dispatch<SetStateAction<boolean | number>>;
}

export const UpdateServiceForm: FC<UpdateServiceFormProps> = ({
  service,
  setOpen,
}) => {
  const t = useTranslations("forms");
  const translationForValidation = useTranslations("");
  const serviceTranslate = useTranslations("dashboard.services");
  const [isPending, startTransition] = useTransition();
  const [] = useState(true);

  const validation = serviceSchema(translationForValidation);
  type UpdateServiceFormValues = z.infer<typeof validation>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UpdateServiceFormValues>({
    resolver: zodResolver(validation),
    defaultValues: {
      id: service?.id,
      name: service?.name,
    },
  });

  const onSubmit = async (data: UpdateServiceFormValues) => {
    startTransition(async () => {
      try {
        const result = await updateService(data as UpdateServiceFormValues);
        if (result.success) {
          toast.success(serviceTranslate("updateSuccess"));

          setOpen?.(false);
        } else {
          toast.error(result.error?.toString());

          if (result.data && typeof result.data === "object") {
            Object.entries(result.data).forEach(([key, value]) => {
              if (Array.isArray(value) && value.length > 0) {
                setError(key as keyof UpdateServiceFormValues, {
                  type: "server",
                  message: value[0],
                });
              }
            });
          }
        }
      } catch (error) {
        console.log("error", error);

        toast.error(
          error instanceof Error ? error.message : t("errors.unknown")
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-4 grid grid-cols-1 md:grid-cols-1 gap-4">
        <Input
          label={{ id: "name.label" }}
          name="name"
          register={register}
          disabled={isPending}
          error={errors.name?.message}
          placeholder={{ id: "name.placeholder" }}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors duration-300 ease-in-out rounded-2xl"
      >
        {isPending ? t("submitting") : t("submit")}
      </button>
    </form>
  );
};
