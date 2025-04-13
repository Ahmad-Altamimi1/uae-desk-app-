"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { useState, useTransition } from "react";

import Input from "@/components/form/input";
import { FaLock } from "react-icons/fa";
import { Key } from "lucide-react";

import { createRoleCreateSchema } from "@/app/[locale]/(dashboard)/schema/role";
import { createPermission } from "@/app/[locale]/(dashboard)/actions/permissions";
import { createRoles } from "@/app/[locale]/(dashboard)/actions/roles";
import PageTitle from "@/components/ui/pageTitle";
import InputCollectionLabel from "@/components/form/inputCollectionLabel";
import { Checkbox } from "@radix-ui/react-checkbox";

type RoleCreateFormValues = z.infer<ReturnType<typeof createRoleCreateSchema>>;

export default function RoleCreateForm() {
    const t = useTranslations('forms');

    const [isPending, startTransition] = useTransition();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);


    const rolesSchema = createRoleCreateSchema(t);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RoleCreateFormValues>({
        resolver: zodResolver(rolesSchema),
        defaultValues: {
            name: "",
            code: "",
            // permissions: [],
        },
    });

    const onSubmit = (data: RoleCreateFormValues) => {
        startTransition(async () => {
            const response = await createRoles(data);

            if (response.error) {
                setErrorMessage(response.error);
            } else {
                setErrorMessage(null);
            }

            console.log("response", response);
        });

        console.log(data);
    };

    return (
        <>

            <PageTitle
                title={"dashboard.roles.CreateRole"}
                description="dashboard.roles.CreateRoleDes"
            />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <hr />


                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <div>
                        <Input
                            label={{ id: "name.label" }}
                            name="name"
                            register={register}
                            error={errors.name?.message}
                            placeholder={{ id: "name.placeholder" }}
                            startIcon={<Key size={18} />}
                        />
                    </div>

                    <div>
                        <Input
                            label={{ id: "code.label" }}
                            name="code"
                            register={register}
                            error={errors.code?.message}
                            placeholder={{ id: "code.placeholder" }}
                            startIcon={<FaLock size={18} />}
                        />
                    </div>
                </div>
                <InputCollectionLabel
                    title={"dashboard.roles.roleInformation"}
                    className="mb-6"
                />
                <label className="flex items-center gap-2 cursor-pointer" htmlFor="select-all-permissions">
                    select all

                    <Checkbox  id="select-all-permissions" />

                </label>



                {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                )}

                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors duration-300 ease-in-out rounded-2xl"
                >
                    {isPending ? (
                        <span>{t("loading")}</span>
                    ) : (
                        <span>{t("submitRole")}</span>
                    )}
                </button>
            </form>

        </>

    );
}
