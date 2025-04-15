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
import { branchesSchema } from "@/app/[locale]/(dashboard)/schema/branches";
import { createBranches } from "@/app/[locale]/(dashboard)/actions/branches";
import { toast } from "sonner";

type BranchCreateFormValues = z.infer<ReturnType<typeof branchesSchema>>;

export default function BranchesCreateForm() {
  const t = useTranslations();

  const [isPending, startTransition] = useTransition();
  const branchSchema = branchesSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BranchCreateFormValues>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      branch_name: "",
      location_id: 0,
      address: "",
      phone_number: "",
      email: "",
      latitude: "",
      longitude: "",
    },
  });
  let response;
  const onSubmit = (data: BranchCreateFormValues) => {
    startTransition(async () => {
      response = await (createBranches(data));
      if (response.error) {
        toast(response?.error);

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
              name="branch_name"
              register={register}
              error={errors.branch_name?.message}
              placeholder={{ id: "name.placeholder" }}
              startIcon={<Key size={18} />}
            />

            <Input
              label={{ id: "location_id.label" }}
              name="location_id"
              type="number"
              register={register}
              error={errors.location_id?.message}
              placeholder={{ id: "location.placeholder" }}
              startIcon={<Key size={18} />}
            />

            <Input
              label={{ id: "address.label" }}
              name="address"
              register={register}
              error={errors.address?.message}
              placeholder={{ id: "address.placeholder" }}
              startIcon={<Key size={18} />}
            />

            <Input
              label={{ id: "phoneNumber.label" }}
              name="phone_number"
              register={register}
              error={errors.phone_number?.message}
              placeholder={{ id: "phoneNumber.placeholder" }}
              startIcon={<Key size={18} />}
            />

            <Input
              label={{ id: "email.label" }}
              name="email"
              register={register}
              error={errors.email?.message}
              placeholder={{ id: "email.placeholder" }}
              startIcon={<Key size={18} />}
            />

            <Input
              label={{ id: "latitude.label" }}
              name="latitude"
              register={register}
              error={errors.latitude?.message}
              placeholder={{ id: "latitude.placeholder" }}
              startIcon={<Key size={18} />}
            />

            <Input
              label={{ id: "longitude.label" }}
              name="longitude"
              register={register}
              error={errors.longitude?.message}
              placeholder={{ id: "longitude.placeholder" }}
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
