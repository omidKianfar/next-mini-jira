"use client";

import {
  Controller,
  ErrorComponent,
  FieldValues,
  LabelComponent,
  SelectControllerProps,
  useFormContext,
} from "../imports";

const SelectField = <T extends FieldValues>({
  name,
  label,
  options,
  className,
}: SelectControllerProps<T>) => {
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
          <select
            id={name}
            {...field}
            onChange={(e) => field.onChange(e.target.value)}
            className="w-full border p-2 my-1 rounded-lg text-sm focus:border-blue-400 cursor-pointer focus:border-2 "
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />

      <ErrorComponent errors={errors} name={name} />
    </div>
  );
};

export default SelectField;
