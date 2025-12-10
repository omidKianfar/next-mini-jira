"use client";

import {
  Controller,
  ErrorComponent,
  FieldValues,
  LabelComponent,
  MyIcon,
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
              className="my-1 w-full cursor-pointer appearance-none rounded-xl border-2 border-primary-400 p-2 text-bodySm focus:outline-primary-700"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div>
              {changeStatus ? (
                <MyIcon
                  icon="ic:baseline-swipe-up"
                  className="absolute right-2.5 top-2.5 text-title text-gray-400"
                />
              ) : (
                <MyIcon
                  icon="ic:round-swipe-down"
                  className="absolute right-2.5 top-2.5 text-title text-gray-400"
                />
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
