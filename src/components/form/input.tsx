"use client";

import type React from "react";
import { forwardRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { cn } from "@/lib/utils";

// Translation message type
interface TranslationMessage {
  id: string;
  defaultMessage?: string;
  values?: Record<string, any>;
}

// Type for text that can be a string or a translation message
type TranslatableText = string | TranslationMessage;

// Input component props
interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  label: TranslatableText;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  helperText?: TranslatableText;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  variant?: "default" | "filled" | "outlined";
  fullWidth?: boolean;
  register?: any; // For react-hook-form support
  name?: string; // For react-hook-form support
  viewInput?: boolean;
  placeholder?: TranslatableText;
  i18nNamespace?: string;
  showLabel?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      startIcon,
      endIcon,
      variant = "default",
      fullWidth = false,
      className = "",
      register,
      name,
      viewInput = false,
      placeholder,
      showLabel = false,
      i18nNamespace = "forms", // Default namespace for form-related translations
      ...props
    },
    ref
  ) => {
    // Get the translation function for the specified namespace
    const t = useTranslations(i18nNamespace);

    // Support for react-hook-form without having to spread register
    const inputProps = register && name ? register(name) : props;

    // Helper function to handle translation of text or translation key objects
    const translateText = (
      text: TranslatableText | undefined
    ): string | undefined => {
      if (!text) return undefined;

      if (typeof text === "string") {
        return text;
      }

      return t(text.id, text.values || {}, {
        defaultMessage: text.defaultMessage,
      });
    };

    const getErrorMessage = (
      error: string | FieldError | undefined
    ): string | undefined => {
      if (!error) return undefined;

      if (typeof error === "string") {
        return error;
      }

      return error.message;
    };

    const translatedLabel = translateText(label);
    const errorMessage = getErrorMessage(error);
    const translatedHelperText = translateText(helperText);
    const translatedPlaceholder = translateText(placeholder);

    return (
      <div className={cn(fullWidth && "w-full")}>
        {showLabel && (
          <label className="block text-sm font-medium text-gray-500 mb-2">
            {translatedLabel}
          </label>
        )}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            {startIcon && startIcon}
            {viewInput && (
              <span className={cn(startIcon ? "md:pl-2" : "")}>
                {translatedLabel}
              </span>
            )}
          </div>
          {startIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              {startIcon}
            </div>
          )}

          <input
            ref={ref}
            readOnly={viewInput}
            disabled={viewInput}
            className={cn(
              "w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-200",
              !viewInput && "bg-[#F6F6F6]",
              startIcon ? "md:pl-10" : "",
              translatedLabel && viewInput ? "md:pl-[50%]" : "",
              endIcon ? "md:pr-10" : "",
              errorMessage ? "border-red-500 focus:ring-red-500" : "",
              className
            )}
            placeholder={translatedPlaceholder as string}
            {...props}
            {...inputProps}
          />

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

Input.displayName = "Input";

export default Input;
