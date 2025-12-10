"use client";

import {
  Controller,
  ErrorComponent,
  FieldValues,
  LabelComponent,
  TextareaControllerProps,
  useFormContext,
} from "../../imports";

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
            className="my-1 w-full rounded-lg border-2 border-primary-400 p-2 px-2 text-sm placeholder:text-bodySm focus:outline-primary-700"
          />
        )}
      />

      <ErrorComponent errors={errors} name={name} />
    </div>
  );
};

export default TextareaFiled;
