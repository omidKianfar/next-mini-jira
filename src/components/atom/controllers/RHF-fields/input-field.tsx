"use client";

import {
  Controller,
  ErrorComponent,
  FieldValues,
  InputControllerProps,
  LabelComponent,
  useFormContext,
} from "../imports";

const InputField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  className,
  ref,
  autoFocus,
  autoComplete,
  onChange,
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
          <input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            ref={ref}
            value={type == "file" ? undefined : field.value || ""}
            onChange={(event) => {
              field.onChange(event);
              onChange?.(event);
            }}
            className="w-full border p-2 my-1 rounded-lg text-sm focus:outline-blue-400 placeholder:text-sm px-2"
          />
        )}
      />

      <ErrorComponent errors={errors} name={name} />
    </div>
  );
};

export default InputField;
