"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { Dispatch, FC, SetStateAction, useTransition } from "react";

import Input from "@/components/form/input";
import { toast } from "sonner";
import { updateBranch as UpdateBranch } from "@/app/[locale]/(dashboard)/actions/branches";
import { IBranchesData, ILocation } from "@/entities/dashboard";
import { branchesSchema } from "@/app/[locale]/(dashboard)/schema/branches";
import CustomSelect from "@/components/form/select";
import { GitBranch, Globe2, Mail, MapPin, Phone } from "lucide-react";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";
import { Button } from "@/components/ui/button";

interface UpdateBranchFormProps {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean | number>>;
  branch: IBranchesData | null;
  locations: ILocation[];
}
export const UpdateBranchForm: FC<UpdateBranchFormProps> = ({
  setOpen,
  branch,
  locations,
}) => {
  const t = useTranslations("forms");
  const translationForValidation = useTranslations("");
  const [isPending, startTransition] = useTransition();

  const validation = branchesSchema(translationForValidation);
  type UpdateBranchFormValues = z.infer<typeof validation>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    control,
  } = useForm<UpdateBranchFormValues>({
    resolver: zodResolver(validation),
    defaultValues: {
      id: branch?.id,
      branch_name: branch?.branch_name,
      location_id: branch?.location_id,
      address: branch?.address,
      phone_number: branch?.phone_number,
      latitude: branch?.latitude,
      longitude: branch?.longitude,
      email: branch?.email,
    },
  });

  const locationOptions = mapToSelectOptions(
    locations,
    (e) => e.name,
    (e) => e.id
  );

  const onSubmit = async (data: UpdateBranchFormValues) => {
    console.log("data", data);

    startTransition(async () => {
      try {
        const result = await UpdateBranch(data);
        console.log("result", result);

        if (result.success) {
          // toast.success(branchTranslate("updateSuccess"));
          toast.success(result.message);
          setOpen?.(false);
        } else {
          toast.error(result.error?.toString());
          if (result.data && typeof result.data === "object") {
            Object.entries(result.data).forEach(([key, value]) => {
              if (Array.isArray(value) && value.length > 0) {
                setError(key as keyof UpdateBranchFormValues, {
                  type: "server",
                  message: value[0],
                });
              }
            });
          }
        }
      } catch (error) {
        console.error("error", error);
        toast.error(
          error instanceof Error ? error.message : t("errors.unknown")
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-5">
        <Input
          label={{ id: "name.label" }}
          name="branch_name"
          register={register}
          error={errors.branch_name?.message}
          placeholder={{ id: "name.placeholder" }}
          startIcon={<GitBranch size={18} />}
        />

        <CustomSelect
          label={{ id: "locationId.label" }}
          name="location_id"
          control={control}
          error={errors.location_id?.message}
          placeholder={{ id: "locationId.placeholder" }}
          startIcon={<MapPin size={18} />}
          options={locationOptions}
        />

        <Input
          label={{ id: "address.label" }}
          name="address"
          register={register}
          error={errors.address?.message}
          placeholder={{ id: "address.placeholder" }}
          startIcon={<MapPin size={18} />}
        />

        <Input
          label={{ id: "phoneNumber.label" }}
          name="phone_number"
          register={register}
          error={errors.phone_number?.message}
          placeholder={{ id: "phoneNumber.placeholder" }}
          startIcon={<Phone size={18} />}
        />

        <Input
          label={{ id: "email.label" }}
          name="email"
          register={register}
          error={errors.email?.message}
          placeholder={{ id: "email.placeholder" }}
          startIcon={<Mail size={18} />}
        />

        <Input
          label={{ id: "latitude.label" }}
          name="latitude"
          register={register}
          error={errors.latitude?.message}
          placeholder={{ id: "latitude.placeholder" }}
          startIcon={<Globe2 size={18} />}
        />

        <Input
          label={{ id: "longitude.label" }}
          name="longitude"
          register={register}
          error={errors.longitude?.message}
          placeholder={{ id: "longitude.placeholder" }}
          startIcon={<Globe2 size={18} />}
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
