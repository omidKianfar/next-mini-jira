"use client";

import { useDispatch, useSelector } from "react-redux";
import { filterSchema } from "./schema";
import { FilterFormType, ModalProps } from "../type";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootState } from "@/src/store";
import { resetFilters, setDate, setType } from "@/src/store/slices/filters";
import SelectField from "../controllers/RHF-fields/select-filed";
import DateInputField from "../controllers/RHF-fields/date-input-field";
import ButtonNext from "../../atom/button/button-next";

const FilterTask = ({ handleClose }: Pick<ModalProps, "handleClose">) => {
  const dispatch = useDispatch();

  const filters = useSelector((state: RootState) => state.filters);

  const defaultValues: FilterFormType = {
    tag: filters.tag ?? "all",
    from: filters.date.from ?? "",
    to: filters.date.to ?? "",
  };

  const methods = useForm<FilterFormType>({
    defaultValues,
    resolver: yupResolver(filterSchema),
  });

  useEffect(() => {
    if (filters) {
      methods.reset({
        tag: filters.tag ?? "all",
        from: filters.date.from ?? "",
        to: filters.date.to ?? "",
      });
    }
  }, [filters, methods]);

  const filterHandeler = (values: FilterFormType) => {
    dispatch(setDate({ from: values.from ?? "", to: values.to ?? "" }));
    dispatch(setType(values.tag ?? "all"));
    handleClose();
  };

  const resetFilterHandler = () => {
    dispatch(resetFilters());
    handleClose();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(filterHandeler)}>
        <h1 className="mb-4 text-center text-subtitle font-bold text-warning-500">
          Filter Todos
        </h1>

        <div className="mb-4 rounded-lg bg-gray-50 p-1 shadow-md">
          <div className="rounded-lg bg-gray-100 p-2">
            <SelectField name="tag" label="Tag" options={Tags} />

            <div className="my-2">
              <DateInputField name="from" label="Start Time" />
            </div>

            <DateInputField name="to" label="End Time" />
          </div>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <ButtonNext onClick={resetFilterHandler} className="mr-2">
            Clear
          </ButtonNext>

          <ButtonNext type="submit">Filter</ButtonNext>
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
