"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";
import Input from "@/components/form/input";
import { Key } from "lucide-react";
import { useTransition } from "react";
import { permissionSchema } from "@/app/[locale]/(dashboard)/schema/permission";
import { createPermission } from "@/app/[locale]/(dashboard)/actions/permissions";

type PermissionCreateFormValues = z.infer<ReturnType<typeof permissionSchema>>;

export default function PermissionCreateForm() {
  const t = useTranslations();

  const [isPending, startTransition] = useTransition();
  const permissionsSchema = permissionSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PermissionCreateFormValues>({
    resolver: zodResolver(permissionsSchema),
    defaultValues: {
      name: "",
    },
  });
  let response;
  const onSubmit = (data: PermissionCreateFormValues) => {
    startTransition(async () => {
      response = await (createPermission(data));
      if (response.error) {
        // Toaster(response?.error);

      }
      console.log("responseresponseresponse", response);

    });
    console.log(data);
    // Handle form submission here
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* <InputCollectionLabel title={"dashboard.permissions.title"} /> */}
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
        <p>
          {response?.error}
        </p>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors duration-300 ease-in-out rounded-2xl"
        >
          {isPending ?
            <span> {t("loading")}</span> :
            <span>{t("submit")}</span>
          }
        </button>
      </form>
    </>
  );
}
