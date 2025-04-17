"use client";
import Input from "@/components/form/input";
import { FaFile } from "react-icons/fa6";

const CommercialRegister = () => {
  return (
    <fieldset className="space-y-4">
      <div className="text-lg font-medium text-gray-900 flex items-center gap-2 border-b-2 border-green-600 pb-1">
        <FaFile /> Commercial Register Details
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label={{ id: "commercial_register_number.label" }}
          showLabel
          name="commercial_register_number"
          i18nNamespace="dashboard.customers.Services.CommercialRegister"
          placeholder={{ id: "commercial_register_number.placeholder" }}
        />

        <Input
          type="date"
          label={{ id: "commercial_register_expiry.label" }}
          showLabel
          name="commercial_register_expiry"
          i18nNamespace="dashboard.customers.Services.CommercialRegister"
          placeholder={{ id: "commercial_register_expiry.placeholder" }}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          type="date"
          label={{ id: "commercial_register_issuance_date.label" }}
          showLabel
          name="commercial_register_issuance_date"
          i18nNamespace="dashboard.customers.Services.CommercialRegister"
          placeholder={{ id: "commercial_register_issuance_date.placeholder" }}
        />

        <Input
          label={{ id: "commercial_register_issuing_authority.label" }}
          showLabel
          name="commercial_register_issuing_authority"
          i18nNamespace="dashboard.customers.Services.CommercialRegister"
          placeholder={{
            id: "commercial_register_issuing_authority.placeholder",
          }}
        />
      </div>
    </fieldset>
  );
};

export default CommercialRegister;
