"use client";

import {
  Controller,
  ErrorComponent,
  FieldValues,
  Icon,
  LabelComponent,
  SelectControllerProps,
  useFormContext,
  useState,
} from "../../imports";

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

  const [changeStatus, setChangeStatus] = useState(false);

  return (
    <div className={className}>
      <LabelComponent label={label} name={name} />

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative">
            <select
              id={name}
              {...field}
              onFocus={() => setChangeStatus(true)}
              onMouseDown={() => setChangeStatus(!changeStatus)}
              onBlur={() => setChangeStatus(false)}
              onChange={(event) => {
                field.onChange(event.target.value);
                setChangeStatus(false);
              }}
              className="w-full border-2 p-2 my-1 rounded-lg text-sm border-blue-400 focus:outline-blue-700 cursor-pointer appearance-none "
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className="absolute top-2.5 right-2.5 text-2xl text-gray-300">
              {changeStatus ? (
                <Icon icon={"ic:baseline-swipe-up"} />
              ) : (
                <Icon icon={"ic:round-swipe-down"} />
              )}
            </div>
          </div>
        )}
      />

      <ErrorComponent errors={errors} name={name} />
    </div>
  );
};

export default SelectField;
