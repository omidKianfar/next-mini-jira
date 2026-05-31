import { stringSlicer } from '@/src/utils/string-slicer';
import ButtonFreeClass from '../../atom/buttons-component/button-free-class';

interface ModalComponentProps {
  handleClose: () => void;
  clickHandler: () => void;
  isDelete?: boolean;
  title: string;
  description?: string;
}

const ModalComponent = ({
  handleClose,
  isDelete,
  clickHandler,
  title,
  description,
}: ModalComponentProps) => {
  return (
    <div>
      <h1 className="mb-4 mt-4 break-words font-semibold text-warning-500">
        {stringSlicer({ string: title as string, slice: 50 })}
      </h1>

      {description && !isDelete && (
        <p className="text-bodysm mt-4 break-words rounded-lg bg-gray-50 p-4 shadow-md">
          {description}
        </p>
      )}

      {description && isDelete && (
        <div
          className="prose prose-sm mt-4 break-words rounded-lg bg-gray-50 p-2 text-body capitalize text-primary-500 shadow-md"
          dangerouslySetInnerHTML={{
            __html: stringSlicer({ string: description as string, slice: 100 }),
          }}
        />
      )}

      <div className="mt-4 flex justify-center gap-4 lg:justify-end">
        <ButtonFreeClass
          onClick={handleClose}
          className="w-[150px] rounded-sm border-2 border-primary-500 bg-white py-2 text-body text-primary-500 hover:bg-primary-500 hover:text-white"
        >
          Cancel
        </ButtonFreeClass>

        <ButtonFreeClass
          onClick={clickHandler}
          className="w-[150px] rounded-sm border-2 border-warning-500 bg-white py-2 text-body text-warning-500 hover:bg-warning-500 hover:text-white"
        >
          {isDelete ? 'Delete' : 'Back'}
        </ButtonFreeClass>
      </div>
    </div>
  );
};

export default ModalComponent;
