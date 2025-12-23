"use client";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useSearchParams } from "next/navigation";

// ui
import ButtonBack from "@/src/components/atom/button/button-back";
import MyImage from "@/src/components/atom/image";
import PageLoading from "@/src/components/organisms/page-loading";

// hooks
import { useNavigation } from "@/src/hooks/navigation";

// firestore
import { findFirestoreUserById } from "@/src/lib/auth/find-user-by-userId";

// type
import { MyUserType } from "@/src/types/global";

const AdminUserDetailComponent = () => {
  // hooks
  const navigation = useNavigation();

  const params = useSearchParams();
  const userId = params.get("userId");

  // date
  const now = dayjs();

  // states
  const [user, setUser] = useState<MyUserType | null>(null);

  // functions
  useEffect(() => {
    if (!userId) return;

    const userFetcher = async () => {
      try {
        const result = await findFirestoreUserById(userId);

        setUser(result);
      } catch (error: any) {
        console.log("Error:", error);

        enqueueSnackbar(`Error: ${error?.message || error}`, {
          variant: "error",
        });
      }
    };

    userFetcher();
  }, [userId]);

  const payment = user?.payment;

  const hasActivePayment = Boolean(
    payment?.endAt && now.isBefore(payment.endAt),
  );

  const onBack = () => {
    navigation.adminDashboard();
  };

  // ui
  if (!user) return <PageLoading />;

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="w-[90vw] rounded-xl border-2 border-warning-500 p-4 shadow-md lg:w-[500px]">
        <div className="mb-4 flex items-center justify-start">
          <ButtonBack onClick={onBack} />
        </div>

        <div className="text-center">
          <p className="mb-6 text-title font-bold text-warning-500">
            User Detail{" "}
          </p>

          <div className="flex flex-col items-start justify-start rounded-sm border border-dashed border-gray-400 bg-gray-200 p-4 shadow-md">
            <div className="mb-4 flex w-full items-center justify-center overflow-hidden">
              {user?.photo ? (
                <MyImage
                  src={user?.photo as string}
                  alt=""
                  fill
                  className="rounded-full object-cover"
                  wrapperClass="relative h-[100px] w-[100px] rounded-full border-2 border-primary-500 "
                />
              ) : (
                <div className="h-[80px] w-[80px] rounded-full border-2 border-primary-500 bg-gray-200"></div>
              )}
            </div>

            <p className="mb-4 text-body font-semibold capitalize text-primary-600">
              <span className="font-bold text-black">Username:</span>{" "}
              {user.userName}
            </p>

            <p className="mb-4 text-body font-semibold capitalize text-primary-600">
              <span className="font-bold text-black">Email:</span> {user.email}
            </p>

            <p className="mb-4 text-body font-semibold capitalize text-primary-600">
              <span className="font-bold text-black">Birthday:</span>{" "}
              {dayjs(user.birthday).format("MM-DD-YYYY")}
            </p>

            <p className="mb-4 text-body font-semibold capitalize text-primary-600">
              <span className="font-bold text-black">Status:</span>{" "}
              <span
                className={`${user.isActive ? "text-success-500" : "text-warning-500"}`}
              >
                {user.isActive ? "Active" : "Deactive"}
              </span>
            </p>

            <p className="mb-4 text-body font-semibold capitalize text-primary-600">
              <span className="font-bold text-black">Created At:</span>{" "}
              {dayjs(user.createdAt).format("MM-DD-YYYY")}
            </p>

            <hr className="mb-4 w-full border border-dashed border-gray-300" />

            {hasActivePayment && (
              <>
                <p className="mb-4 text-body font-semibold capitalize text-primary-600">
                  <span className="font-bold text-black">Plan Type:</span>{" "}
                  {user.payment.planType}
                </p>

                <p className="text-body font-semibold capitalize text-primary-600">
                  <span className="font-bold text-black">End At:</span>{" "}
                  {dayjs(user.payment.endAt).format("MM-DD-YYYY")}
                </p>
              </>
            )}

            {user.payment.freeTrialEnabled && (
              <>
                <p className="text-body font-semibold capitalize text-primary-600">
                  <span className="font-bold text-black">Terial Mode:</span>{" "}
                  True
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetailComponent;
