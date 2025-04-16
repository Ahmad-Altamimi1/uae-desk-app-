import React from "react";
import StatusBadge from "../statusBadg";
import { IResponseCustomer } from "@/entities/dashboard";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

interface IProps {
  customer: IResponseCustomer;
}
const ExpertActions = ({ customer }: IProps) => {
  const { status } = customer;
  if (status === 2) return <StatusBadge status={status} />;
  return (
    <>
      <Link href={`/dashboard/customers/${customer.id}/createservices`}>
        <Button>Create Service</Button>
      </Link>
      <Button>Request for Document</Button>
    </>
  );
};

export default ExpertActions;
