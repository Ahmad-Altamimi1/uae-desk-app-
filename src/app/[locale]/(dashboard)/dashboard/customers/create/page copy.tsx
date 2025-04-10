"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";
import Input from "@/components/form/input";
import { User } from "lucide-react";
import { createRegistrationSchema } from "../components/utils/validation";
import InputCollectionLabel from "@/components/form/inputCollectionLabel";
import { useTransition } from "react";
import { createCustomer } from "../../../actions";

type RegistrationFormValues = z.infer<
  ReturnType<typeof createRegistrationSchema>
>;

export default function RegistrationForm() {
  const t = useTranslations("forms");

  const [isPending, startTransition] = useTransition();
  const registrationSchema = createRegistrationSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = (data: RegistrationFormValues) => {
    startTransition(() => {
      createCustomer(data);
    });
    console.log(data);
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputCollectionLabel title={"dashboard.customers.CustomerInformation"} />
      <div className="space-y-2 grid grid-cols-1 md:grid-cols-2">
        <Input
          label={{ id: "username.label" }}
          name="username"
          register={register}
          error={errors.username?.message}
          helperText={{ id: "username.helper" }}
          placeholder={{ id: "username.placeholder" }}
          startIcon={<User size={18} />}
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors duration-300 ease-in-out rounded-2xl"
      >
        {t("submit")}
      </button>
    </form>
  );
}
