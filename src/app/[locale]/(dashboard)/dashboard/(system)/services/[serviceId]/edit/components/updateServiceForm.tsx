"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { FC, useState, useTransition } from "react";
import { User, Mail, Building, Phone } from "lucide-react";

import InputCollectionLabel from "@/components/form/inputCollectionLabel";
import Input from "@/components/form/input";
import { updateCustomer } from "../../../../../actions";
import { customerValidation } from "../../../../../schema/customers";
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
import { IGetCustomer, IServicesData } from "@/entities/dashboard";
import { serviceSchema } from "@/app/[locale]/(dashboard)/schema/services";
import { updateService } from "@/app/[locale]/(dashboard)/actions/services";
import ToolBarModal from "@/components/table/toolBarModal";


interface UpdateServiceFormProps {

    service: IServicesData;
}

export const UpdateServiceForm: FC<UpdateServiceFormProps> = ({

    service,
}) => {
    const t = useTranslations("forms");
    const serviceTranslate = useTranslations("dashboard.services");
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(true);

    const router = useRouter();
    const validation = serviceSchema(t);
    type UpdateServiceFormValues = z.infer<typeof validation>;

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        control,
        watch,
    } = useForm<UpdateServiceFormValues>({
        resolver: zodResolver(validation),
        defaultValues: {
            //   id: customer.id,
            name: service.name,

        },
    });

    // const {
    //   fields: entriesFields,
    //   append: appendEntry,
    //   remove: removeEntry,
    // } = useFieldArray({
    //   control,
    //   name: "entries",
    // });

    const onSubmit = async (data: UpdateServiceFormValues) => {
        startTransition(async () => {
            try {
                const result = await updateService(data as UpdateServiceFormValues);
                if (result.success) {
                    toast.success(serviceTranslate("updateSuccess"));

                    router.back();
                } else {
                    toast.error(result.error?.toString());

                    if (result.data && typeof result.data === "object") {
                        Object.entries(result.data).forEach(([key, value]) => {
                            if (Array.isArray(value) && value.length > 0) {
                                setError(key as keyof UpdateServiceFormValues, {
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


    return (
        <ToolBarModal
            title="dashboard.services.title"
            description="dashboard.services.description"
            image="/customer.png"
            addButton={{
                title: "dashboard.services.Add",
                // href: "permissions/create",
            }}
            open={open}
            setOpen={setOpen}
        >            <PageTitle
                title={"dashboard.services.updateService"}
                description="dashboard.services.updateServiceDes"
            />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="content space-y-4 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div id="leftSide">

                        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label={{ id: "name.label" }}
                                name="name"
                                register={register}
                                disabled={isPending}
                                error={errors.name?.message}
                                placeholder={{ id: "name.placeholder" }}
                            />


                        </div>


                    </div>

                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors duration-300 ease-in-out rounded-2xl"
                >
                    {isPending ? t("submitting") : t("submit")}
                </button>
            </form>
        </ToolBarModal>
    );
};
