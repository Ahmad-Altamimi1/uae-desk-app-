import { z } from "zod";

export const createRegistrationSchema = (t: (key: string) => string) => {
  return z.object({
    username: z
      .string()
      .min(3, t("username.error.minLength"))
      .max(50, t("username.error.maxLength"))
      .nonempty(t("username.error.required")),
    password: z
      .string()
      .min(8, t("password.error.minLength"))
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        t("password.error.pattern")
      )
      .nonempty(t("password.error.required")),
  });
};
