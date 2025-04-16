import React, { FC } from "react";
import Passport from "./servicesForms/Passport";
import { api } from "@/lib/api/serverCore";
import { ICustomerData } from "@/entities/dashboard";
import EmiratesId from "./servicesForms/emiratesId";

interface CustomerViewProps {
  params: Promise<{ customerId: string }>;
}
const CreateServices: FC<CustomerViewProps> = async ({ params }) => {
  const data = await api.get<ICustomerData>([
    "groupedMedia",
    (await params).customerId,
  ]);
  console.log("datadatadatadatadatadatadatadatadatadatadatadatadata", data);

  return (
    <div className="grid grid-cols-2">
      <div className="services">
        {/* <Passport /> */}
        <EmiratesId />
      </div>
      <iframe
        src={`https://docs.google.com/gview?url=${`https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`}&embedded=true`}
        style={{ height: "600px" }}
      />
    </div>
  );
};

export default CreateServices;
