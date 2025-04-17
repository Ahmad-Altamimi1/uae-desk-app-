import React, { FC } from "react";
import { api } from "@/lib/api/serverCore";
import { GroupedMediaResponse } from "@/entities/dashboard";
import PdfViewer from "./components/pdfViewer";
import ServiceForms from "./components/serviceForms";
import { serviceFormsFieldName } from "./components/servicesForms/serviceFormsFieldsName";

interface CustomerViewProps {
  params: Promise<{ customerId: string }>;
}
const CreateServices: FC<CustomerViewProps> = async ({ params }) => {
  const data = await api.get<GroupedMediaResponse>([
    "groupedMedia",
    (await params).customerId,
  ]);
  const servicesDetails = await api.get<{
    servicesDetails: typeof serviceFormsFieldName;
  }>(["servicesDetails", (await params).customerId]);
  const groupedMediaArray = Object.entries(data.groupedMedia);

  return (
    <div className="grid grid-cols-2">
      <ServiceForms
        groupedMediaArray={groupedMediaArray}
        servicesDetails={servicesDetails.servicesDetails}
      />
      <div className="flex flex-col overflow-hidden">
        {groupedMediaArray.map(([key, value]) => (
          <PdfViewer key={key} data={value} />
        ))}
      </div>
    </div>
  );
};

export default CreateServices;
