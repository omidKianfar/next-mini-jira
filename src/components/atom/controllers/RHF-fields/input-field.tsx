"use client";

import {
  Controller,
  ErrorComponent,
  FieldValues,
  InputControllerProps,
  LabelComponent,
  useFormContext,
} from "../../imports";

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
              className="w-full p-2 my-1 border-2 rounded-lg text-sm border-blue-400 focus:outline-blue-700 placeholder:text-sm pl-2 pr-8 "
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
