import { FormProvider, useForm } from "react-hook-form";
import { DateInputField, SelectField } from "../controllers/imports";
import { setDate, setType } from "@/src/store/slices/filters";
import { FilterFormType, FilterTaskProps } from "./type";
import { useDispatch } from "react-redux";
import Button from "../button/next-button";

const FilterTask = ({ handleCloseModal }: FilterTaskProps) => {
  const dispatch = useDispatch();

  const defaultValues: FilterFormType = {
    tag: "all",
    from: "",
    to: "",
  };

  const methods = useForm<FilterFormType>({
    defaultValues,
    // resolver: yupResolver()
  });

  const filterHandeler = (values: FilterFormType) => {
    dispatch(setDate({ from: values.from ?? "", to: values.to ?? "" }));
    dispatch(setType(values.tag ?? "all"));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(filterHandeler)}>
        <div className="mb-4">
          <SelectField name="tag" options={Tags} />
        </div>

        <div className="mb-4">
          <DateInputField name="from" />
        </div>

        <div className="mb-4">
          <DateInputField name="to" />
        </div>

        <div className="flex justify-end items-center">
          <Button
            onClick={handleCloseModal}
            className=" bg-blue-500 text-white border-2
            hover:bg-transparent hover:border-blue-500
            hover:text-blue-500 rounded-lg px-8 py-2 
            transition-all duration-200 mr-2"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className=" bg-blue-500 text-white border-2
            hover:bg-transparent hover:border-blue-500
            hover:text-blue-500 rounded-lg px-8 py-2 
            transition-all duration-200"
          >
            Filter
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default FilterTask;

const Tags = [
  { label: "All", value: "all" },
  { label: "Bug", value: "bug" },
  { label: "Task", value: "task" },
];
