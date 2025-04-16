import React from "react";
import StatusBadge from "../statusBadg";
import { IResponseCustomer } from "@/entities/dashboard";
import { Button } from "@/components/ui/button";

interface IProps {
  customer: IResponseCustomer;
}
const ExpertActions = ({ customer }: IProps) => {
  const { status } = customer;
  if (status === 2) return <StatusBadge status={status} />;
  return (
    <>
      <Button>Create Service</Button>
      <Button>Request for Document</Button>
    </>
  );
};

export default ExpertActions;
