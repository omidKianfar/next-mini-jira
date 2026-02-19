// ui
import ButtonNext from '../../atom/buttons-component/button-next';
import { ModalComponentProps } from '../type';

const ModalComponent = ({
  handleClose,
  isDelete,
  clickHandler,
  title,
  description,
}: ModalComponentProps) => {
  return (
    <div>
      <h1 className="mb-4 text-subtitle font-semibold capitalize text-warning-500">
        {title}
      </h1>

      {description && (
        <p className="mt-4 break-words rounded-lg bg-gray-100 p-2 text-body capitalize text-blue-500 shadow-md">
          {description}
        </p>
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
