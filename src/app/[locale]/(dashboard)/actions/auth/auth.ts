"use server";
import { ILoginResponse } from "@/entities/dashboard";
import { AuthService } from "@/api/services/dashboard";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
getLocale();
interface LoginState {
  success: boolean;
  data: ILoginResponse;
  error: string | null;
}

export async function handleLogin(prevState: LoginState, formData: FormData) {
  "use server";
  const validatedFields = z
    .object({
      password: z.string().min(3),
      email: z.string().email(),
    })
    .safeParse({
      password: formData.get("password"),
      email: formData.get("email"),
    });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
      data: {
        user: {
          access_token: "",
        },
        password: "",
      },
    };
  }

  const rawFormData = {
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  };
  let isOk = false;
  const locale = await getLocale();

  try {
    const loginResponse = await AuthService.login(rawFormData);
    const cookieStore = await cookies();

    cookieStore.set("token", loginResponse.access_token);

    isOk = true;
    // return { success: true, data: loginResponse, error: null };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
      data: { user: { access_token: "" }, password: "" },
    };
  }
  if (isOk) {
    redirect({
      href: "/dashboard",
      locale: locale,
    });
  }
}
