"use server";
import { ILoginResponse } from "@/entities/dashboard";
import { AuthService } from "@/api/services/dashboard";
import { z } from "zod";
import { cookies } from "next/headers";
import { getLocale } from "next-intl/server";

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
    console.log("loginResponse");
    
    const cookieStore = await cookies();
    cookieStore.set("token", loginResponse.access_token);

 return {
      success: true,
      error: null,
      data:loginResponse
    };

  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
      data: { user: { access_token: "" }, password: "" },
    };
  }
  if (isOk) {
    return {
      success: true,
      error: null,
      data:loginResponse
    };
  }
}
export const HandleLogOut = async () => {
  const response = await AuthService.logout();
  
  if (response) {
    
    (await cookies()).delete("token");
    (await cookies()).delete("permissions");
    (await cookies()).delete("user");
    

  }
  return response;
 
};
