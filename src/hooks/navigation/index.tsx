"use client";

import { useRouter } from "next/navigation";

// routes
import { routes } from "@/src/lib/route/routes";

export const useNavigation = () => {
  const router = useRouter();

  return {
    signin: () => router.push(routes.signin),
    signup: () => router.push(routes.signup),
    paymentSuccess: () => router.push(routes.paymentSuccess),
    paymentFailed: () => router.push(routes.paymentFailed),
    activePage: () => router.push(routes.activePage),
    getStrip: () => router.push(routes.api.getStripWithSessionId),
    dashboard: () => router.push(routes.dashboard.dashboard),
    profile: () => router.push(routes.dashboard.profile),
    changePassword: () => router.push(routes.dashboard.changePassword),
    payment: () => router.push(routes.dashboard.payment),
    taskDetail: (taskId: string) =>
      router.push(routes.dashboard.taskDetail(taskId)),
  };
};
