"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";
import Input from "@/components/form/input";
import { Key } from "lucide-react";
import { useState, useTransition } from "react";
import { serviceSchema } from "@/app/[locale]/(dashboard)/schema/services";
import { createServices } from "@/app/[locale]/(dashboard)/actions/services";
import ToolBarModal from "@/components/table/toolBarModal";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type ServiceCreateFormValues = z.infer<ReturnType<typeof serviceSchema>>;

export default function ServiceCreateForm() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const servicesSchema = serviceSchema(t);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ServiceCreateFormValues>({
    resolver: zodResolver(servicesSchema),
    defaultValues: {
      name: "",
    },
  });
  let response;
  const onSubmit = (data: ServiceCreateFormValues) => {
    startTransition(async () => {
      response = await createServices(data);
      if (response.success) {
        toast.success(response.message);
      }
      if (response.error) {
        toast(response?.error);
      }
      reset();
      router.refresh();
      setOpen(false);
    });
    // router.push("services");
  };

  return (
    <ToolBarModal
      title="dashboard.services.title"
      description="dashboard.services.description"
      image="/customer.png"
      addButton={{
        title: "dashboard.services.Add",
      }}
      open={open}
      setOpen={setOpen}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <hr />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-2">
            <Input
              label={{ id: "name.label" }}
              name="name"
              register={register}
              error={errors.name?.message}
              placeholder={{ id: "name.placeholder" }}
              startIcon={<Key size={18} />}
            />
          </div>
        </div>
        <Button
          type="submit"
          disabled={isPending || !isValid}
          className="w-full px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors duration-300 ease-in-out rounded-2xl"
        >
          {isPending ? (
            <span> {t("loading")}</span>
          ) : (
            <span>{t("submit")}</span>
          )}
        </Button>
      </form>
    </ToolBarModal>
  );
}
