"use client";

import {
  Controller,
  ErrorComponent,
  FieldValues,
  LabelComponent,
  useFormContext,
} from "../../imports";

import { FileInputControllerProps } from "../../type";

const FileInputField = <T extends FieldValues>({
  name,
  label,
  ref,
  onChange,
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
              value={undefined}
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
