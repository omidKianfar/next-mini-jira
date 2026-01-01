"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// schema
import { usersfilterSchema } from "./schema";

// type
import { ModalProps } from "@/src/types/global";
import { UsersFilterFormType } from "../../type";

// redux
import { RootState } from "@/src/store";
import {
  resetUserFilters,
  setUserDate,
  setActive,
} from "@/src/store/slices/users/users-filter";

// ui
import SelectField from "../../../molecule/RHF-controllers-components/RHF-fields/select-filed";
import DateInputField from "../../../molecule/RHF-controllers-components/RHF-fields/date-input-field";
import ButtonNext from "../../../atom/buttons-component/button-next";

const FilterUsers = ({ handleClose }: Pick<ModalProps, "handleClose">) => {
  // redux
  const dispatch = useDispatch();

  // redux state
  const usersFilters = useSelector((state: RootState) => state.usersFilters);

  // form
  const defaultValues: UsersFilterFormType = {
    status: usersFilters.status ?? "all",
    from: usersFilters.createdAt.from ?? "",
    to: usersFilters.createdAt.to ?? "",
  };

  const methods = useForm<UsersFilterFormType>({
    defaultValues,
    resolver: yupResolver(usersfilterSchema),
  });

  // functions
  useEffect(() => {
    if (usersFilters) {
      methods.reset({
        status: usersFilters.status ?? "all",
        from: usersFilters.createdAt.from ?? "",
        to: usersFilters.createdAt.to ?? "",
      });
    }
  }, [usersFilters, methods]);

  const filterHandeler = (values: UsersFilterFormType) => {
    dispatch(setUserDate({ from: values.from ?? "", to: values.to ?? "" }));
    dispatch(setActive(values.status ?? "all"));
    handleClose();
  };

  const resetFilterHandler = () => {
    dispatch(resetUserFilters());
    handleClose();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(filterHandeler)}>
        <h1 className="mb-4 text-center text-subtitle font-bold text-warning-500">
          Filter Users
        </h1>

        <div className="mb-4 rounded-lg border-2 border-warning-400 bg-gray-50 p-3 shadow-md">
          <div>
            <SelectField name="status" label="Tag" options={statusList} />

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

export default FilterUsers;

const statusList = [
  { label: "All", value: "all" },
  { label: "Active", value: "true" },
  { label: "Deactive", value: "false" },
];
