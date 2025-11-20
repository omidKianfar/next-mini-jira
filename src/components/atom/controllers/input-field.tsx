import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { InputControllerProps } from "./type";

const InputField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  className,
}: InputControllerProps<T>) => {
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
          <input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            className="w-full border p-2 my-1 rounded-lg text-sm focus:outline-blue-400 placeholder:text-sm px-2"
          />
        )}
      />

      {errors?.[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message as any}</p>
      )}
    </div>
  );
};

export default InputField;
