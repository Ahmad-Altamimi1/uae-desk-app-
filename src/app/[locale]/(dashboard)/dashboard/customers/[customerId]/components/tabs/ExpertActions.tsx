import React from "react";
import StatusBadge from "../statusBadg";
import { IResponseCustomer } from "@/entities/dashboard";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import RequestForDocument from "./ExpertActionComponents/RequestforDocument";
import UploadFTADocument from "./ExpertActionComponents/UploadFTADocument";
import AddTRN from "./ExpertActionComponents/AddTRN";
import Portal from "./ExpertActionComponents/Portal";

interface IProps {
  customer: IResponseCustomer;
}

const ExpertActions = ({ customer }: IProps) => {
  const { status, id } = customer;

  if (status === 2) return <StatusBadge status={status} />;

  return (
    <>
      <Link href={`/dashboard/customers/${id}/createservices`}>
        <Button>Create Service</Button>
      </Link>

      {/* Request for Document Modal */}
      <RequestForDocument customer={customer} />

      {/* Upload FTA Document Modal */}
      <UploadFTADocument customer={customer} />

      {/* Upload TRN Modal */}

      <AddTRN customer={customer} />

      {/* portal email address */}
      <Portal customer={customer} />
    </>
  );
};

export default ExpertActions;
