"use client";

import { FieldValues } from "react-hook-form";
import { DateInputFieldProps } from "../../../type";

const LabelComponent = <T extends FieldValues>({
  label,
  name,
}: Pick<DateInputFieldProps<T>, "name" | "label">) => {
  return (
    <>
      {label && (
        <label htmlFor={name} className="text-label text-primary-400">
          {label}
        </label>
      )}
    </>
  );
};

export default LabelComponent;
