'use client';

import {
  ButtonNext,
  DateInputField,
  FormProvider,
  ModalProps,
  resetChatsFilters,
  RootState,
  setChatsDate,
  useDispatch,
  useEffect,
  useForm,
  useSelector,
  yupResolver,
} from '../../imports';
import { chatsfilterSchema } from './schema';
import { ChatsFilterFormType } from '../../type';

const FilterChats = ({ handleClose }: Pick<ModalProps, 'handleClose'>) => {
  const dispatch = useDispatch();

  const chatsFilters = useSelector((state: RootState) => state.chatsFilters);

  const defaultValues: ChatsFilterFormType = {
    from: chatsFilters.updatedAt.from ?? '',
    to: chatsFilters.updatedAt.to ?? '',
  };

  const methods = useForm<ChatsFilterFormType>({
    defaultValues,
    resolver: yupResolver(chatsfilterSchema),
  });

  useEffect(() => {
    if (chatsFilters) {
      methods.reset({
        from: chatsFilters.updatedAt.from ?? '',
        to: chatsFilters.updatedAt.to ?? '',
      });
    }
  }, [chatsFilters, methods]);

  const filterHandeler = (values: ChatsFilterFormType) => {
    dispatch(setChatsDate({ from: values.from ?? '', to: values.to ?? '' }));
    handleClose();
  };

  const resetFilterHandler = () => {
    dispatch(resetChatsFilters());
    handleClose();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(filterHandeler)}>
        <h1 className="mb-4 text-center text-subtitle font-bold text-warning-500">
          Filter Chats
        </h1>

        <div className="mb-4 rounded-lg border-2 border-warning-400 bg-gray-50 p-3 shadow-md">
          <div>
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

export default FilterChats;
