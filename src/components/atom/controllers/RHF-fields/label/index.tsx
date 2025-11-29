import { DateInputFieldProps, FieldValues } from "../../imports";

const LabelComponent = <T extends FieldValues>({
  label,
  name,
}: Pick<DateInputFieldProps<T>, "name" | "label">) => {
  return (
    <>
      {label && (
        <label htmlFor={name} className="text-sm  text-blue-400">
          {label}
        </label>
      )}
    </>
  );
};

export default LabelComponent;
