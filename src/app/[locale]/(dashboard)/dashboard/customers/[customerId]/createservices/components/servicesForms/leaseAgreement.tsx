"use client";
import { useFormContext } from "react-hook-form";
import Input from "@/components/form/input";
import { Textarea } from "@/components/form/textarea";
import { FaBuilding } from "react-icons/fa";

const LeaseAgreementDetails = () => {
  const { register, formState } = useFormContext();

  return (
    <fieldset className="space-y-4 mb-4">
      <div className="text-lg font-medium text-gray-900 flex items-center gap-2 border-b-2 border-yellow-500 pb-1">
        <FaBuilding /> Lease Agreement Details
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={{ id: "lease_agreement_number.label" }}
          showLabel
          name="lease_agreement_number"
          i18nNamespace="dashboard.customers.Services.Lease"
          placeholder={{ id: "lease_agreement_number.placeholder" }}
          register={register}
          error={formState.errors.lease_agreement_number?.message}
        />

        <Input
          type="date"
          label={{ id: "lease_expiry_date.label" }}
          showLabel
          name="lease_expiry_date"
          i18nNamespace="dashboard.customers.Services.Lease"
          register={register}
          error={formState.errors.lease_expiry_date?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          label={{ id: "lease_start_date.label" }}
          showLabel
          name="lease_start_date"
          i18nNamespace="dashboard.customers.Services.Lease"
          register={register}
          error={formState.errors.lease_start_date?.message}
        />

        <Input
          label={{ id: "property_address.label" }}
          showLabel
          name="property_address"
          i18nNamespace="dashboard.customers.Services.Lease"
          placeholder={{ id: "property_address.placeholder" }}
          register={register}
          error={formState.errors.property_address?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={{ id: "landlord_name.label" }}
          showLabel
          name="landlord_name"
          i18nNamespace="dashboard.customers.Services.Lease"
          placeholder={{ id: "landlord_name.placeholder" }}
          register={register}
          error={formState.errors.landlord_name?.message}
        />

        <Input
          type="number"
          label={{ id: "monthly_rent.label" }}
          showLabel
          name="monthly_rent"
          i18nNamespace="dashboard.customers.Services.Lease"
          placeholder={{ id: "monthly_rent.placeholder" }}
          register={register}
          error={formState.errors.monthly_rent?.message}
        />
      </div>

      <Textarea
        label={{ id: "lease_purpose.label" }}
        showLabel
        name="lease_purpose"
        i18nNamespace="dashboard.customers.Services.Lease"
        placeholder={{ id: "lease_purpose.placeholder" }}
        register={register}
        error={formState.errors.lease_purpose?.message}
      />
    </fieldset>
  );
};

export default LeaseAgreementDetails;
