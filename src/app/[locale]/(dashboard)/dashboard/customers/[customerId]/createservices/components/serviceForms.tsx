"use client";
import React, { useTransition } from "react";
import { GroupedMediaRequest } from "@/entities/dashboard";
import { documentComponentsMap } from "./documentComponentsMap";
import { DocumentType } from "@/types/enums";
import { FormProvider, useForm } from "react-hook-form";
import { serviceFormsFieldName } from "./servicesForms/serviceFormsFieldsName";
import { toast } from "sonner";
import { z } from "zod";
import { saveDocumentDetailsAction } from "@/app/[locale]/(dashboard)/actions";
import { Button } from "@/components/ui/button";
import Input from "@/components/form/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
// here we will have tow service same name  TODO
const ServiceForms = ({
  groupedMediaArray,
  servicesDetails,
}: {
  groupedMediaArray: [string, GroupedMediaRequest[]][];
  servicesDetails: typeof serviceFormsFieldName;
}) => {
  const { customerId } = useParams();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const schema = z.object({
    ...Object.fromEntries(
      Object.keys(serviceFormsFieldName).map((key) => [
        key,
        z.string().optional(),
      ])
    ),
    profile_name_en: z
      .string()
      .min(1, { message: "profile name(en) is required" }),
    profile_name_ar: z
      .string()
      .min(1, { message: "profile name(ar) is required" }),
    preferred_language: z
      .string()
      .min(1, { message: "preferred language is required" }),
    communication_channel: z
      .string()
      .min(1, { message: "communication channel is required" }),
  });

  const { register, handleSubmit, reset, formState, ...rest } = useForm({
    resolver: zodResolver(schema),
    defaultValues: servicesDetails,
  });
  console.log("servicesDetails", servicesDetails);

  const onSubmit = (data: typeof serviceFormsFieldName) => {
    startTransition(async () => {
      const response = await saveDocumentDetailsAction(
        data,
        Number(customerId)
      );

      if (response.success) {
        toast.success(response.message);
      }
      if (response.error) {
        toast.error(response?.error);
      }
      // reset();
      router.push(`dashboard/customers/${id}`);
    });
    // router.push("services");
  };

  return (
    <FormProvider {...{ register, handleSubmit, reset, formState, ...rest }}>
      <form className="services space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              label={{ id: "profile_name_en.label" }}
              showLabel
              register={register}
              error={formState.errors.profile_name_en?.message}
              name="profile_name_en"
              i18nNamespace="dashboard.customers.createServices.headerInputs"
              placeholder={{ id: "profile_name_en.placeholder" }}
            />
          </div>
          <div>
            <Input
              label={{ id: "profile_name_ar.label" }}
              showLabel
              register={register}
              name="profile_name_ar"
              error={formState.errors.profile_name_ar?.message}
              i18nNamespace="dashboard.customers.createServices.headerInputs"
              placeholder={{ id: "profile_name_ar.placeholder" }}
            />
          </div>
          <div>
            <Input
              label={{ id: "preferred_language.label" }}
              showLabel
              register={register}
              name="preferred_language"
              error={formState.errors.preferred_language?.message}
              i18nNamespace="dashboard.customers.createServices.headerInputs"
              placeholder={{ id: "preferred_language.placeholder" }}
            />
          </div>
          <div>
            <Input
              label={{ id: "communication_channel.label" }}
              showLabel
              register={register}
              name="communication_channel"
              error={formState.errors.communication_channel?.message}
              i18nNamespace="dashboard.customers.createServices.headerInputs"
              placeholder={{ id: "communication_channel.placeholder" }}
            />
          </div>
        </div>
        {groupedMediaArray.map(([key, value]) => {
          const Component = documentComponentsMap[key as DocumentType];

          return value.map((_, index) => <Component key={`${key}-${index}`} />);
        })}
        <Button type="submit">{isPending ? "loading..." : "submit"}</Button>
      </form>
    </FormProvider>
  );
};

export default ServiceForms;
