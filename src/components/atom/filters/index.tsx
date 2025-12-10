"use client";

import {
  ButtonNext,
  DateInputField,
  FormProvider,
  resetFilters,
  RootState,
  SelectField,
  setDate,
  setType,
  useDispatch,
  useForm,
  useMemo,
  useSelector,
  yupResolver,
} from "../imports";
import { FilterFormType, ModalProps } from "../type";
import { filterSchema } from "./schema";

const FilterTask = ({ handleClose }: Pick<ModalProps, "handleClose">) => {
  const dispatch = useDispatch();

  const filters = useSelector((state: RootState) => state.filters);

  const defaultValues: FilterFormType = useMemo(
    () => ({
      tag: filters.tag ?? "all",
      from: filters.date.from ?? "",
      to: filters.date.to ?? "",
    }),
    [],
  );

  const methods = useForm<FilterFormType>({
    defaultValues,
    resolver: yupResolver(filterSchema),
  });

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
        <h1 className="mb-4 text-center text-title font-bold text-warning-500">
          Filters Todos
        </h1>

        <div className="mb-4">
          <SelectField name="tag" label="Tag" options={Tags} />
        </div>

        <div className="mb-4">
          <DateInputField name="from" label="Start Time" />
        </div>

        <div className="mb-4">
          <DateInputField name="to" label="End Time" />
        </div>

        <div className="flex items-center justify-end">
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
