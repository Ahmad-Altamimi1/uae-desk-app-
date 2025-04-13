"use client";

import { forwardRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import Select, {
  components,
  type MultiValue,
  type SingleValue,
} from "react-select";
import type { FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";

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
  control?: any; // For react-hook-form Controller
  name?: string;
  placeholder?: TranslatableText;
  i18nNamespace?: string;
  isMulti?: boolean; // New prop for multi-select
}

const CustomSelect = forwardRef<any, SelectProps>(
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
      control,
      name,
      placeholder,
      i18nNamespace = "forms",
      isMulti = false,
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

    // Custom styles for react-select
    const customStyles = {
      control: (provided: any, state: any) => ({
        ...provided,
        border: errorMessage
          ? "1px solid #ef4444"
          : state.isFocused
          ? "1px solid #e5e7eb"
          : "1px solid #e5e7eb",
        boxShadow: state.isFocused ? "0 0 0 1px #e5e7eb" : "none",
        "&:hover": {
          border: errorMessage ? "1px solid #ef4444" : "1px solid #e5e7eb",
        },
        paddingLeft: startIcon ? "2.5rem" : "0.75rem",
        paddingRight: endIcon ? "2.5rem" : "0.75rem",
        borderRadius: "0.375rem",
        minHeight: "2.5rem",
        backgroundColor: "white",
      }),
      valueContainer: (provided: any) => ({
        ...provided,
        padding: "0",
      }),
      singleValue: (provided: any) => ({
        ...provided,
        color: "#1f2937",
      }),
      multiValue: (provided: any) => ({
        ...provided,
        backgroundColor: "#e5e7eb",
      }),
      multiValueLabel: (provided: any) => ({
        ...provided,
        color: "#1f2937",
      }),
      multiValueRemove: (provided: any) => ({
        ...provided,
        color: "#1f2937",
        "&:hover": {
          backgroundColor: "#d1d5db",
          color: "#111827",
        },
      }),
      placeholder: (provided: any) => ({
        ...provided,
        color: "#9ca3af",
      }),
      menu: (provided: any) => ({
        ...provided,
        borderRadius: "0.375rem",
        overflow: "hidden",
      }),
      option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected
          ? "#e5e7eb"
          : state.isFocused
          ? "#f3f4f6"
          : "white",
        color: "#1f2937",
        "&:active": {
          backgroundColor: "#e5e7eb",
        },
      }),
    };

    // Custom Control component to include startIcon and endIcon
    const Control = ({ children, ...controlProps }: any) => (
      <components.Control {...controlProps}>
        {startIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            {startIcon}
          </div>
        )}
        {children}
        {endIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
            {endIcon}
          </div>
        )}
      </components.Control>
    );

    // Render the Select component
    const renderSelect = () => (
      <Select
        ref={ref}
        options={options}
        placeholder={translatedPlaceholder || ""}
        styles={customStyles}
        components={{ Control }}
        className={cn(className)}
        isDisabled={props.disabled}
        isMulti={isMulti}
        {...props}
      />
    );

    return (
      <div className={cn(fullWidth && "w-full")}>
        {translatedLabel && (
          <label className="block text-sm font-medium text-gray-500 mb-2">
            {translatedLabel}
          </label>
        )}
        <div className="relative">
          {control && name ? (
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={options}
                  placeholder={translatedPlaceholder || ""}
                  styles={customStyles}
                  components={{ Control }}
                  className={cn(className)}
                  isDisabled={props.disabled}
                  isMulti={isMulti}
                  onChange={(
                    selected:
                      | MultiValue<SelectOption>
                      | SingleValue<SelectOption>
                  ) => {
                    if (isMulti) {
                      field.onChange(
                        (selected as MultiValue<SelectOption>)?.map(
                          (opt) => opt.value
                        ) || []
                      );
                    } else {
                      field.onChange(
                        (selected as SingleValue<SelectOption>)?.value || null
                      );
                    }
                  }}
                  value={
                    isMulti
                      ? options.filter((opt) =>
                          (field.value || []).includes(opt.value)
                        )
                      : options.find((opt) => opt.value === field.value) || null
                  }
                />
              )}
            />
          ) : (
            renderSelect()
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
