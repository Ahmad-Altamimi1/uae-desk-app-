"use client";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import Input from "@/components/form/input";
import { GitBranch, Globe2, Mail, MapPin, Phone } from "lucide-react";
import { useState, useTransition } from "react";
import { branchesSchema } from "@/app/[locale]/(dashboard)/schema/branches";
import { createBranches } from "@/app/[locale]/(dashboard)/actions/branches";
import { toast } from "sonner";
import ToolBarModal from "@/components/table/toolBarModal";
import CustomSelect from "@/components/form/select";
import { ISelectOption } from "@/utils/type";
import { zodResolver } from "@hookform/resolvers/zod";

interface BranchesCreateFormProps {
  locations: ISelectOption[];
}

type BranchCreateFormValues = z.infer<ReturnType<typeof branchesSchema>>;

export default function BranchesCreateForm({
  locations,
}: BranchesCreateFormProps) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const branchSchema = branchesSchema(t);

  const {
    register,
    handleSubmit,
    control,
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

  const onSubmit = async (data: BranchCreateFormValues) => {
    if (!open) return null;
    startTransition(async () => {
      response = await createBranches(data);

      if (response.success) {
        toast.success(response.message);
      }
      if (response.error) {
        toast(response?.error);
      }

      setOpen(false);
    });
  };

  return (
    <ToolBarModal
      title="dashboard.branches.title"
      description="dashboard.branches.description"
      image="/customer.png"
      addButton={{
        title: "dashboard.branches.Add",
      }}
      open={open}
      setOpen={setOpen}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <hr />
        <div className="grid grid-cols-1 gap-5">
          <Input
            label={{ id: "name.label" }}
            name="branch_name"
            register={register}
            error={errors.branch_name?.message}
            placeholder={{ id: "name.placeholder" }}
            startIcon={<GitBranch size={18} />}
          />

          {/* // select of location */}

          <CustomSelect
            label={{ id: "locationId.label" }}
            name="location_id"
            control={control}
            error={errors.location_id?.message}
            placeholder={{ id: "locationId.placeholder" }}
            startIcon={<MapPin size={18} />}
            options={locations}
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

        <button
          type="submit"
          // disabled={isValid }
          className="w-full px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors duration-300 ease-in-out rounded-2xl"
        >
          {isPending ? <span>{t("loading")}</span> : <span>{t("submit")}</span>}
        </button>
      </form>
    </ToolBarModal>
  );
}
