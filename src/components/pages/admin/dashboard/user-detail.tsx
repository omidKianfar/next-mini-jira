"use client";

import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";

// ui
import ButtonBack from "@/src/components/atom/button/button-back";
import MyImage from "@/src/components/atom/image";
import PageLoading from "@/src/components/organisms/page-loading";
import ButtonNext from "@/src/components/atom/button/button-next";

// hooks
import { useNavigation } from "@/src/hooks/navigation";

// type
import { useUserListenerById } from "@/src/hooks/users/use-user-listener-by-id";

// firestore
import { updateFirestoreUser } from "@/src/lib/auth/update-user";

const AdminUserDetailComponent = () => {
  // hooks
  const navigation = useNavigation();
  const params = useSearchParams();
  const userId = params.get("userId");

  const { user, loading } = useUserListenerById(userId);

  // date
  const now = dayjs();

  // payment status
  const payment = user?.payment;

  const hasActivePayment = Boolean(
    payment?.endAt && now.isBefore(payment.endAt),
  );

  // functions
  const onBack = () => {
    navigation.adminDashboard();
  };

  const toggleActive = async () => {
    await updateFirestoreUser(userId as string, {
      isActive: !user?.isActive,
    });
  };

  // ui
  if (loading || !user) return <PageLoading />;

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="w-[90vw] rounded-xl border-2 border-warning-500 bg-white p-4 pb-2 shadow-md lg:w-[500px]">
        <div className="flex items-center justify-start">
          <ButtonBack onClick={onBack} />
        </div>

        <div className="text-center">
          <p className="mb-4 text-title font-bold text-warning-500">
            User Detail
          </p>

          <div className="mb-4 flex flex-col items-start justify-start rounded-sm border border-dashed border-gray-400 bg-gray-200 p-4 shadow-md">
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

            <p className="mb-4 text-body font-semibold text-primary-600">
              <span className="font-bold text-black">Username:</span>{" "}
              {user.userName}
            </p>

            <p className="mb-4 text-body font-semibold text-primary-600">
              <span className="font-bold text-black">Email:</span> {user.email}
            </p>

            <p className="mb-4 text-body font-semibold text-primary-600">
              <span className="font-bold text-black">Birthday:</span>{" "}
              {dayjs(user.birthday).format("MM-DD-YYYY")}
            </p>

            <p className="mb-4 text-body font-semibold text-primary-600">
              <span className="font-bold text-black">Status:</span>{" "}
              <span
                className={`${user.isActive ? "text-success-500" : "text-warning-500"}`}
              >
                {user.isActive ? "Active" : "Deactive"}
              </span>
            </p>

            <p className="mb-4 text-body font-semibold text-primary-600">
              <span className="font-bold text-black">Created At:</span>{" "}
              {dayjs(user.createdAt).format("MM-DD-YYYY")}
            </p>

            <hr className="mb-4 w-full border border-dashed border-gray-300" />

            {hasActivePayment && (
              <>
                <p className="mb-4 text-body font-semibold text-primary-600">
                  <span className="font-bold text-black">Plan Type:</span>{" "}
                  {user.payment.planType}
                </p>

                <p className="text-body font-semibold text-primary-600">
                  <span className="font-bold text-black">End At:</span>{" "}
                  {dayjs(user.payment.endAt).format("MM-DD-YYYY")}
                </p>
              </>
            )}

            {user.payment.freeTrialEnabled && (
              <>
                <p className="text-body font-semibold text-primary-600">
                  <span className="font-bold text-black">Trial Mode:</span> True
                </p>
              </>
            )}
          </div>

          <div className="flex w-full items-center justify-center">
            <ButtonNext onClick={toggleActive}>
              {user.isActive ? "Deactivated User" : "Activated User"}
            </ButtonNext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetailComponent;
