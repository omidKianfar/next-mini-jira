import { ModalComponentProps } from '../type';
import { ButtonNext, stringSlicer } from '../imports';

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
        <p className="mt-4 break-words rounded-lg bg-gray-100 p-2 text-body capitalize text-blue-500 shadow-md">
          {stringSlicer({ string: description as string, slice: 100 })}
        </p>
      )}

      {description && isDelete && (
        <div
          className="mt-4 break-words rounded-lg bg-gray-100 p-2 text-body capitalize text-blue-500 shadow-md"
          dangerouslySetInnerHTML={{
            __html: stringSlicer({ string: description as string, slice: 100 }),
          }}
        />
      )}

      <div className="mt-4 flex justify-center gap-4 lg:justify-end">
        <ButtonNext onClick={handleClose}>Cancel</ButtonNext>

        <ButtonNext onClick={clickHandler}>
          {isDelete ? 'Delete' : 'Back'}
        </ButtonNext>
      </div>
    </div>
  );
};

export default ModalComponent;
