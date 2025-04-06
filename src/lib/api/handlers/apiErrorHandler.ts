
import { AxiosError } from "axios";
import { type ErrorResponse } from "./types";
import { toast } from "sonner";

export const extractError = (error: AxiosError<ErrorResponse>): string => {
  let err: string = "";

  for (const key in error.response?.data.errors) {
    err = error.response?.data.errors[key];
    break;
  }

  return Array.isArray(err) ? err[0] : err || error.response?.data;
};

export const apiErrorHandler = (
  statusCode: number,
  error: AxiosError<ErrorResponse>
) => {
  if (statusCode === 600) {
    // Special handling for 600 status code
    const { message, code } = error.response?.data || {};

    // return toast?.error(code || "Error", {
    //   description: message,
    // });
  }

  switch (statusCode) {
    // case 400: {
    //   return toast?.error("Uh-oh! Something Went Wrong :(", {
    //     // description: message,
    //     description: extractError(error),
    //   });
    // }

    // case 401: {
    //   showMessage({
    //     message: "Whoops! Session Ended :(",
    //     description: "Your Session Has Expired",
    //     ...flashMessageStyle.error,
    //   });

    //   return store?.dispatch(removeUserCredential());
    // }

    case 500:

    // return toast("Well, That Didn't Go As Planned! :(", {
    //   description: "Something Went Wrong",
    // });

    // default:
    //   return toast?.error("Well, That Didn't Go As Planned! :(", {
    //     description: "Something Went Wrong",
    //   });
  }
};
