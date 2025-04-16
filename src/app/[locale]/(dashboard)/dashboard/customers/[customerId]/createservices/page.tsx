import React, { FC } from "react";
import { api } from "@/lib/api/serverCore";
import { GroupedMediaResponse } from "@/entities/dashboard";
import { documentComponentsMap } from "./documentComponentsMap";
import { DocumentType } from "@/types/enums";
interface CustomerViewProps {
  params: Promise<{ customerId: string }>;
}
const CreateServices: FC<CustomerViewProps> = async ({ params }) => {
  const data = await api.get<GroupedMediaResponse>([
    "groupedMedia",
    (await params).customerId,
  ]);
  console.log("Object.entries(data)", Object.entries(data.groupedMedia));

  return (
    <div className="grid grid-cols-2">
      <div className="services space-y-4">
        {Object.entries(data.groupedMedia).map(([key, value]) => {
          const Component = documentComponentsMap[key as DocumentType];

          console.log("ComponentComponentComponent", key);

          return value.map((_, index) => <Component key={`${key}-${index}`} />);
        })}
      </div>
      <iframe
        src={`https://docs.google.com/gview?url=${`https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`}&embedded=true`}
        style={{ height: "600px" }}
      />
    </div>
  );
};

export default CreateServices;
