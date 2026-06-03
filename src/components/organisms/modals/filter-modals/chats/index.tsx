'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from '@/src/store';
import {
  resetChatsFilters,
  setChatsDate,
} from '@/src/store/slices/chats/chats-filter';
import DateInputField from '@/src/components/molecule/RHF-controllers-components/date-input-field';
import { chatsfilterSchema } from './schema';
import { ModalProps } from '@/src/types/global';
import { ChatsFilterFormType } from './type';
import ButtonFreeClass from '@/src/components/atom/buttons-component/button-free-class';

const FilterChats = ({ handleClose }: Pick<ModalProps, 'handleClose'>) => {
  const dispatch = useDispatch();

  const chatsFilters = useSelector((state: RootState) => state?.chatsFilters);

  const methods = useForm<ChatsFilterFormType>({
    defaultValues: {
      from: chatsFilters?.updatedAt?.from ?? '',
      to: chatsFilters?.updatedAt?.to ?? '',
    },
    resolver: yupResolver(chatsfilterSchema),
  });

  useEffect(() => {
    if (chatsFilters) {
      methods.reset({
        from: chatsFilters?.updatedAt?.from ?? '',
        to: chatsFilters?.updatedAt?.to ?? '',
      });
    }
  }, [chatsFilters, methods]);

  const filterHandeler = (values: ChatsFilterFormType) => {
    dispatch(setChatsDate({ from: values?.from ?? '', to: values?.to ?? '' }));
    handleClose?.();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(filterHandeler)}
        className="flex flex-col gap-4 p-1"
      >
        <div>
          <h1 className="mb-2 text-subtitle font-bold text-primary-500">
            Filter Chats
          </h1>

          <p className="text-label text-gray-400">
            Refine your chat list by date range.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <DateInputField name="from" label="Start Time" />
          <DateInputField name="to" label="End Time" />
        </div>

        <div className="mt-4 flex flex-wrap-reverse items-center justify-end gap-3 lg:justify-center lg:gap-8">
          <ButtonFreeClass
            type="button"
            onClick={() => {
              dispatch(resetChatsFilters());
              handleClose?.();
            }}
            className="w-full rounded-sm border border-gray-200 bg-white py-2 text-label font-semibold text-gray-600 transition-all duration-200 hover:bg-gray-50 lg:w-[120px]"
          >
            Clear
          </ButtonFreeClass>

          <ButtonFreeClass
            type="submit"
            className={`hover:text-warning-500' w-full rounded-sm border border-warning-500 bg-warning-500 py-2 text-label font-semibold text-white shadow-sm transition-all duration-200 hover:bg-white hover:text-warning-500 lg:w-[120px]`}
          >
            Filter
          </ButtonFreeClass>
        </div>
      </form>
    </FormProvider>
  );
};

export default FilterChats;
