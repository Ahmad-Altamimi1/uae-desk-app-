"use client";
import Image from "next/image";
import { FiMail } from "react-icons/fi";
import Password from "../../../components/form/password";
import { useActionState } from "react";
import { handleLogin } from "../(dashboard)/actions";

export default function LoginPage() {
  interface LoginState {
    success: boolean;
    data: null;

    error: string | null;
  }

  interface initialState {
    success: boolean;
    data: null;
    error: null;
  }

  const initialState: LoginState = {
    success: false,
    data: null,
    error: null,
  };

  const [formState, formAction, isPending] = useActionState<LoginState>(
    handleLogin,
    initialState
  );
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-green-50 to-white relative">
      <div className="absolute top-30 left-10 z-10">
        <Image src="/circle1.png" alt="Green Circle" width={80} height={80} />
      </div>

      <div className="absolute top-1 left-80 z-20">
        <Image src="/add.png" alt="Add Circle" width={200} height={200} />
      </div>

      <div className="absolute top-30 left-150 z-30">
        <Image src="/add1.png" alt="Add Circle" width={100} height={100} />
      </div>
      <div className="absolute top-5 right-60 z-30">
        <Image src="/add2.png" alt="Add Circle" width={80} height={80} />
      </div>

      <div className="absolute top-1 right-30 z-30">
        <Image src="/circle2.png" alt="Add Circle" width={30} height={30} />
      </div>

      <div className="absolute bottom-0 left-0 z-30">
        <Image src="/circle3.png" alt="Add Circle" width={110} height={110} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl rounded-2xl overflow-hidden top-4">
        {/* Left Side (Form) */}
        <div className="p-10 flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex items-center space-x-3">
              <Image
                src="/group 8.png"
                alt="HLA Logo"
                width={300}
                height={150}
              />
            </div>
          </div>

          <h2 className="text-xl font-bold mb-2">WELCOME TO YOU HERE</h2>
          <p className="text-gray-500 mb-6">
            Fill Your Account Information to login
          </p>

          <form className="space-y-4" action={formAction} method="POST">
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 pr-10 pl-12 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="absolute left-3 top-3.5 text-gray-500">
                <FiMail />
              </div>
            </div>

            <Password />

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Remember Me
              </label>
            </div>

            <button
              type="submit"
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
            </button>
          </form>

          <p className="text-xs text-center mt-10 text-gray-500">
            © All Rights Reserved -{" "}
            <span className="text-green-700 font-semibold">HLA</span> 2025
          </p>
        </div>

        {/* Right Side (Illustration) */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-bl">
          <Image
            src="/log.png"
            alt="Login Illustration"
            width={900}
            height={900}
          />
        </div>
      </div>
    </div>
  );
}
