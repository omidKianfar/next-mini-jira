'use client';

import {
  ButtonNext,
  InputField,
  SelectField,
  TextareaFiled,
} from '../../../imports';
import { columns } from './data';
import { AddTaskProps } from '../../../type';

const AddTaskFormComponent = ({
  handleClose,
  setNumber,
  loading,
}: AddTaskProps) => {
  return (
    <div>
      <h1 className="mb-4 text-center text-subtitle font-bold text-warning-500">
        Create Task
      </h1>

      <div className="mb-4 rounded-lg border-2 border-warning-400 bg-gray-50 p-3 shadow-md">
        <div>
          <SelectField name="tag" options={columns} label={'Tag'} />

          <div className="my-2">
            <InputField
              name="title"
              label="Title"
              placeholder="Enter your title"
              autoFocus
            />
          </div>

          <TextareaFiled
            name="description"
            label="Description"
            placeholder="Enter your description"
          />

          <ButtonNext onClick={() => setNumber(1)}>Upload</ButtonNext>
        </div>
      </div>

      <div className="mt-4 flex justify-center lg:justify-end">
        <ButtonNext onClick={handleClose} className="mr-4">
          Cancel
        </ButtonNext>

        <ButtonNext type="submit" isLoading={loading}>
          Create
        </ButtonNext>
      </div>
    </div>
  );
};

export default AddTaskFormComponent;
