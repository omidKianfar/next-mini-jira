import { Dispatch, SetStateAction, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { updateFirestoreUser } from '@/src/libs/auth/update-user';
import ButtonFreeClass from '@/src/components/atom/buttons-component/button-free-class';
import { MyUserType } from '@/src/types/global';
import ButtonBack from '@/src/components/atom/buttons-component/button-back';

interface Step2Props {
  user: MyUserType | null;
  setUser: Dispatch<SetStateAction<MyUserType | null>>;
  setStep: Dispatch<SetStateAction<number>>;
  handleClose: () => void;
}
const Step2 = ({ user, setUser, setStep, handleClose }: Step2Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const toggleActive = async () => {
    setLoading(true);

    {
      try {
        await updateFirestoreUser(user?.userId as string, {
          isActive: !user?.isActive,
        });

        setUser(null);
        handleClose();

        enqueueSnackbar(
          `Change status user ${user?.userName ? user.userName : user?.email} to ${user?.isActive ? 'Deactive' : 'Active'}`,
          {
            variant: `${user?.isActive ? 'warning' : 'success'}`,
          }
        );
      } catch (error: any) {
        enqueueSnackbar(`Error: ${error.message}. Please try again.`, {
          variant: 'error',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-2">
      <div className="mb-4">
        <ButtonBack onClick={() => setStep(1)} />
      </div>

      <h1 className="mb-4 break-words text-body font-bold text-gray-700">
        Are you shure to change user status
      </h1>

      <div className="prose prose-sm mb-6 mt-4 max-w-none break-words rounded-xl border border-gray-100 bg-gray-50 p-4 text-bodySm leading-relaxed text-gray-600">
        <p>
          {user?.userName ? user.userName : user?.email} is{' '}
          {user?.isActive ? 'Active' : 'Deactive'}
        </p>
      </div>

      <div className="flex flex-wrap-reverse items-center justify-end gap-3 lg:justify-center">
        <ButtonFreeClass
          onClick={() => setStep(1)}
          disable={loading}
          className="w-full rounded-sm border border-gray-200 bg-white py-2 text-label font-semibold text-gray-600 transition-all duration-200 hover:bg-gray-50 lg:w-[150px]"
        >
          Cancel
        </ButtonFreeClass>

        <ButtonFreeClass
          onClick={toggleActive}
          isLoading={loading}
          disable={loading}
          className={`w-full rounded-sm border py-2 text-label font-semibold shadow-sm transition-all duration-200 lg:w-[150px] ${`border-2 bg-white py-2 hover:text-white ${!user?.isActive ? 'border-success-500 text-success-500 hover:bg-success-500' : 'border-warning-500 text-warning-500 hover:bg-warning-500'}`}`}
        >
          {user?.isActive ? 'Deactive user' : 'Active user'}
        </ButtonFreeClass>
      </div>
    </div>
  );
};

export default Step2;
