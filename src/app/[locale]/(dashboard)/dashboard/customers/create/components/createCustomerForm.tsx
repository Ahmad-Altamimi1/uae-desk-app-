"use client";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { FC, useTransition } from "react";
import { User, Mail, Building, Phone } from "lucide-react";

import InputCollectionLabel from "@/components/form/inputCollectionLabel";
import Input from "@/components/form/input";
import { createCustomer } from "../../../../actions";
import { customerValidation } from "../../../../schema/customers";
import CustomSelect from "@/components/form/select";
import PageTitle from "@/components/ui/pageTitle";
import { ISelectOption } from "@/utils/type";
import {
  currency,
  customerStatusOptions,
  paymentMethodOptions,
  VatValue,
} from "@/constants";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
// import { revalidateTag } from "next/cache";
interface CustomerFormProps {
  serviceOptions: ISelectOption[];
  branchOptions: ISelectOption[];
}

export const CustomerForm: FC<CustomerFormProps> = ({
  branchOptions,
  serviceOptions,
}) => {
  const t = useTranslations("forms");
  const customerTranslate = useTranslations("dashboard.customers");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const validation = customerValidation(t);
  type CustomerFormValues = z.infer<typeof validation>;

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
    control,
    watch,
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(validation),
    defaultValues: {
      firstName: "",
      lastName: "",
      businessName: "",
      phoneNumber: "",
      email: "",
      branchId: 0,
      price: 0,
      serviceId: [],
      //   servicePrice: {},
      address: "",
      status: 0,
      taxId: "",
      vatValue: 0,
      transactionRefrenceNumber: "",
      ftaRefrence: "",
      ftaPassword: "",
      ftaUserName: "",
      paymentMethod: "",
      gmailUserName: "",
      gmailPassword: "",
      entries: [],
    },
  });

  const {
    fields: entriesFields,
    append: appendEntry,
    remove: removeEntry,
  } = useFieldArray({
    control,
    name: "entries",
  });

  const onSubmit = async (data: CustomerFormValues) => {
    startTransition(async () => {
      try {
        const result = await createCustomer(data as CustomerFormValues);
        if (result.success) {
          toast.success(customerTranslate("createSuccess"));

          reset();
          router.back();
        } else {
          toast.error(result.error?.toString());

          if (result.data && typeof result.data === "object") {
            Object.entries(result.data).forEach(([key, value]) => {
              if (Array.isArray(value) && value.length > 0) {
                setError(key as keyof CustomerFormValues, {
                  type: "server",
                  message: value[0],
                });
              }
            });
          }
        }
      } catch (error) {
        console.log("error", error);

        toast.error(
          error instanceof Error ? error.message : t("errors.unknown")
        );
      }
    });
  };
  const serviceValues = watch("serviceId");
  let totalPriceForServices: number = 0;
  let VatForServices: number = 0;

  return (
    <>
      <PageTitle
        title={"dashboard.customers.CreateCustomer"}
        description="dashboard.customers.CreateCustomerDes"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="content space-y-4 grid grid-cols-1 md:grid-cols-2 gap-12">
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
                register={register}
                error={errors.firstName?.message}
                placeholder={{ id: "firstName.placeholder" }}
                startIcon={<User size={18} />}
              />
              <Input
                label={{ id: "lastName.label" }}
                name="lastName"
                register={register}
                error={errors.lastName?.message}
                placeholder={{ id: "lastName.placeholder" }}
                startIcon={<User size={18} />}
              />
              <Input
                label={{ id: "businessName.label" }}
                name="businessName"
                register={register}
                error={errors.businessName?.message}
                placeholder={{ id: "businessName.placeholder" }}
                startIcon={<Building size={18} />}
              />
              <Input
                label={{ id: "email.label" }}
                name="email"
                register={register}
                error={errors.email?.message}
                placeholder={{ id: "email.placeholder" }}
                startIcon={<Mail size={18} />}
              />
              <Input
                label={{ id: "phoneNumber.label" }}
                name="phoneNumber"
                register={register}
                error={errors.phoneNumber?.message}
                placeholder={{ id: "phoneNumber.placeholder" }}
                startIcon={<Phone size={18} />}
              />
              <Input
                label={{ id: "address.label" }}
                name="address"
                register={register}
                error={errors.address?.message}
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
                error={errors.ftaUserName?.message}
                placeholder={{ id: "ftaUserName.placeholder" }}
              />
              <Input
                label={{ id: "ftaPassword.label" }}
                name="ftaPassword"
                register={register}
                error={errors.ftaPassword?.message}
                placeholder={{ id: "ftaPassword.placeholder" }}
              />
              <Input
                label={{ id: "ftaRefrence.label" }}
                name="ftaRefrence"
                register={register}
                error={errors.ftaRefrence?.message}
                placeholder={{ id: "ftaRefrence.placeholder" }}
              />

              <Input
                label={{ id: "gmailUserName.label" }}
                name="gmailUserName"
                register={register}
                error={errors.gmailUserName?.message}
                placeholder={{ id: "gmailUserName.placeholder" }}
              />
              <Input
                label={{ id: "gmailPassword.label" }}
                name="gmailPassword"
                register={register}
                error={errors.gmailPassword?.message}
                placeholder={{ id: "gmailPassword.placeholder" }}
              />
            </div>

            <InputCollectionLabel
              title={"dashboard.customers.status"}
              className="my-6"
            />
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-1 gap-4 ">
              <CustomSelect
                // label={{ id: "status.label" }}
                name="status"
                control={control}
                error={errors.status?.message}
                placeholder={{ id: "status.placeholder" }}
                options={customerStatusOptions}
              />
            </div>
            {/* <div>
                <label htmlFor="" className="text-sm">
                  status
                </label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => <Checkbox {...field} />}
                />
              </div> */}
          </div>
          <div id="rightSide">
            <InputCollectionLabel
              title={"dashboard.customers.ServicesAndPaymentDetails"}
              className="mb-6"
            />
            <div className="fields border py-4 px-8 rounded-md">
              <div className="content space-y-4 grid grid-cols-1 md:grid-cols-1 gap-2 ">
                <CustomSelect
                  // label={{ id: "branchId.label" }}
                  name="branchId"
                  error={errors.branchId?.message}
                  placeholder={{ id: "branchId.placeholder" }}
                  options={branchOptions}
                  control={control}
                />
                <CustomSelect
                  // label={{ id: "services" }}
                  name="serviceId"
                  control={control}
                  error={errors.serviceId?.message}
                  placeholder={{ id: "services" }}
                  options={serviceOptions}
                  isMulti
                />
                <div>
                  {serviceOptions
                    .filter((s) => serviceValues.includes(Number(s.value)))
                    .map((service, index) => {
                      totalPriceForServices += Number(
                        service.otherValues?.price?.value
                      );

                      VatForServices = totalPriceForServices * VatValue;
                      return (
                        <div key={index} className="flex justify-between">
                          <p>{service.label}</p>
                          <div className=" flex gap-1">
                            <p>{service.otherValues?.price?.value}</p>
                            <span className="text-muted-foreground">
                              {currency}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  {!!totalPriceForServices && (
                    <div className="flex justify-between ">
                      <p className="">VAT</p>

                      <div className=" flex gap-1">
                        <p className=""> {VatForServices}</p>
                        <span className="text-muted-foreground">
                          {currency}
                        </span>
                      </div>
                    </div>
                  )}
                  {!!totalPriceForServices && (
                    <div className="flex justify-between font-bold mt-2.5 space-y-4 mb-2 pb-1 ">
                      <p className="text-primary">Total Price</p>

                      <div className=" flex gap-1">
                        <p className="text-primary">
                          {" "}
                          {totalPriceForServices + VatForServices}
                        </p>
                        <span className="text-muted-foreground">
                          {currency}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="content space-y-4 grid grid-cols-1 md:grid-cols-1 gap-2 ">
                <CustomSelect
                  // label={{ id: "paymentMethod.label" }}
                  name="paymentMethod"
                  control={control}
                  options={paymentMethodOptions}
                  error={errors.paymentMethod?.message}
                  placeholder={{ id: "paymentMethod.placeholder" }}
                  className="mb-6"
                />

                {/* <Input
                  label={{ id: "entries.label" }}
                  name="entries"
                  register={register}
                  error={errors.entries?.message}
                  placeholder={{ id: "entries.placeholder" }}
                /> */}
                <Input
                  label={{ id: "transactionRefrenceNumber.label" }}
                  name="transactionRefrenceNumber"
                  register={register}
                  error={errors.transactionRefrenceNumber?.message}
                  placeholder={{ id: "transactionRefrenceNumber.placeholder" }}
                />
                <Input
                  label={{ id: "taxId.label" }}
                  name="taxId"
                  register={register}
                  error={errors.taxId?.message}
                  placeholder={{ id: "taxId.placeholder" }}
                />
              </div>

              {/* <Input
                label={{ id: "vatValue.label" }}
                name="vatValue"
                register={register}
                error={errors.vatValue?.message}
                placeholder={{ id: "vatValue.placeholder" }}
                type="number"
                defaultValue={0}
              /> */}
            </div>
          </div>
        </div>
        {/* <div className="space-y-6">
                {entriesFields.map((field, index) => (
                  <Card
                    key={field.id}
                    className="overflow-hidden border-slate-200 shadow-sm"
                  >
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium">
                            Service #{index + 1}
                          </h3>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeEntry(index)}
                            className="h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove service</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-dashed border-slate-300 hover:border-slate-400 flex items-center justify-center gap-2 h-16"
                  onClick={() => appendEntry({ service: "", servicePrice: "" })}
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Service</span>
                </Button>

                <div className="flex justify-end">
                  <Button type="submit" className="px-8">
                    Save Services
                  </Button>
                </div>
              </div> */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors duration-300 ease-in-out rounded-2xl"
        >
          {isPending ? t("submitting") : t("submit")}
        </button>
      </form>
    </>
  );
};
