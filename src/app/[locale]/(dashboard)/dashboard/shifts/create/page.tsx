"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";
import Input from "@/components/form/input";
import Checkbox from "@/components/form/checkbox"; 
import { Clock, Key } from "lucide-react";
import { useTransition, useState } from "react";
import { shiftsSchema } from "../../../schema/shifts";
import {  createShifts } from "@/app/[locale]/(dashboard)/actions/shifts"; 

type ShiftCreateFormValues = z.infer<ReturnType<typeof shiftsSchema>>;

export default function ShiftsCreateForm() {
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<any>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ShiftCreateFormValues>({
    resolver: zodResolver(shiftsSchema(t)),
    defaultValues: {
      name: "",
      start_time: "",
      end_time: "",
      is_active: true,
    },
  });

  const onSubmit = (data: ShiftCreateFormValues) => {
    startTransition(async () => {
      const res = await createShifts(data); 
      setResponse(res);
      if (res?.error) {
        console.error("Error:", res.error);
      } else {
        console.log("Success:", res);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  <hr className="my-2" />
  
  <div className="grid grid-cols-1 gap-5">
    <Input
      label={{ id: "name.label" }}
      name="name"
      register={register}
      error={errors.name?.message}
      placeholder={{ id: "name.placeholder" }}
      startIcon={<Key size={18} />}
    />

    <Input
      label={{ id: "startTime.label" }}
      name="start_time"
      register={register}
      error={errors.start_time?.message}
      placeholder={{ id: "startTime.placeholder" }}
      startIcon={<Clock size={18} />}
      />

    <Input
      label={{ id: "endTime.label" }}
      name="end_time"
      register={register}
      error={errors.end_time?.message}
      placeholder={{ id: "endTime.placeholder" }}
      startIcon={<Clock size={18} />}
      />
  </div>

  {response?.error && (
    <p className="text-red-500 text-sm">{response.error}</p>
  )}

  <button
    type="submit"
    className="w-full px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors duration-300 ease-in-out rounded-2xl"
  >
    {isPending ? <span>{t("loading")}</span> : <span>{t("submit")}</span>}
  </button>
</form>

  );
}
