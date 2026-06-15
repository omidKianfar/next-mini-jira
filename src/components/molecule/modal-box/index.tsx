'use client';

import { stringSlicer } from '@/src/utils/string-slicer';
import ButtonFreeClass from '../../atom/buttons-component/button-free-class';
import { MyUserType } from '@/src/types/global';

interface ModalComponentProps {
  handleClose: () => void;
  clickHandler: () => void;
  isDelete?: boolean;
  title: string;
  description?: string;
  isActive?: boolean;
  user?: MyUserType | null;
  loading?: boolean;
}

const ModalBoxComponent = ({
  handleClose,
  isDelete,
  clickHandler,
  title,
  description,
  isActive,
  user,
  loading,
}: ModalComponentProps) => {
  if (!description || !title) return null;

  return (
    <div className="p-2">
      <h1 className="mb-4 break-words text-body font-bold text-gray-700">
        {stringSlicer({ string: title, slice: 50 })}
      </h1>

      <div
        className="prose prose-sm mb-6 mt-4 max-w-none break-words rounded-xl border border-gray-100 bg-gray-50 p-4 text-bodySm leading-relaxed text-gray-600"
        dangerouslySetInnerHTML={{ __html: description }}
      />

      <div className="flex flex-wrap-reverse items-center justify-end gap-3 lg:justify-center">
        <ButtonFreeClass
          disable={loading}
          onClick={handleClose}
          className="w-full rounded-sm border border-gray-200 bg-white py-2 text-label font-semibold text-gray-600 transition-all duration-200 hover:bg-gray-50 lg:w-[150px]"
        >
          Cancel
        </ButtonFreeClass>

        <ButtonFreeClass
          isLoading={loading}
          disable={loading}
          onClick={clickHandler}
          className={`w-full rounded-sm border py-2 text-label font-semibold shadow-sm transition-all duration-200 lg:w-[150px] ${
            isDelete
              ? 'border-error-500 bg-error-500 text-white hover:bg-white hover:text-error-500'
              : isActive
                ? `border-2 bg-white py-2 hover:text-white ${!user?.isActive ? 'border-success-500 text-success-500 hover:bg-success-500' : 'border-warning-500 text-warning-500 hover:bg-warning-500'}`
                : 'border-warning-500 bg-warning-500 text-white hover:bg-white hover:text-warning-500'
          }`}
        >
          {isDelete
            ? 'Delete'
            : isActive && user?.isActive
              ? 'Deactive user'
              : isActive && !user?.isActive
                ? 'Active user'
                : 'Back'}
        </ButtonFreeClass>
      </div>
    </div>
  );
};

export default ModalBoxComponent;
