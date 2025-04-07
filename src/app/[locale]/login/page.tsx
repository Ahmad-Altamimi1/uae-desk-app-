"use client";


import Image from "next/image";
import { FiMail, FiLock } from "react-icons/fi";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-green-50 to-white">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl shadow-2xl rounded-2xl overflow-hidden">
        {/* Left Side (Form) */}
        <div className="p-10 bg-white flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex items-center space-x-3">
              <Image src="/group 8.png" alt="HLA Logo" width={200} height={100} />
            </div>
          </div>

          <h2 className="text-xl font-bold mb-2">WELCOME TO YOU HERE</h2>
          <p className="text-gray-500 mb-6">Fill Your Account Information to login</p>

          <form className="space-y-4">
            <div className="relative">
              <input type="email" placeholder="Email Address" className="w-full px-4 py-3 pr-10 pl-12 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
              <div className="absolute left-3 top-3.5 text-gray-500">
                <FiMail />
              </div>
             
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="absolute left-3 top-3.5 text-gray-500">
                <FiLock />
              </div>
              <div
                className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="text-sm text-gray-700">Remember Me</label>
            </div>

            <button type="submit" className="w-full bg-[#00713B] text-white py-3 rounded hover:bg-green-800 transition">LOG IN</button>
          </form>

          <p className="text-xs text-center mt-10 text-gray-500">© All Rights Reserved - <span className="text-green-700 font-semibold">HLA</span> 2025</p>
        </div>

        {/* Right Side (Illustration) */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-bl from-green-50 via-white to-green-100">
          <Image src="/log.png" alt="Login Illustration" width={500} height={500} />
        </div>
      </div>
    </div>
  );
}
