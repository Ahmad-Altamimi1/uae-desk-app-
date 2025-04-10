/* eslint-disable react/jsx-no-undef */
"use client";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { useState, useTransition } from "react";
import { User, Mail, Building, Phone, Plus, Trash2 } from "lucide-react";

// import { createCustomer } from "@/app/actions";
// import type { getCustomerSchemaServerData } from "@/app/schema/customers";
import InputCollectionLabel from "@/components/form/inputCollectionLabel";
import Input from "@/components/form/input";
import { createCustomer } from "../../../actions";
import { getCustomerSchemaServerData } from "../../../schema/customers";
import { Checkbox } from "@radix-ui/react-checkbox";
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import CustomSelect from "@/components/form/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CustomerFormValues = z.infer<
  Awaited<ReturnType<typeof getCustomerSchemaServerData>>
>;

export default function CustomerForm() {
  const t = useTranslations("forms");
  const [isPending, startTransition] = useTransition();
  const [formSuccess, setFormSuccess] = useState<boolean | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Create a client-side schema for form validation
  const formSchema = z.object({
    firstName: z.string().min(1, { message: t("firstName.error.required") }),
    lastName: z.string().min(1, { message: t("lastName.error.required") }),
    businessName: z
      .string()
      .min(1, { message: t("businessName.error.required") }),
    phoneNumber: z
      .string()
      .min(1, { message: t("phoneNumber.error.required") }),
    email: z.string().email({ message: t("email.error.invalidEmail") }),
    address: z.string().optional(),
    status: z.boolean().optional(),
    taxId: z.string().optional(),
    price: z.coerce.number().min(1, { message: t("price.error.required") }),
    vatValue: z.coerce.number().optional(),
    branchId: z.string().min(1, { message: t("branchId.error.required") }),
    transactionRefrenceNumber: z.string().optional(),
    ftaRefrence: z.string().optional(),
    ftaPassword: z.string().optional(),
    ftaUserName: z.string().optional(),
    paymentMethod: z.string().optional(),
    gmailUserName: z.string().optional(),
    gmailPassword: z.string().optional(),
    serviceId: z.array(z.string()).default([]),
    servicePrice: z.record(z.number()).default({}),
    entries: z
      .array(
        z.object({
          date: z
            .string()
            .min(1, { message: t("entries.fields.date.error.required") }),
          amount: z
            .number()
            .min(1, { message: t("entries.fields.amount.error.required") }),
          description: z.string().optional(),
        })
      )
      .optional(),
  });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
    control,
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      businessName: "",
      phoneNumber: "",
      email: "",
      branchId: "main",
      price: 0,
      serviceId: [],
      servicePrice: {},
      address: "",
      status: false,
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
  const { fields, append, remove } = useFieldArray({
    control,
    name: "entries",
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setFormSuccess(null);
    setFormError(null);

    startTransition(async () => {
      try {
        const result = await createCustomer(data as CustomerFormValues);

        if (result.success) {
          setFormSuccess(true);
          reset();
        } else {
          setFormError(result.error || t("errors.unknown"));

          // If we have field errors, set them in the form
          if (result.data && typeof result.data === "object") {
            Object.entries(result.data).forEach(([key, value]) => {
              if (Array.isArray(value) && value.length > 0) {
                setError(key as any, {
                  type: "server",
                  message: value[0],
                });
              }
            });
          }
        }
      } catch (error) {
        setFormError(
          error instanceof Error ? error.message : t("errors.unknown")
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputCollectionLabel title={"dashboard.customers.CustomerInformation"} />
      <div className="content space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div id="leftSide">
          <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={{ id: "firstName.label" }}
              i18nNamespace="forms"
              name="firstName"
              register={register}
              error={errors.firstName?.message}
              placeholder={{ id: "firstName.placeholder" }}
              startIcon={<User size={18} />}
              defaultValue=""
            />
            <Input
              label={{ id: "lastName.label" }}
              name="lastName"
              register={register}
              error={errors.lastName?.message}
              placeholder={{ id: "lastName.placeholder" }}
              startIcon={<User size={18} />}
              defaultValue=""
            />
            <Input
              label={{ id: "businessName.label" }}
              name="businessName"
              register={register}
              error={errors.businessName?.message}
              placeholder={{ id: "businessName.placeholder" }}
              startIcon={<Building size={18} />}
              defaultValue=""
            />
            <Input
              label={{ id: "email.label" }}
              name="email"
              register={register}
              error={errors.email?.message}
              placeholder={{ id: "email.placeholder" }}
              startIcon={<Mail size={18} />}
              defaultValue=""
            />
            <Input
              label={{ id: "phoneNumber.label" }}
              name="phoneNumber"
              register={register}
              error={errors.phoneNumber?.message}
              placeholder={{ id: "phoneNumber.placeholder" }}
              startIcon={<Phone size={18} />}
              defaultValue=""
            />
            <Input
              label={{ id: "address.label" }}
              name="address"
              register={register}
              error={errors.address?.message}
              placeholder={{ id: "address.placeholder" }}
              defaultValue=""
            />
          </div>

          <InputCollectionLabel
            title={"dashboard.customers.ServicesAndPaymentDetails"}
            className="my-6"
          />
          <div className="content space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={{ id: "branchId.label" }}
              name="branchId"
              register={register}
              error={errors.branchId?.message}
              placeholder={{ id: "branchId.placeholder" }}
              defaultValue="main"
            />
            <Input
              label={{ id: "price.label" }}
              name="price"
              register={register}
              error={errors.price?.message}
              placeholder={{ id: "price.placeholder" }}
              type="number"
              defaultValue={0}
            />
          </div>
          <div className="space-y-6">
            {fields.map((field, index) => (
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
                        onClick={() => remove(index)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove service</span>
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor={`services.${index}.service`}>
                          Service
                        </Label>
                        <Select
                          onValueChange={(value) => {
                            // This would be handled by your form library
                          }}
                          defaultValue=""
                        >
                          <SelectTrigger
                            id={`services.${index}.service`}
                            className={cn(
                              "w-full",
                              errors.services?.[index]?.service &&
                                "border-red-500"
                            )}
                          >
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="jordan">Jordan</SelectItem>
                            <SelectItem value="egypt">Egypt</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.services?.[index]?.service && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.services?.[
                              index
                            ]?.service?.message?.toString()}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`services.${index}.servicePrice`}>
                          Price
                        </Label>
                        <Input
                          id={`services.${index}.servicePrice`}
                          {...register(
                            `services.${index}.servicePrice` as const
                          )}
                          placeholder="Enter price"
                          className={cn(
                            errors.services?.[index]?.servicePrice &&
                              "border-red-500"
                          )}
                        />
                        {errors.services?.[index]?.servicePrice && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.services?.[
                              index
                            ]?.servicePrice?.message?.toString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full border-dashed border-slate-300 hover:border-slate-400 flex items-center justify-center gap-2 h-16"
              onClick={() => append({ service: "", servicePrice: "" })}
            >
              <Plus className="h-4 w-4" />
              <span>Add Service</span>
            </Button>

            <div className="flex justify-end">
              <Button type="submit" className="px-8">
                Save Services
              </Button>
            </div>
          </div>
          <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Checkbox name="status" />

            <Input
              label={{ id: "taxId.label" }}
              name="taxId"
              register={register}
              error={errors.taxId?.message}
              placeholder={{ id: "taxId.placeholder" }}
              defaultValue=""
            />
            <InputCollectionLabel
              title={"dashboard.customers.FTAInformation"}
              className="my-6"
            />
            <Input
              label={{ id: "vatValue.label" }}
              name="vatValue"
              register={register}
              error={errors.vatValue?.message}
              placeholder={{ id: "vatValue.placeholder" }}
              type="number"
              defaultValue={0}
            />
            <Input
              label={{ id: "transactionRefrenceNumber.label" }}
              name="transactionRefrenceNumber"
              register={register}
              error={errors.transactionRefrenceNumber?.message}
              placeholder={{ id: "transactionRefrenceNumber.placeholder" }}
              defaultValue=""
            />
            <Input
              label={{ id: "ftaRefrence.label" }}
              name="ftaRefrence"
              register={register}
              error={errors.ftaRefrence?.message}
              placeholder={{ id: "ftaRefrence.placeholder" }}
              defaultValue=""
            />
            <Input
              label={{ id: "ftaPassword.label" }}
              name="ftaPassword"
              register={register}
              error={errors.ftaPassword?.message}
              placeholder={{ id: "ftaPassword.placeholder" }}
              defaultValue=""
            />
            <Input
              label={{ id: "ftaUserName.label" }}
              name="ftaUserName"
              register={register}
              error={errors.ftaUserName?.message}
              placeholder={{ id: "ftaUserName.placeholder" }}
              defaultValue=""
            />
            <Input
              label={{ id: "paymentMethod.label" }}
              name="paymentMethod"
              register={register}
              error={errors.paymentMethod?.message}
              placeholder={{ id: "paymentMethod.placeholder" }}
              defaultValue=""
            />
            <Input
              label={{ id: "gmailUserName.label" }}
              name="gmailUserName"
              register={register}
              error={errors.gmailUserName?.message}
              placeholder={{ id: "gmailUserName.placeholder" }}
              defaultValue=""
            />
            <Input
              label={{ id: "gmailPassword.label" }}
              name="gmailPassword"
              register={register}
              error={errors.gmailPassword?.message}
              placeholder={{ id: "gmailPassword.placeholder" }}
              defaultValue=""
            />
            <Input
              label={{ id: "entries.label" }}
              name="entries"
              register={register}
              error={errors.entries?.message}
              placeholder={{ id: "entries.placeholder" }}
              defaultValue={[]}
            />
          </div>
        </div>
        <div id="rightSide"></div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors duration-300 ease-in-out rounded-2xl"
      >
        {isPending ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
