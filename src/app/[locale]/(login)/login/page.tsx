"use client";

import Image from "next/image";
import { FiMail } from "react-icons/fi";
import Password from "../../../../components/form/password";
import { useActionState, useEffect } from "react";
import { handleLogin } from "../../(dashboard)/actions";
import { Button } from "@/components/ui/button";
import { ILoginResponse } from "@/entities/dashboard";
import { useRouter } from "@/i18n/navigation";
import Cookies from "js-cookie";
import { useUserStore } from "@/store/useStroeUser";
import circle1 from "@/public/images/dashboard/commn/circle1.png";
import add from "@/public/images/dashboard/commn/add.png";
import add1 from "@/public/images/dashboard/commn/add1.png";
import add2 from "@/public/images/dashboard/commn/add2.png";
import circle2 from "@/public/images/dashboard/commn/circle2.png";
import circle3 from "@/public/images/dashboard/commn/circle3.png";
import group8 from "@/public/images/dashboard/commn/group 8.png";
import log from "@/public/images/dashboard/commn/log.png";

interface LoginState {
  success: boolean;
  data: null | ILoginResponse;
  error: string | null;
}

const initialState: LoginState = {
  success: false,
  data: null,
  error: null,
};

export default function LoginPage() {
  const router = useRouter();
  const [formState, formAction, isPending] = useActionState<LoginState>(
    (prevState, formData) => handleLogin(prevState, formData),
    initialState
  );

  const { setUser } = useUserStore();

  useEffect(() => {
    if (formState.success && formState.data) {
      setUser(formState.data);
      Cookies.set("user", JSON.stringify(formState.data.user));
      Cookies.set(
        "role",
        JSON.stringify(
          formState.data.user.roles.length > 0 &&
            formState.data.user.roles[0].code
        )
      );
      Cookies.set("permissions", JSON.stringify(formState.data.permissions));

      const targetPath =
        formState.data.user.roles[0].code === "super-admin"
          ? "/dashboard"
          : "/dashboard/customers";
      router.push(targetPath);
    }
  }, [formState, router, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-green-50 to-white relative">
      {/* Decorative Images */}
      <div className="absolute top-30 left-10 z-10">
        <Image src={circle1} alt="Green Circle" width={80} height={80} />
      </div>
      <div className="absolute top-1 left-80 z-20">
        <Image src={add} alt="Add Circle" width={200} height={200} />
      </div>
      <div className="absolute top-30 left-150 z-30">
        <Image src={add1} alt="Add Circle" width={100} height={100} />
      </div>
      <div className="absolute top-5 right-60 z-30">
        <Image src={add2} alt="Add Circle" width={80} height={80} />
      </div>
      <div className="absolute top-1 right-30 z-30">
        <Image src={circle2} alt="Add Circle" width={30} height={30} />
      </div>
      <div className="absolute bottom-0 left-0 z-30">
        <Image src={circle3} alt="Add Circle" width={110} height={110} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl rounded-2xl overflow-hidden top-4">
        {/* Form Section */}
        <div className="p-10 flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex items-center space-x-3">
              <Image src={group8} alt="HLA Logo" width={300} height={150} />
            </div>
          </div>

          <h2 className="text-xl font-bold mb-2">WELCOME TO YOU HERE</h2>
          <p className="text-gray-500 mb-6">
            Fill Your Account Information to login
          </p>

          <form className="space-y-4" action={formAction}>
            <div className="relative">
              <input
                type="email"
                name="email"
                disabled={isPending}
                placeholder="Email Address"
                className="w-full px-4 py-3 pr-10 pl-12 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="absolute left-3 top-3.5 text-gray-500">
                <FiMail />
              </div>
            </div>

            <Password disabled={isPending} />

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Remember Me
              </label>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              formAction={formAction}
              className="w-full bg-[#00713B] text-white py-3 rounded-xl hover:bg-green-800 transition"
            >
              {isPending ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                <span>Login</span>
              )}
            </Button>
          </form>

          {formState.error && (
            <p className="text-red-500 mt-4 text-sm">{formState.error}</p>
          )}

          <p className="text-xs text-center mt-10 text-gray-500">
            © All Rights Reserved -{" "}
            <span className="text-green-700 font-semibold">HLA</span> 2025
          </p>
        </div>

        {/* Illustration Section */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-bl">
          <Image src={log} alt="Login Illustration" width={900} height={900} />
        </div>
      </div>
    </div>
  );
}
