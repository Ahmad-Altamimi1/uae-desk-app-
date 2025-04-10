"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";
import Input from "@/components/form/input";

import { Key, User } from "lucide-react";
import InputCollectionLabel from "@/components/form/inputCollectionLabel";
import { useTransition } from "react";
import { permissionSchema } from "@/app/[locale]/(dashboard)/schema/permission";
import { createPermission } from "@/app/[locale]/(dashboard)/actions/permissions";
import ToolBar2 from "@/components/table/toolBar2";

type RoleCreateFormValues = z.infer<ReturnType<typeof permissionSchema>>;

export default function RoleCreateForm() {
    const t = useTranslations("forms");

    const [isPending, startTransition] = useTransition();
    const rolesSchema = roleSchema(t);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RoleCreateFormValues>({
        resolver: zodResolver(rolesSchema),
        defaultValues: {
            name: "",

        },
    });

    const onSubmit = (data: RoleCreateFormValues) => {
        startTransition(() => {
            createRole(data);
        });
        console.log(data);
        // Handle form submission here
    };

    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* <InputCollectionLabel title={"dashboard.permissions.title"} /> */}
                <hr />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1 md:col-span-2">
                        <Input
                            label={{ id: "name.label" }}
                            name="name"
                            register={register}
                            error={errors.name?.message}
                            placeholder={{ id: "name.placeholder" }}
                            startIcon={<Key size={18} />}
                        />

                        <Input
                            label={{ id: "code.label" }}
                            name="code"
                            register={register}
                            error={errors.code?.message}
                            placeholder={{ id: "code.placeholder" }}
                            startIcon={<Key size={18} />}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors duration-300 ease-in-out rounded-2xl"
                >
                    {t("submit")}
                </button>
            </form>
        </>
    );

}
