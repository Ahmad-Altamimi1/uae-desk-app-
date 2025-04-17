"use client";
import { useFormContext } from "react-hook-form";
import Input from "@/components/form/input";
import { FaPassport } from "react-icons/fa6";

const Passport = () => {
  const { register, formState } = useFormContext();

  return (
    <fieldset className="space-y-4">
      <div className="text-lg font-medium text-gray-900 flex items-center">
        <FaPassport /> Passport Details
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label={{ id: "passport_number.label" }}
          showLabel
          name="passport_number"
          i18nNamespace="dashboard.customers.Services.Passport"
          placeholder={{ id: "passport_number.placeholder" }}
          register={register}
          error={formState.errors.passport_number?.message}
        />
        <Input
          type="date"
          showLabel
          i18nNamespace="dashboard.customers.Services.Passport"
          label={{ id: "passport_expiry.label" }}
          name="passport_expiry"
          placeholder={{ id: "passport_expiry.placeholder" }}
          register={register}
          error={formState.errors.passport_expiry?.message}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label={{ id: "passport_issuing_country.label" }}
          showLabel
          name="passport_issuing_country"
          i18nNamespace="dashboard.customers.Services.Passport"
          placeholder={{ id: "passport_issuing_country.placeholder" }}
          register={register}
          error={formState.errors.passport_issuing_country?.message}
        />

        <Input
          label={{ id: "passport_holder_name.label" }}
          name="passport_holder_name"
          showLabel
          i18nNamespace="dashboard.customers.Services.Passport"
          placeholder={{ id: "passport_holder_name.placeholder" }}
          register={register}
          error={formState.errors.passport_holder_name?.message}
        />
      </div>
    </fieldset>
  );
};

export default Passport;
