"use client";

import { Controller, FieldValues, useFormContext } from "react-hook-form";

// type
import { FileInputControllerProps } from "../../type";

// ui
import LabelComponent from "./label";
import ErrorComponent from "./errors";

const FileInputField = <T extends FieldValues>({
  name,
  label,
  ref,
  onChange,
  disabled,
  accept,
}: FileInputControllerProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="hidden">
      <LabelComponent label={label} name={name} />

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative">
            <input
              {...field}
              id={name}
              type={"file"}
              ref={ref}
              accept={accept}
              value={undefined}
              disabled={disabled}
              onChange={(event) => {
                onChange?.(event);
              }}
            />
          </div>
        )}
      />

      <ErrorComponent errors={errors} name={name} />
    </div>
  );
};

export default FileInputField;
