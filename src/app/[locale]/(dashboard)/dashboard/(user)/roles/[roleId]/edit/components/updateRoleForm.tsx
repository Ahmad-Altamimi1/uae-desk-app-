"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { FC, useTransition } from "react";
import { User } from "lucide-react";

import InputCollectionLabel from "@/components/form/inputCollectionLabel";
import Input from "@/components/form/input";
import PageTitle from "@/components/ui/pageTitle";

import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { createRoleCreateSchema } from "@/app/[locale]/(dashboard)/schema/role";
import { IGetRole } from "@/entities/dashboard/roles";
import { Button } from "@/components/ui/button";
import { updateCustomer } from "@/app/[locale]/(dashboard)/actions";
interface UpdateRoleFormProps {
  //   serviceOptions: ISelectOption[];
  //   branchOptions: ISelectOption[];
  data: IGetRole["data"];
}

export const UpdateRoleForm: FC<UpdateRoleFormProps> = ({
  //   branchOptions,
  //   serviceOptions,
  data,
}) => {
  const role = data.role;
  const t = useTranslations("forms");
  const roleTranslate = useTranslations("dashboard.roles");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const validation = createRoleCreateSchema(t);
  type UpdateRoleFormValues = z.infer<typeof validation>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    control,
    watch,
  } = useForm<UpdateRoleFormValues>({
    resolver: zodResolver(validation),
    defaultValues: {
      //   id: role.id,
      name: role.name,
      code: role.code,

      //   entries: [],
    },
  });

  // const {
  //   fields: entriesFields,
  //   append: appendEntry,
  //   remove: removeEntry,
  // } = useFieldArray({
  //   control,
  //   name: "entries",
  // });

  const onSubmit = async (data: UpdateRoleFormValues) => {
    startTransition(async () => {
      try {
        const result = await updateCustomer(data as UpdateRoleFormValues);
        if (result.success) {
          toast.success(roleTranslate("updateSuccess"));

          router.back();
        } else {
          toast.error(result.error?.toString());

          if (result.data && typeof result.data === "object") {
            Object.entries(result.data).forEach(([key, value]) => {
              if (Array.isArray(value) && value.length > 0) {
                setError(key as keyof UpdateRoleFormValues, {
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
    <>
      <PageTitle
        title={"dashboard.customers.updateCustomer"}
        description="dashboard.customers.updateCustomerDes"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="content space-y-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div id="leftSide">
            <InputCollectionLabel
              title={"dashboard.customers.CustomerInformation"}
              className="mb-6"
            />
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={{ id: "name.label" }}
                i18nNamespace="forms"
                name="name"
                register={register}
                disabled={isPending}
                error={errors.name?.message}
                placeholder={{ id: "name.placeholder" }}
                startIcon={<User size={18} />}
              />
              <Input
                label={{ id: "code.label" }}
                name="code"
                register={register}
                disabled={isPending}
                error={errors.code?.message}
                placeholder={{ id: "code.placeholder" }}
                startIcon={<User size={18} />}
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors duration-300 ease-in-out rounded-2xl"
        >
          {isPending ? t("submitting") : t("submit")}
        </Button>
      </form>
    </>
  );
};
