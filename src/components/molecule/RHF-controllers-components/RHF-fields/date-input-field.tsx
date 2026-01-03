"use client";

import { Controller, FieldValues, useFormContext } from "react-hook-form";

// type
import { DateInputFieldProps } from "../../type";

// ui
import LabelComponent from "./label";
import ErrorComponent from "./errors";

const DateInputField = <T extends FieldValues>({
  name,
  label,
}: DateInputFieldProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="my-1">
      <LabelComponent label={label} name={name} />

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type="date"
            className="my-1 w-full rounded-lg border-2 border-primary-400 px-2 py-2 text-bodySm focus:outline-primary-700"
          />
        )}
      />

      <ErrorComponent errors={errors} name={name} />
    </div>
  );
};

export default DateInputField;
