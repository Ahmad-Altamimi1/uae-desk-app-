"use client";
import { useFormContext } from "react-hook-form";
import Input from "@/components/form/input";
import { FaShieldAlt } from "react-icons/fa";
import { Textarea } from "@/components/form/textarea";

const TrademarkCertificateDetails = () => {
  const { register, formState } = useFormContext();

  return (
    <fieldset className="space-y-4 mb-4">
      <div className="text-lg font-medium text-gray-900 flex items-center gap-2 border-b-2 border-cyan-600 pb-1">
        <FaShieldAlt /> Trademark Certificate Details
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={{ id: "trademark_certificate_number.label" }}
          showLabel
          name="trademark_certificate_number"
          i18nNamespace="dashboard.customers.Services.Trademark"
          placeholder={{ id: "trademark_certificate_number.placeholder" }}
          register={register}
          error={formState.errors.trademark_certificate_number?.message}
        />

        <Input
          type="date"
          label={{ id: "trademark_expiry_date.label" }}
          showLabel
          name="trademark_expiry_date"
          i18nNamespace="dashboard.customers.Services.Trademark"
          register={register}
          error={formState.errors.trademark_expiry_date?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          label={{ id: "trademark_registration_date.label" }}
          showLabel
          name="trademark_registration_date"
          i18nNamespace="dashboard.customers.Services.Trademark"
          register={register}
          error={formState.errors.trademark_registration_date?.message}
        />

        <Input
          label={{ id: "trademark_authority_name.label" }}
          showLabel
          name="trademark_authority_name"
          i18nNamespace="dashboard.customers.Services.Trademark"
          placeholder={{ id: "trademark_authority_name.placeholder" }}
          register={register}
          error={formState.errors.trademark_authority_name?.message}
        />
      </div>

      <Textarea
        label={{ id: "trademark_description.label" }}
        showLabel
        name="trademark_description"
        i18nNamespace="dashboard.customers.Services.Trademark"
        placeholder={{ id: "trademark_description.placeholder" }}
        register={register}
        error={formState.errors.trademark_description?.message}
      />

      <Input
        label={{ id: "trademark_classification.label" }}
        showLabel
        name="trademark_classification"
        i18nNamespace="dashboard.customers.Services.Trademark"
        placeholder={{ id: "trademark_classification.placeholder" }}
        register={register}
        error={formState.errors.trademark_classification?.message}
      />
    </fieldset>
  );
};

export default TrademarkCertificateDetails;
