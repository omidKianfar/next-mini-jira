"use client";

import {
  Controller,
  ErrorComponent,
  FieldValues,
  LabelComponent,
  TextareaControllerProps,
  useFormContext,
} from "../imports";

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
            className="w-full my-1 border p-2 rounded-lg text-sm focus:outline-blue-400 placeholder:text-sm px-2"
          />
        )}
      />

      <ErrorComponent errors={errors} name={name} />
    </div>
  );
};

export default TextareaFiled;
