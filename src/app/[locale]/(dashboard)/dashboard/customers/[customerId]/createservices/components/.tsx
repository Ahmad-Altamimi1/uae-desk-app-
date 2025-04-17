import React from "react";
import Input from "@/components/form/input";

const R = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Input
          label={{ id: "profile_name_en.label" }}
          showLabel
          name="profile_name_en"
          i18nNamespace="dashboard.customers.createServices.headerInputs.profile_name_en"
          placeholder={{ id: "profile_name_en.placeholder" }}
        />
      </div>
      <div>
        <Input
          label={{ id: "profile_name_ar.label" }}
          showLabel
          name="profile_name_ar"
          i18nNamespace="dashboard.customers.createServices.headerInputs.profile_name_ar"
          placeholder={{ id: "profile_name_ar.placeholder" }}
        />
      </div>
      <div>
        <Input
          label={{ id: "preferred_language.label" }}
          showLabel
          name="preferred_language"
          i18nNamespace="dashboard.customers.createServices.headerInputs.preferred_language"
          placeholder={{ id: "preferred_language.placeholder" }}
        />
      </div>
      <div>
        <Input
          label={{ id: "communication_channel.label" }}
          showLabel
          name="communication_channel"
          i18nNamespace="dashboard.customers.createServices.headerInputs.communication_channel"
          placeholder={{ id: "communication_channel.placeholder" }}
        />
      </div>
    </div>
  );
};

export default R;
