"use client";
import { useFormContext } from "react-hook-form";
import Input from "@/components/form/input";
import { Textarea } from "@/components/form/textarea";
// import Textarea from "@/components/form/textarea";
import { FaFileSignature } from "react-icons/fa";

const PowerOfAttorney = () => {
  const { register, formState } = useFormContext();

  return (
    <fieldset className="space-y-4 mb-4">
      <div className="text-lg font-medium text-gray-900 flex items-center gap-2 border-b-2 border-cyan-600 pb-1">
        <FaFileSignature /> Power of Attorney Details
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={{ id: "poa_number.label" }}
          showLabel
          name="poa_number"
          i18nNamespace="dashboard.customers.Services.PowerOfAttorney"
          placeholder={{ id: "poa_number.placeholder" }}
          register={register}
          error={formState.errors.poa_number?.message}
        />

        <Input
          type="date"
          label={{ id: "poa_expiry.label" }}
          showLabel
          name="poa_expiry"
          i18nNamespace="dashboard.customers.Services.PowerOfAttorney"
          placeholder={{ id: "poa_expiry.placeholder" }}
          register={register}
          error={formState.errors.poa_expiry?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          label={{ id: "poa_issuance_date.label" }}
          showLabel
          name="poa_issuance_date"
          i18nNamespace="dashboard.customers.Services.PowerOfAttorney"
          placeholder={{ id: "poa_issuance_date.placeholder" }}
          register={register}
          error={formState.errors.poa_issuance_date?.message}
        />

        <Input
          label={{ id: "poa_holder_name.label" }}
          showLabel
          name="poa_holder_name"
          i18nNamespace="dashboard.customers.Services.PowerOfAttorney"
          placeholder={{ id: "poa_holder_name.placeholder" }}
          register={register}
          error={formState.errors.poa_holder_name?.message}
        />
      </div>

      <div>
        <Textarea
          label={{ id: "poa_purpose.label" }}
          showLabel
          name="poa_purpose"
          i18nNamespace="dashboard.customers.Services.PowerOfAttorney"
          placeholder={{ id: "poa_purpose.placeholder" }}
          register={register}
          error={formState.errors.poa_purpose?.message}
        />
      </div>
    </fieldset>
  );
};

export default PowerOfAttorney;
