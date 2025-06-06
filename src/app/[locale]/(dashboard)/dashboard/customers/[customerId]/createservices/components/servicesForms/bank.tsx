"use client";
import Input from "@/components/form/input";
import { Textarea } from "@/components/form/textarea";
import { FaUniversity } from "react-icons/fa";
import { useFormContext } from "react-hook-form";

const BankStatementDetails = () => {
  const { register, formState } = useFormContext();

  return (
    <fieldset className="space-y-4 mb-4">
      <div className="text-lg font-medium text-gray-900 flex items-center gap-2 border-b-2 border-cyan-600 pb-1">
        <FaUniversity /> Bank Statement Details
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={{ id: "bank_name.label" }}
          showLabel
          register={register}
          error={formState.errors.bank_name?.message}
          name="bank_name"
          i18nNamespace="dashboard.customers.Services.BankStatement"
          placeholder={{ id: "bank_name.placeholder" }}
        />

        <Input
          label={{ id: "account_number.label" }}
          showLabel
          register={register}
          error={formState.errors.account_number?.message}
          name="account_number"
          i18nNamespace="dashboard.customers.Services.BankStatement"
          placeholder={{ id: "account_number.placeholder" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          label={{ id: "statement_period_start.label" }}
          showLabel
          register={register}
          error={formState.errors.statement_period_start?.message}
          name="statement_period_start"
          i18nNamespace="dashboard.customers.Services.BankStatement"
          placeholder={{ id: "statement_period_start.placeholder" }}
        />

        <Input
          type="date"
          label={{ id: "statement_period_end.label" }}
          showLabel
          register={register}
          error={formState.errors.statement_period_end?.message}
          name="statement_period_end"
          i18nNamespace="dashboard.customers.Services.BankStatement"
          placeholder={{ id: "statement_period_end.placeholder" }}
        />
      </div>

      <Textarea
        label={"statement_summary.label"}
        showLabel
        register={register}
        error={formState.errors.statement_summary?.message}
        name="statement_summary"
        i18nNamespace="dashboard.customers.Services.BankStatement"
        placeholder={"statement_summary.placeholder"}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={{ id: "available_balance.label" }}
          showLabel
          register={register}
          error={formState.errors.available_balance?.message}
          name="available_balance"
          i18nNamespace="dashboard.customers.Services.BankStatement"
          placeholder={{ id: "available_balance.placeholder" }}
        />

        <Input
          label={{ id: "currency.label" }}
          showLabel
          register={register}
          error={formState.errors.currency?.message}
          name="currency"
          i18nNamespace="dashboard.customers.Services.BankStatement"
          placeholder={{ id: "currency.placeholder" }}
        />
      </div>
    </fieldset>
  );
};

export default BankStatementDetails;
