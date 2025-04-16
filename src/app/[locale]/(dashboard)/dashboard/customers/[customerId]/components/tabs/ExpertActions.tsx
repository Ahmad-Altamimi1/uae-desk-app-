import React, { useState, useTransition } from "react";
import StatusBadge from "../statusBadg";
import { IResponseCustomer } from "@/entities/dashboard";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Modal } from "@/components/modal/modal";
import Input from "@/components/form/input";
import { Key } from "lucide-react";
import CustomSelect from "@/components/form/select";
import { ISelectOption } from "@/utils/type";

interface IProps {
  customer: IResponseCustomer;
  serviceOptions: ISelectOption[];
}

const ExpertActions = ({ customer, serviceOptions }: IProps) => {
  const { status } = customer;
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (status === 2) return <StatusBadge status={status} />;

  return (
    <>
      <Link href={`/dashboard/customers/${customer.id}/createservices`}>
        <Button>Create Service</Button>
      </Link>

      <Modal
        open={open}
        setOpen={setOpen}
        title="Request for Service"
        description="Please fill in the details for the service request."
        triggerButton={<Button>Request for Document</Button>}
      >
        <form className="space-y-6">
          <hr className="my-2" />

          <div className="grid grid-cols-1 gap-5">
            <Input
              label={{ id: "document_details.label" }}
              name="document_details"
              placeholder={{ id: "document_details.placeholder" }}
              startIcon={<Key size={18} />}
            />

            <CustomSelect
              name="serviceId"
              disabled={isPending}
              placeholder={{ id: "services" }}
              options={serviceOptions}
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors duration-300 ease-in-out rounded-2xl"
          >
            {isPending ? <span>{"loading"}</span> : <span>{"submit"}</span>}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ExpertActions;
