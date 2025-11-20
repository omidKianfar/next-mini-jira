import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { SelectControllerProps } from "./type";

const SelectField = <T extends FieldValues>({
  name,
  label,
  options,
  className,
}: SelectControllerProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="text-sm text-blue-400">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            id={name}
            {...field}
            onChange={(e) => field.onChange(e.target.value)}
            className="w-full border p-2 my-1 rounded-lg text-sm focus:outline-blue-400 px-2"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />

      {errors?.[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message as any}</p>
      )}
    </div>
  );
};

export default SelectField;
