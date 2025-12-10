"use client";

import {
  Controller,
  DateInputFieldProps,
  ErrorComponent,
  FieldValues,
  LabelComponent,
  useFormContext,
} from "../../imports";

const DateInputField = <T extends FieldValues>({
  name,
  label,
}: DateInputFieldProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1">
      <LabelComponent label={label} name={name} />

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type="date"
            className="my-1 w-full rounded-xl border-2 border-primary-400 p-2 px-2 text-bodySm focus:outline-primary-700"
          />
        )}
      />

      <ErrorComponent errors={errors} name={name} />
    </div>
  );
};

export default DateInputField;
