"use client";

import { forwardRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import type { FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";

interface TranslationMessage {
  id: string;
  defaultMessage?: string;
  values?: Record<string, any>;
}

type TranslatableText = string | TranslationMessage;

export interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "placeholder"> {
  label: TranslatableText;
  options: SelectOption[];
  error?: string | FieldError;
  helperText?: TranslatableText;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  variant?: "default" | "filled" | "outlined";
  fullWidth?: boolean;
  register?: any;
  name?: string;
  placeholder?: TranslatableText;
  i18nNamespace?: string;
}

const CustomSelect = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      error,
      helperText,
      startIcon,
      endIcon,
      variant = "default",
      fullWidth = false,
      className = "",
      register,
      name,
      placeholder,
      i18nNamespace = "forms",
      ...props
    },
    ref
  ) => {
    const t = useTranslations(i18nNamespace);

    const translateText = (
      text: TranslatableText | undefined
    ): string | undefined => {
      if (!text) return undefined;
      if (typeof text === "string") return text;
      return t(text.id, text.values || {}, {
        defaultMessage: text.defaultMessage,
      });
    };

    const getErrorMessage = (
      error: string | FieldError | undefined
    ): string | undefined => {
      if (!error) return undefined;
      if (typeof error === "string") return error;
      return error.message;
    };

    const translatedLabel = translateText(label);
    const errorMessage = getErrorMessage(error);
    const translatedHelperText = translateText(helperText);
    const translatedPlaceholder = translateText(placeholder);

    const selectProps = register && name ? register(name) : props;

    return (
      <div className={cn(fullWidth && "w-full")}>
        <label className="block text-sm font-medium text-gray-500 mb-2">
          {translatedLabel}
        </label>
        <div className="relative">
          {startIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              {startIcon}
            </div>
          )}

          <select
            ref={ref}
            className={cn(
              "w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1",
              startIcon ? "pl-10" : "",
              endIcon ? "pr-10" : "",
              errorMessage
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-gray-200",
              className
            )}
            {...selectProps}
            {...props}
          >
            {translatedPlaceholder && (
              <option value="" disabled hidden>
                {translatedPlaceholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {endIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              {endIcon}
            </div>
          )}
        </div>

        {errorMessage && (
          <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
        )}
        {translatedHelperText && !errorMessage && (
          <p className="mt-1 text-sm text-gray-500">{translatedHelperText}</p>
        )}
      </div>
    );
  }
);

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
