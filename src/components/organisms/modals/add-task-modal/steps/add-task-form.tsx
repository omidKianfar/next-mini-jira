'use client';

import SelectField from '@/src/components/molecule/RHF-controllers-components/select-field';
import InputField from '@/src/components/molecule/RHF-controllers-components/input-field';
import TextareaFiled from '@/src/components/molecule/RHF-controllers-components/textarea-field';
import { columns } from './data';
import { AddTaskProps } from '../type';
import MyIcon from '@/src/components/atom/icon-components';
import ButtonFreeClass from '@/src/components/atom/buttons-component/button-free-class';

const AddTaskFormComponent = ({
  handleClose,
  setNumber,
  loading,
}: AddTaskProps) => {
  return (
    <div className="flex flex-col gap-4 p-1">
      <div>
        <h1 className="mb-2 text-subtitle font-bold text-gray-700">
          Create Task
        </h1>
        <p className="text-label text-gray-500">
          Fill in the details to add a new task to your board.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <SelectField name="tag" options={columns} label="Tag" />

        <InputField
          name="title"
          label="Title"
          placeholder="Enter your title"
          autoFocus
        />

        <TextareaFiled
          name="description"
          label="Description"
          placeholder="Enter your description"
        />

        <ButtonFreeClass
          onClick={() => setNumber(1)}
          className="w-full justify-start rounded-sm border-dashed border-gray-400 bg-gray-50 py-1 text-gray-600 hover:bg-gray-100"
          icon={<MyIcon icon="upload" className="text-h4" />}
        >
          Add Attachment
        </ButtonFreeClass>
      </div>

      <div className="mt-4 flex flex-wrap-reverse items-center justify-end gap-3 lg:justify-center lg:gap-8">
        <ButtonFreeClass
          onClick={handleClose}
          className="w-full rounded-sm border border-gray-200 bg-white py-2 text-label font-semibold text-gray-600 transition-all duration-200 hover:bg-gray-50 lg:w-[120px]"
        >
          Cancel
        </ButtonFreeClass>

        <ButtonFreeClass
          type="submit"
          isLoading={loading}
          className={`hover:text-warning-500' w-full rounded-sm border border-warning-500 bg-warning-500 py-2 text-label font-semibold text-white shadow-sm transition-all duration-200 hover:bg-white hover:text-warning-500 lg:w-[120px]`}
        >
          Create
        </ButtonFreeClass>
      </div>
    </div>
  );
};

export default AddTaskFormComponent;
