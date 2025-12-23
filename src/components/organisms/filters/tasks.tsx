"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// schema
import { tasksfilterSchema } from "./schema";

// type
import { TasksFilterFormType, ModalProps } from "../../molecule/type";

// redux
import { RootState } from "@/src/store";
import {
  resetTaskFilters,
  setTaskDate,
  setTaskType,
} from "@/src/store/slices/tasks/tasks-filters";

// ui
import SelectField from "../../molecule/controllers/RHF-fields/select-filed";
import DateInputField from "../../molecule/controllers/RHF-fields/date-input-field";
import ButtonNext from "../../atom/button/button-next";

const FilterTask = ({ handleClose }: Pick<ModalProps, "handleClose">) => {
  // redux
  const dispatch = useDispatch();

  // redux state
  const taskFilters = useSelector((state: RootState) => state.taskFilters);

  // form
  const defaultValues: TasksFilterFormType = {
    tag: taskFilters.tag ?? "all",
    from: taskFilters.date.from ?? "",
    to: taskFilters.date.to ?? "",
  };

  const methods = useForm<TasksFilterFormType>({
    defaultValues,
    resolver: yupResolver(tasksfilterSchema),
  });

  // functions
  useEffect(() => {
    if (taskFilters) {
      methods.reset({
        tag: taskFilters.tag ?? "all",
        from: taskFilters.date.from ?? "",
        to: taskFilters.date.to ?? "",
      });
    }
  }, [taskFilters, methods]);

  const filterHandeler = (values: TasksFilterFormType) => {
    dispatch(setTaskDate({ from: values.from ?? "", to: values.to ?? "" }));
    dispatch(setTaskType(values.tag ?? "all"));
    handleClose();
  };

  const resetFilterHandler = () => {
    dispatch(resetTaskFilters());
    handleClose();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(filterHandeler)}>
        <h1 className="mb-4 text-center text-subtitle font-bold text-warning-500">
          Filter Tasks
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
