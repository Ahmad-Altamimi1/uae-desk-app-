"use server";

import { cookies } from "next/headers";

export const getCookie = async (name: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
};

export const setCookie = async (name: string, value: string) => {
  const cookieStore = await cookies();
  cookieStore.set(name, value);
};
