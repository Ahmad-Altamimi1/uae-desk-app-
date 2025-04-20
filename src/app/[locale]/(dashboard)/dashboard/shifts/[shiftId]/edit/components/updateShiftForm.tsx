"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { Dispatch, FC, SetStateAction, useTransition } from "react";

import Input from "@/components/form/input";
import { toast } from "sonner";

import { IShiftsData } from "@/entities/dashboard/shifts";
import { shiftsSchema } from "@/app/[locale]/(dashboard)/schema/shifts";
import { updateShift } from "@/app/[locale]/(dashboard)/actions/shifts";
import { Button } from "@/components/ui/button";

interface UpdateShiftFormProps {
  shift: IShiftsData;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean | number>>;
}

export const UpdateShiftForm: FC<UpdateShiftFormProps> = ({
  shift,
  setOpen,
}) => {
  const t = useTranslations("forms");
  const translationForValidation = useTranslations("");
  const shiftTranslate = useTranslations("dashboard.shifts");
  const [isPending, startTransition] = useTransition();
  const validation = shiftsSchema(translationForValidation);
  type UpdateShiftFormValues = z.infer<typeof validation>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UpdateShiftFormValues>({
    resolver: zodResolver(validation),
    defaultValues: {
      id: shift?.id,
      name: shift?.name,
      start_time: shift?.start_time,
      end_time: shift?.end_time,
    },
  });

  const onSubmit = async (data: UpdateShiftFormValues) => {
    startTransition(async () => {
      try {
        const result = await updateShift(data as UpdateShiftFormValues);
        if (result.success) {
          toast.success(shiftTranslate("updateSuccess"));

          setOpen?.(false);
        } else {
          toast.error(result.error?.toString());

          if (result.data && typeof result.data === "object") {
            Object.entries(result.data).forEach(([key, value]) => {
              if (Array.isArray(value) && value.length > 0) {
                setError(key as keyof UpdateShiftFormValues, {
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

        <Input
          label={{ id: "start_time.label" }}
          name="start_time"
          register={register}
          disabled={isPending}
          type="time"
          error={errors.start_time?.message}
          placeholder={{ id: "start_time.placeholder" }}
        />

        <Input
          label={{ id: "end_time.label" }}
          name="end_time"
          register={register}
          type="time"
          disabled={isPending}
          error={errors.end_time?.message}
          placeholder={{ id: "end_time.placeholder" }}
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors duration-300 ease-in-out rounded-2xl"
      >
        {isPending ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
};
