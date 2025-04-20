"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { useState, useTransition } from "react";
import Input from "@/components/form/input";
import { FaLock } from "react-icons/fa";
import { Key } from "lucide-react";
import { createRoleCreateSchema } from "@/app/[locale]/(dashboard)/schema/role";
import { createRoles } from "@/app/[locale]/(dashboard)/actions/roles";
import PageTitle from "@/components/ui/pageTitle";
import CustomCheckbox from "@/components/form/checkbox";
import InputCollectionLabel from "@/components/form/inputCollectionLabel";
import NextBreadcrumb from "@/components/layout/breadCrumb";
import { IResponseUsersPermissions } from "@/entities/dashboard";
import { useWatch, Control } from "react-hook-form";
import { Button } from "@/components/ui/button";

type RoleCreateFormValues = z.infer<ReturnType<typeof createRoleCreateSchema>>;

const permissionsList = {
  Customers: [
    "Customers list",
    "Customers Add",
    "Customers Edit",
    "Customers Delete",
  ],
  Employee: [
    "Employee list",
    "Employee Add",
    "Employee Edit",
    "Employee Delete",
  ],
  Roles: ["Roles Add", "Roles Edit", "Roles Delete"],
  Services: ["Services Add", "Services Edit", "Services Delete"],
  Settings: ["Website Settings", "File Manager"],
};

export default function RoleCreateForm({
  permissionsList,
}: {
  permissionsList: Record<string, IResponseUsersPermissions[]>;
}) {
  const t = useTranslations("forms");

  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const rolesSchema = createRoleCreateSchema(t);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RoleCreateFormValues>({
    resolver: zodResolver(rolesSchema),
    defaultValues: {
      name: "",
      code: "",
      permissions: [0],
    },
  });

  const onSubmit = (data: RoleCreateFormValues) => {
    console.log(":data", data);

    startTransition(async () => {
      const response = await createRoles(data);
      if (response.error) setErrorMessage(response.error);
      else setErrorMessage(null);
    });
  };
  console.log("errors", errors);

  return (
    <>
      <PageTitle title={"dashboard.roles.CreateRole"} description="" />
      <NextBreadcrumb
        homeElement="Home"
        separator={<span className="mx-2 text-gray-400">{">"}</span>}
        activeClasses="text-primary font-semibold"
        containerClasses="flex items-center text-sm text-gray-600 px-4 rounded-md"
        listClasses="hover:underline transition-colors duration-200"
        capitalizeLinks
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            label={{ id: "name.label" }}
            name="name"
            register={register}
            error={errors.name?.message}
            placeholder={{ id: "name.placeholder" }}
            startIcon={<Key size={18} />}
          />
          <Input
            label={{ id: "code.label" }}
            name="code"
            register={register}
            error={errors.code?.message}
            placeholder={{ id: "code.placeholder" }}
            startIcon={<FaLock size={18} />}
          />
        </div>
        <div className="mt-8">
          <InputCollectionLabel
            title={"dashboard.roles.roleInformation"}
            className="mb-6"
          />{" "}
          <div className="mb-4">
            <CustomCheckbox
              name="all_permissions"
              label="Select All Permissions"
              control={control}
            />
          </div>
          <hr />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
            {Object.entries(permissionsList).map(
              ([section, permissions], parentIndex) => (
                <div key={section}>
                  <h4 className="text-md font-semibold text-green-800 mb-2">
                    {section}
                  </h4>
                  <CustomCheckbox
                    name={`all_${section.toLowerCase()}`}
                    label={`All ${section} Permissions`}
                    control={control}
                  />
                  <div className="pl-4 mt-2 space-y-1">
                    {permissions.map((perm, index) => (
                      <CustomCheckbox
                        key={`${perm}${parentIndex}${index}`}
                        name={`permissions.${perm}${parentIndex}${index}}`}
                        label={perm.name}
                        control={control}
                      />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <Button
          type="submit"
          className="w-full px-4 py-3 bg-green-700 text-white font-semibold rounded-2xl hover:bg-green-800 transition"
        >
          {isPending ? t("loading") : t("submitRole")}
        </Button>
      </form>
    </>
  );
}
