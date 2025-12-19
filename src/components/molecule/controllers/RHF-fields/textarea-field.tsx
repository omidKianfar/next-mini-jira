"use client";

import { Controller, FieldValues, useFormContext } from "react-hook-form";

// type
import { TextareaControllerProps } from "../../type";

// ui
import LabelComponent from "./label";
import ErrorComponent from "./errors";

const TextareaFiled = <T extends FieldValues>({
  name,
  label,
  placeholder,
  rows = 3,
  className,
}: TextareaControllerProps<T>) => {
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
          <textarea
            {...field}
            id={name}
            placeholder={placeholder}
            rows={rows}
            className="my-1 w-full rounded-lg border-2 border-primary-400 px-2 py-2 text-sm placeholder:text-bodySm focus:outline-primary-700"
          />
        )}
      />

      <ErrorComponent errors={errors} name={name} />
    </div>
  );
};

export default TextareaFiled;
