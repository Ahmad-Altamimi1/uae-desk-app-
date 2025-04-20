"use client";
import Input from "@/components/form/input";
import InputCollectionLabel from "@/components/form/inputCollectionLabel";
import CustomSelect from "@/components/form/select";
import { VatValue, currency, paymentMethodOptions } from "@/constants";
import { IResponseCustomer } from "@/entities/dashboard";
import { ISelectOption } from "@/utils/type";
import React from "react";
import { useForm } from "react-hook-form";

interface IServicesAndPaymentDetailsProps {
  customer: IResponseCustomer;
  selectedServices: number[];
  serviceOptions: ISelectOption[];
}
const ServicesAndPaymentDetails = ({
  customer,
  selectedServices,
  serviceOptions,
}: IServicesAndPaymentDetailsProps) => {
  const { register } = useForm({
    defaultValues: {
      id: customer.id,
      branchId: customer.branch_id,
      serviceId: selectedServices,
      taxId: customer.tax_id,
      vatValue: customer.vat_value,
      transactionRefrenceNumber: customer.transaction_refrence_number,
      paymentMethod: customer.payment_method,
      branchInput: customer.branch?.branch_name,
      upcoming_payments: customer.upcoming_payments,
    },
  });

  const serviceValues = selectedServices;
  let totalPriceForServices: number = 0;
  let VatForServices: number = 0;

  return (
    <div>
      <InputCollectionLabel
        title={"dashboard.customers.ServicesAndPaymentDetails"}
        className="mb-6"
      />
      <div className="fields border py-4 px-8 rounded-md">
        <div className="content  grid grid-cols-1 md:grid-cols-2 gap-2 ">
          <Input
            disabled
            name="branchInput"
            viewInput
            register={register}
            placeholder={{ id: "branchId.placeholder" }}
            label={{ id: "branchId.label" }}
          />
          <Input
            name="paymentMethod"
            viewInput
            register={register}
            placeholder={{ id: "paymentMethod.placeholder" }}
            disabled
            label={{ id: "paymentMethod.label" }}
          />
          <Input
            label={{ id: "transactionRefrenceNumber.label" }}
            name="transactionRefrenceNumber"
            register={register}
            viewInput
            placeholder={{ id: "transactionRefrenceNumber.placeholder" }}
          />
          <Input
            label={{ id: "taxId.label" }}
            name="taxId"
            viewInput
            register={register}
            placeholder={{ id: "taxId.placeholder" }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="mt-4 ">
            <div className="flex justify-between font-medium text-xl text-muted-foreground mb-3">
              <p>{"Service"}</p>
              <p>{"Price"}</p>
            </div>
            {serviceOptions
              ?.filter((s) => serviceValues?.includes(Number(s.value)))
              .map((service, index) => {
                totalPriceForServices += Number(
                  service.otherValues?.price?.value
                );

                VatForServices = Number(
                  (
                    Number(service.otherValues?.price?.value) * VatValue
                  ).toFixed(2)
                );
                return (
                  <div key={index} className="flex justify-between mb-2 ">
                    <p>{service.label}</p>
                    <div className=" flex gap-1">
                      <p>{service.otherValues?.price?.value}</p>
                      <span className="text-muted-foreground">{currency}</span>
                    </div>
                  </div>
                );
              })}
            {!!totalPriceForServices && (
              <div className="flex justify-between ">
                <p className="">{`VAT  (${VatValue * 100}%)`}</p>

                <div className=" flex gap-1">
                  <p className=""> {VatForServices}</p>
                  <span className="text-muted-foreground">{currency}</span>
                </div>
              </div>
            )}
            {!!totalPriceForServices && (
              <div className="flex justify-between font-bold mt-2.5 border-t-2 pt-2">
                <p className="text-primary">Total Price</p>

                <div className=" flex gap-1">
                  <p className="text-primary">
                    {" "}
                    {totalPriceForServices + VatForServices}
                  </p>
                  <span className="text-muted-foreground">{currency}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="content space-y-4 grid grid-cols-1 md:grid-cols-1 gap-2 "></div>
      </div>
    </div>
  );
};

export default ServicesAndPaymentDetails;
