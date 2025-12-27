"use client";

import { useRouter } from "next/navigation";

// routes
import { routes } from "@/src/helper/routes/routes";

export const useNavigation = () => {
  // hooks
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
    support: () => router.push(routes.dashboard.support),
    taskDetail: (taskId: string) =>
      router.push(routes.dashboard.taskDetail(taskId)),
    adminDashboard: () => router.push(routes.admin.dashboard),
    adminProfile: () => router.push(routes.admin.profile),
    adminSupport: () => router.push(routes.admin.support),
    adminSupportChat: (chatId: string) =>
      router.push(routes.admin.supportChat(chatId)),
    adminUserDetail: (userId: string) =>
      router.push(routes.admin.userDetail(userId)),
  };
};
