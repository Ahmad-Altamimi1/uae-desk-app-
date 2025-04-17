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

// Textarea component props
interface TextareaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "placeholder"
  > {
  label: TranslatableText;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  helperText?: TranslatableText;
  placeholder?: TranslatableText;
  i18nNamespace?: string;
  showLabel?: boolean;
  register?: any; // For react-hook-form support
  name?: string; // For react-hook-form support
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      placeholder,
      showLabel = false,
      i18nNamespace = "forms",
      className = "",
      register,
      name,
      ...props
    },
    ref
  ) => {
    const t = useTranslations(i18nNamespace);

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

    const inputProps = register && name ? register(name) : props;

    return (
      <div className={cn("w-full")}>
        {showLabel && (
          <label className="block text-sm font-medium text-gray-500 mb-2">
            {translatedLabel}
          </label>
        )}
        <textarea
          ref={ref}
          placeholder={translatedPlaceholder as string}
          className={cn(
            "w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-200",
            errorMessage ? "border-red-500 focus:ring-red-500" : "",
            className
          )}
          {...inputProps}
        />
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

Textarea.displayName = "Textarea";

export { Textarea };
