"use client";
import Input from "@/components/form/input";
import { Textarea } from "@/components/form/textarea";
import { FaFileAlt } from "react-icons/fa";
import { useFormContext } from "react-hook-form";

const AuditedFinancialStatementDetails = () => {
  const { register, formState } = useFormContext();

  return (
    <fieldset className="space-y-4 mb-4">
      <div className="text-lg font-medium text-gray-900 flex items-center gap-2 border-b-2 border-green-600 pb-1">
        <FaFileAlt /> Audited Financial Statement Details
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={{ id: "financial_statement_year.label" }}
          showLabel
          name="financial_statement_year"
          register={register}
          error={formState.errors.financial_statement_year?.message}
          i18nNamespace="dashboard.customers.Services.FinancialStatement"
          placeholder={{ id: "financial_statement_year.placeholder" }}
        />
        <Input
          label={{ id: "financial_statement_issuer.label" }}
          showLabel
          name="financial_statement_issuer"
          register={register}
          error={formState.errors.financial_statement_issuer?.message}
          i18nNamespace="dashboard.customers.Services.FinancialStatement"
          placeholder={{ id: "financial_statement_issuer.placeholder" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          label={{ id: "financial_statement_issue_date.label" }}
          showLabel
          name="financial_statement_issue_date"
          register={register}
          error={formState.errors.financial_statement_issue_date?.message}
          i18nNamespace="dashboard.customers.Services.FinancialStatement"
        />
        <Input
          type="date"
          label={{ id: "financial_statement_expiry_date.label" }}
          showLabel
          name="financial_statement_expiry_date"
          register={register}
          error={formState.errors.financial_statement_expiry_date?.message}
          i18nNamespace="dashboard.customers.Services.FinancialStatement"
        />
      </div>

      <Textarea
        label={{ id: "financial_statement_details.label" }}
        register={register}
        error={formState.errors.financial_statement_details?.message}
        showLabel
        name="financial_statement_details"
        i18nNamespace="dashboard.customers.Services.FinancialStatement"
        placeholder={{ id: "financial_statement_details.placeholder" }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={{ id: "auditor_name.label" }}
          showLabel
          name="auditor_name"
          register={register}
          error={formState.errors.auditor_name?.message}
          i18nNamespace="dashboard.customers.Services.FinancialStatement"
          placeholder={{ id: "auditor_name.placeholder" }}
        />
        <Input
          label={{ id: "auditor_license_number.label" }}
          showLabel
          name="auditor_license_number"
          register={register}
          error={formState.errors.auditor_license_number?.message}
          i18nNamespace="dashboard.customers.Services.FinancialStatement"
          placeholder={{ id: "auditor_license_number.placeholder" }}
        />
      </div>
    </fieldset>
  );
};

export default AuditedFinancialStatementDetails;
