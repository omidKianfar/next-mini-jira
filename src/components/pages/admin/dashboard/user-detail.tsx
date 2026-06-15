'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { useAuth } from '@/src/hooks/auth/use-auth';
import { useNavigation } from '@/src/hooks/navigation/use-navigation';
import { useUserListenerById } from '@/src/hooks/users/use-user-listener-by-id';
import { updateFirestoreUser } from '@/src/libs/auth/update-user';
import ButtonBack from '@/src/components/atom/buttons-component/button-back';
import MyImage from '@/src/components/atom/image-components';
import PageLoading from '@/src/components/common/page-loading';
import ButtonFreeClass from '@/src/components/atom/buttons-component/button-free-class';
import ModalContainer from '@/src/components/common/modal-container';
import ModalBoxComponent from '@/src/components/molecule/modal-box';

const AdminUserDetailComponent = () => {
  const navigation = useNavigation();
  const params = useSearchParams();
  const userId = params.get('userId');
  const { user: currentUser } = useAuth();

  const { user, loading: useLoading } = useUserListenerById(userId);

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const now = dayjs();

  const payment = user?.payment;

  const hasActivePayment = Boolean(
    payment?.endAt && now.isBefore(payment.endAt)
  );

  const onBack = () => {
    navigation.adminDashboard();
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const toggleActive = async () => {
    if (currentUser?.isGuest) {
      enqueueSnackbar(`You can't do it. you are a guest admin`, {
        variant: 'warning',
      });
    } else {
      setLoading(true);

      try {
        await updateFirestoreUser(user?.userId as string, {
          isActive: !user?.isActive,
        });

        handleCloseModal();
        enqueueSnackbar(
          `Change status user ${user?.userName ? user.userName : user?.email} to ${user?.isActive ? 'Deactive' : 'Active'}`,
          {
            variant: `${user?.isActive ? 'warning' : 'success'}`,
          }
        );
      } catch (error) {
        enqueueSnackbar(
          `Error: ${error?.message || error}. Please try again.`,
          {
            variant: 'error',
          }
        );
      } finally {
        setLoading(false);
      }
    }
  };

  if (useLoading || !user) return <PageLoading />;

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="w-[90vw] rounded-lg border border-gray-300 bg-white p-4 pb-2 shadow-md lg:w-[500px]">
        <div className="flex items-center justify-start">
          <ButtonBack onClick={onBack} />
        </div>

        <div className="text-center">
          <p className="mb-4 text-subtitle font-bold text-primary-500">
            User Detail
          </p>

          <div className="mb-4 flex flex-col items-start justify-start rounded-sm border border-gray-300 bg-gray-50 p-4 shadow-md">
            <div className="mb-4 flex w-full items-center justify-center overflow-hidden">
              {user?.photo ? (
                <MyImage
                  src={user.photo as string}
                  alt=""
                  fill
                  className="rounded-full object-cover"
                  wrapperClass="relative h-[100px] w-[100px] rounded-full border-2 border-primary-500 "
                />
              ) : (
                <div className="h-[100px] w-[100px] rounded-full border-2 border-primary-500 bg-gray-200"></div>
              )}
            </div>

            <p className="mb-4 text-body font-semibold text-gray-500">
              <span className="font-bold text-gray-800">Username:</span>{' '}
              {user.userName}
            </p>

            <hr className="mb-4 w-full border border-dashed border-gray-300" />

            <p className="mb-4 text-body font-semibold text-gray-500">
              <span className="font-bold text-gray-800">Email:</span>{' '}
              {user.email}
            </p>

            <hr className="mb-4 w-full border border-dashed border-gray-300" />

            <p className="mb-4 text-body font-semibold text-gray-500">
              <span className="font-bold text-gray-800">Birthday:</span>{' '}
              {dayjs(user.birthday).format('MM-DD-YYYY')}
            </p>

            <hr className="mb-4 w-full border border-dashed border-gray-300" />

            <p className="mb-4 text-body font-semibold text-gray-500">
              <span className="font-bold text-gray-800">Status:</span>{' '}
              <span
                className={`${user.isActive ? 'text-success-500' : 'text-warning-500'}`}
              >
                {user.isActive ? 'Active' : 'Deactive'}
              </span>
            </p>

            <hr className="mb-4 w-full border border-dashed border-gray-300" />

            <p className="text-body font-semibold text-gray-500">
              <span className="font-bold text-gray-800">Created At:</span>{' '}
              {dayjs(user.createdAt).format('MM-DD-YYYY')}
            </p>

            {(hasActivePayment || user.payment.freeTrialEnabled) && (
              <hr className="mb-4 mt-4 w-full border border-dashed border-gray-300" />
            )}

            {hasActivePayment && (
              <>
                <p className="mb-4 text-body font-semibold text-gray-500">
                  <span className="font-bold text-gray-800">Plan Type:</span>{' '}
                  {user.payment.planType}
                </p>

                <hr className="mb-4 w-full border border-dashed border-gray-300" />

                <p className="text-body font-semibold text-gray-500">
                  <span className="font-bold text-gray-800">End At:</span>{' '}
                  {dayjs(user.payment.endAt).format('MM-DD-YYYY')}
                </p>
              </>
            )}

            {user.payment.freeTrialEnabled && (
              <>
                <p className="text-body font-semibold text-gray-500">
                  <span className="font-bold text-gray-800">Trial Mode:</span>{' '}
                  True
                </p>
              </>
            )}
          </div>

          <div className="flex items-center justify-end">
            <ButtonFreeClass
              onClick={handleOpenModal}
              className={`w-full min-w-[140px] rounded-sm border-2 bg-white py-2 hover:text-white lg:w-[180px] ${user.isActive ? 'border-success-500 text-success-500 hover:bg-success-500' : 'border-warning-500 text-warning-500 hover:bg-warning-500'}`}
            >
              {user.isActive ? 'Deactivated User' : 'Activated User'}
            </ButtonFreeClass>
          </div>
        </div>
      </div>

      <ModalContainer open={open} handleClose={handleCloseModal}>
        <ModalBoxComponent
          handleClose={handleCloseModal}
          clickHandler={toggleActive}
          title={'Are you shure to change user status'}
          description={` ${user?.userName ? user.userName : user?.email} is ${user?.isActive ? 'Active' : 'Deactive'}`}
          isActive
          user={user}
          loading={loading}
        />
      </ModalContainer>
    </div>
  );
};

export default AdminUserDetailComponent;
