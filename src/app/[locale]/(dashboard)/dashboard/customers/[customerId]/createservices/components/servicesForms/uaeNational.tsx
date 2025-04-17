"use client";
import { useFormContext } from "react-hook-form";
import Input from "@/components/form/input";
import { FaIdCard } from "react-icons/fa";

const UAENationalID = () => {
  const { register, formState } = useFormContext();

  return (
    <fieldset className="space-y-4 mb-4">
      <div className="text-lg font-medium text-gray-900 flex items-center gap-2 border-b-2 border-green-600 pb-1">
        <FaIdCard /> UAE National ID Details
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          register={register}
          error={formState.errors.uae_national_id_number?.message}
          label={{ id: "uae_national_id_number.label" }}
          showLabel
          name="uae_national_id_number"
          i18nNamespace="dashboard.customers.Services.UAENationalID"
          placeholder={{ id: "uae_national_id_number.placeholder" }}
        />

        <Input
          type="date"
          register={register}
          error={formState.errors.uae_national_id_expiry?.message}
          label={{ id: "uae_national_id_expiry.label" }}
          showLabel
          name="uae_national_id_expiry"
          i18nNamespace="dashboard.customers.Services.UAENationalID"
          placeholder={{ id: "uae_national_id_expiry.placeholder" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          register={register}
          error={formState.errors.uae_national_id_issuance?.message}
          label={{ id: "uae_national_id_issuance.label" }}
          showLabel
          name="uae_national_id_issuance"
          i18nNamespace="dashboard.customers.Services.UAENationalID"
          placeholder={{ id: "uae_national_id_issuance.placeholder" }}
        />

        <Input
          register={register}
          error={formState.errors.uae_national_id_holder_name?.message}
          label={{ id: "uae_national_id_holder_name.label" }}
          showLabel
          name="uae_national_id_holder_name"
          i18nNamespace="dashboard.customers.Services.UAENationalID"
          placeholder={{ id: "uae_national_id_holder_name.placeholder" }}
        />
      </div>
    </fieldset>
  );
};

export default UAENationalID;
