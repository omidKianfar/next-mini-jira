import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { TextareaControllerProps } from "./type";

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
      {label && (
        <label htmlFor={name} className="text-sm  text-blue-400">
          {label}
        </label>
      )}

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

      {errors?.[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message as any}</p>
      )}
    </div>
  );
};

export default TextareaFiled;
