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
  icon,
  autoComplete,
  disabled,
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
          <div className="relative">
            <input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              autoFocus={autoFocus}
              autoComplete={autoComplete}
              ref={ref}
              disabled={disabled}
              value={type == "file" ? undefined : field.value || ""}
              onChange={(event) => {
                field.onChange(event);
                onChange?.(event);
              }}
              className="w-full border p-2 my-1 rounded-lg text-sm focus:outline-blue-400 placeholder:text-sm pl-2 pr-8 focus:border-2"
            />
            <div className="absolute bottom-3 right-1 text-2xl text-gray-400">
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
