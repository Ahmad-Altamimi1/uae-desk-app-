import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/dashboard": "/dashboard",
    "/login": "/login",
    "/mediaCustomer/[newCustomerId]":
      "/dashboard/customers/create/[newCustomerId]",
    "/customerView/[customerId]": "/dashboard/customers/[customerId]",
  },
});
