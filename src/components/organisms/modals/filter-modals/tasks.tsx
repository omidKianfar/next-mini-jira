'use client';

import {
  ButtonNext,
  DateInputField,
  FormProvider,
  ModalProps,
  resetTaskFilters,
  RootState,
  SelectField,
  setTaskDate,
  setTaskType,
  useDispatch,
  useEffect,
  useForm,
  useSelector,
  yupResolver,
} from '../../imports';
import { tasksfilterSchema } from './schema';
import { TasksFilterFormType } from '../../type';
import { Tags } from './data';

const FilterTask = ({ handleClose }: Pick<ModalProps, 'handleClose'>) => {
  const dispatch = useDispatch();

  const taskFilters = useSelector((state: RootState) => state.taskFilters);

  const defaultValues: TasksFilterFormType = {
    tag: taskFilters.tag ?? 'all',
    from: taskFilters.date.from ?? '',
    to: taskFilters.date.to ?? '',
  };

  const methods = useForm<TasksFilterFormType>({
    defaultValues,
    resolver: yupResolver(tasksfilterSchema),
  });

  useEffect(() => {
    if (taskFilters) {
      methods.reset({
        tag: taskFilters.tag ?? 'all',
        from: taskFilters.date.from ?? '',
        to: taskFilters.date.to ?? '',
      });
    }
  }, [taskFilters, methods]);

  const filterHandeler = (values: TasksFilterFormType) => {
    dispatch(setTaskDate({ from: values.from ?? '', to: values.to ?? '' }));
    dispatch(setTaskType(values.tag ?? 'all'));
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

        <div className="mb-4 rounded-lg border-2 border-warning-400 bg-gray-50 p-3 shadow-md">
          <div>
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
