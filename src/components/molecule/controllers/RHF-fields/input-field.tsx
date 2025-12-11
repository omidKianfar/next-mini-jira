"use client";

import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { InputControllerProps } from "../../type";
import LabelComponent from "./label";
import ErrorComponent from "./errors";

const InputField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  className,
  autoFocus,
  icon,
  autoComplete,
  disabled,
}: InputControllerProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={className}>
      <LabelComponent label={label} name={name} />

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative">
            <input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              autoFocus={autoFocus}
              autoComplete={autoComplete}
              disabled={disabled}
              className="my-1 w-full rounded-lg border-2 border-primary-400 py-2 pl-2 pr-8 text-bodySm placeholder:text-bodySm focus:outline-primary-700"
            />
            <div className="absolute bottom-3 right-2 text-title text-gray-400">
              {icon}
            </div>
          </div>
        )}
      />

      <ErrorComponent errors={errors} name={name} />
    </div>
  );
};

export default InputField;
