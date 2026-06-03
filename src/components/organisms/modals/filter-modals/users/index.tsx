'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from '@/src/store';
import {
  resetUserFilters,
  setActive,
  setUserDate,
} from '@/src/store/slices/users/users-filter';
import SelectField from '@/src/components/molecule/RHF-controllers-components/select-field';
import DateInputField from '@/src/components/molecule/RHF-controllers-components/date-input-field';
import ButtonFreeClass from '@/src/components/atom/buttons-component/button-free-class';
import { statusList } from '../data';
import { usersfilterSchema } from './schema';
import { ModalProps } from '@/src/types/global';
import { UsersFilterFormType } from './type';

const FilterUsers = ({ handleClose }: Pick<ModalProps, 'handleClose'>) => {
  const dispatch = useDispatch();
  const usersFilters = useSelector((state: RootState) => state?.usersFilters);

  const methods = useForm<UsersFilterFormType>({
    defaultValues: {
      status: usersFilters?.status ?? 'all',
      from: usersFilters?.createdAt?.from ?? '',
      to: usersFilters?.createdAt?.to ?? '',
    },
    resolver: yupResolver(usersfilterSchema),
  });

  useEffect(() => {
    if (usersFilters) {
      methods.reset({
        status: usersFilters?.status ?? 'all',
        from: usersFilters?.createdAt?.from ?? '',
        to: usersFilters?.createdAt?.to ?? '',
      });
    }
  }, [usersFilters, methods]);

  const filterHandler = (values: UsersFilterFormType) => {
    dispatch(setUserDate({ from: values.from ?? '', to: values.to ?? '' }));
    dispatch(setActive(values.status ?? 'all'));
    handleClose?.();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(filterHandler)}
        className="flex flex-col gap-4 p-1"
      >
        <div>
          <h1 className="mb-2 text-subtitle font-bold text-primary-500">
            Filter Users
          </h1>

          <p className="text-label text-gray-400">
            Filter the user list based on status or date.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <SelectField name="status" label="Status" options={statusList} />

          <div className="grid grid-cols-2 gap-4">
            <DateInputField name="from" label="Start Time" />
            <DateInputField name="to" label="End Time" />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap-reverse items-center justify-end gap-3 lg:justify-center lg:gap-8">
          <ButtonFreeClass
            type="button"
            onClick={() => {
              dispatch(resetUserFilters());
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

export default FilterUsers;
