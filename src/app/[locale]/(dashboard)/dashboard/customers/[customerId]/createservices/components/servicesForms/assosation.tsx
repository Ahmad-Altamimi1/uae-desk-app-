"use client";
import Input from "@/components/form/input";
import { Textarea } from "@/components/form/textarea";
import { useFormContext } from "react-hook-form";
import { FaFileContract } from "react-icons/fa";

const MemorandumOfAssociationDetails = () => {
  const { register, formState } = useFormContext();
  return (
    <fieldset className="space-y-4 mb-4">
      <div className="text-lg font-medium text-gray-900 flex items-center gap-2 border-b-2 border-green-600 pb-1">
        <FaFileContract /> Memorandum of Association Details
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={{ id: "memorandum_reference_number.label" }}
          showLabel
          register={register}
          error={formState.errors.memorandum_reference_number?.message}
          name="memorandum_reference_number"
          i18nNamespace="dashboard.customers.Services.Memorandum"
          placeholder={{ id: "memorandum_reference_number.placeholder" }}
        />

        <Input
          type="date"
          label={{ id: "memorandum_issue_date.label" }}
          showLabel
          register={register}
          error={formState.errors.memorandum_issue_date?.message}
          name="memorandum_issue_date"
          i18nNamespace="dashboard.customers.Services.Memorandum"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          label={{ id: "memorandum_expiry_date.label" }}
          showLabel
          register={register}
          error={formState.errors.memorandum_expiry_date?.message}
          name="memorandum_expiry_date"
          i18nNamespace="dashboard.customers.Services.Memorandum"
        />

        <Input
          label={{ id: "memorandum_authority_name.label" }}
          showLabel
          register={register}
          error={formState.errors.memorandum_authority_name?.message}
          name="memorandum_authority_name"
          i18nNamespace="dashboard.customers.Services.Memorandum"
          placeholder={{ id: "memorandum_authority_name.placeholder" }}
        />
      </div>

      <Textarea
        label={{ id: "memorandum_details.label" }}
        showLabel
        register={register}
        name="memorandum_details"
        i18nNamespace="dashboard.customers.Services.Memorandum"
        placeholder={{ id: "memorandum_details.placeholder" }}
      />

      <Textarea
        label={{ id: "memorandum_signatories.label" }}
        showLabel
        register={register}
        name="memorandum_signatories"
        i18nNamespace="dashboard.customers.Services.Memorandum"
        placeholder={{ id: "memorandum_signatories.placeholder" }}
      />
    </fieldset>
  );
};

export default MemorandumOfAssociationDetails;
