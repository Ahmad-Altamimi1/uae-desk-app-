"use client";
import Input from "@/components/form/input";
import InputCollectionLabel from "@/components/form/inputCollectionLabel";
import { IResponseCustomer } from "@/entities/dashboard";
import { User, Building, Mail, Phone } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
interface ICustomerFTAInformationProps {
  customer: IResponseCustomer;
}
const CustomerFTAInformation = ({ customer }: ICustomerFTAInformationProps) => {
  const { register } = useForm({
    defaultValues: {
      firstName: customer.first_name,
      lastName: customer.last_name,
      businessName: customer.business_name,
      phoneNumber: customer.phone_number,
      email: customer.email,
      branchId: customer.branch_id,
      price: 0,
      address: customer.address,
      status: Number(customer.status),
      transactionRefrenceNumber: customer.transaction_refrence_number,
      ftaRefrence: customer.fta_refrence,
      ftaPassword: customer.fta_password,
      ftaUserName: customer.fta_user_name,
      paymentMethod: customer.payment_method,
      gmailUserName: customer.gmail_user_name,
      gmailPassword: customer.gmail_password,
    },
  });

  return (
    <div id="leftSide">
      <InputCollectionLabel
        title={"dashboard.customers.CustomerInformation"}
        className="mb-6"
      />
      <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={{ id: "firstName.label" }}
          i18nNamespace="forms"
          name="firstName"
          viewInput
          register={register}
          placeholder={{ id: "firstName.placeholder" }}
          startIcon={<User size={18} />}
        />
        <Input
          label={{ id: "lastName.label" }}
          name="lastName"
          register={register}
          viewInput
          placeholder={{ id: "lastName.placeholder" }}
          startIcon={<User size={18} />}
        />
        <Input
          label={{ id: "businessName.label" }}
          name="businessName"
          register={register}
          viewInput
          placeholder={{ id: "businessName.placeholder" }}
          startIcon={<Building size={18} />}
        />
        <Input
          label={{ id: "email.label" }}
          name="email"
          register={register}
          viewInput
          placeholder={{ id: "email.placeholder" }}
          startIcon={<Mail size={18} />}
        />
        <Input
          label={{ id: "phoneNumber.label" }}
          name="phoneNumber"
          register={register}
          viewInput
          placeholder={{ id: "phoneNumber.placeholder" }}
          startIcon={<Phone size={18} />}
        />
        <Input
          label={{ id: "address.label" }}
          name="address"
          register={register}
          viewInput
          placeholder={{ id: "address.placeholder" }}
        />
      </div>
      <InputCollectionLabel
        title={"dashboard.customers.FTAInformation"}
        className="my-6"
      />
      {/* FTA Information */}
      <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={{ id: "ftaUserName.label" }}
          name="ftaUserName"
          register={register}
          viewInput
          placeholder={{ id: "ftaUserName.placeholder" }}
        />
        <Input
          label={{ id: "ftaPassword.label" }}
          name="ftaPassword"
          register={register}
          viewInput
          placeholder={{ id: "ftaPassword.placeholder" }}
        />
        <Input
          label={{ id: "ftaRefrence.label" }}
          name="ftaRefrence"
          register={register}
          viewInput
          placeholder={{ id: "ftaRefrence.placeholder" }}
        />

        <Input
          label={{ id: "gmailUserName.label" }}
          name="gmailUserName"
          register={register}
          viewInput
          placeholder={{ id: "gmailUserName.placeholder" }}
        />
        <Input
          label={{ id: "gmailPassword.label" }}
          name="gmailPassword"
          register={register}
          viewInput
          placeholder={{ id: "gmailPassword.placeholder" }}
        />
      </div>
    </div>
  );
};

export default CustomerFTAInformation;
