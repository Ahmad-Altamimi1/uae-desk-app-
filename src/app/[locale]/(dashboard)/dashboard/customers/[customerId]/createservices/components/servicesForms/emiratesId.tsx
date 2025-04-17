"use client";
import { useFormContext } from "react-hook-form";
import Input from "@/components/form/input";

const EmiratesId = () => {
  const { register, formState } = useFormContext();

  return (
    <div className="space-y-4">
      <legend className="text-lg font-bold border-b-2 border-green-600 pb-2">
        <i className="fas fa-id-card"></i> Emirates ID Section
      </legend>

      <div className="grid grid-cols-2 gap-4">
        <Input
          register={register}
          error={formState.errors.emirates_id_number?.message}
          label={{ id: "emirates_id_number.label" }}
          showLabel
          name="emirates_id_number"
          i18nNamespace="dashboard.customers.Services.EmiratesId"
          placeholder={{ id: "emirates_id_number.placeholder" }}
        />
        <Input
          type="date"
          register={register}
          error={formState.errors.emirates_id_expiry?.message}
          label={{ id: "emirates_id_expiry.label" }}
          showLabel
          name="emirates_id_expiry"
          i18nNamespace="dashboard.customers.Services.EmiratesId"
          placeholder={{ id: "emirates_id_expiry.placeholder" }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          register={register}
          error={formState.errors.emirates_id_first_name?.message}
          label={{ id: "emirates_id_first_name.label" }}
          showLabel
          name="emirates_id_first_name"
          i18nNamespace="dashboard.customers.Services.EmiratesId"
          placeholder={{ id: "emirates_id_first_name.placeholder" }}
        />
        <Input
          register={register}
          error={formState.errors.emirates_id_last_name?.message}
          label={{ id: "emirates_id_last_name.label" }}
          showLabel
          name="emirates_id_last_name"
          i18nNamespace="dashboard.customers.Services.EmiratesId"
          placeholder={{ id: "emirates_id_last_name.placeholder" }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="date"
          register={register}
          error={formState.errors.emirates_id_dob?.message}
          label={{ id: "emirates_id_dob.label" }}
          showLabel
          name="emirates_id_dob"
          i18nNamespace="dashboard.customers.Services.EmiratesId"
          placeholder={{ id: "emirates_id_dob.placeholder" }}
        />
        <Input
          register={register}
          error={formState.errors.emirates_id_nationality?.message}
          label={{ id: "emirates_id_nationality.label" }}
          showLabel
          name="emirates_id_nationality"
          i18nNamespace="dashboard.customers.Services.EmiratesId"
          placeholder={{ id: "emirates_id_nationality.placeholder" }}
        />
      </div>
    </div>
  );
};

export default EmiratesId;
