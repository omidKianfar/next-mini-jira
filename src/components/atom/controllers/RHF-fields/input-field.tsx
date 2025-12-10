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
              className="my-1 w-full rounded-xl border-2 border-primary-400 p-2 pl-2 pr-8 text-bodySm placeholder:text-bodySm focus:outline-primary-700"
            />
            <div className="absolute bottom-3 right-1 text-title text-gray-400">
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
