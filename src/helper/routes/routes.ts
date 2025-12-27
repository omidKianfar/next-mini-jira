export const routes = {
  signin: "/signin",
  signup: "/signup",
  paymentSuccess: "/payment-success",
  paymentFailed: "/payment-failed",
  activePage: "/active-page",
  api: {
    createStripCheckout: "/api/create-strip-checkout",
    getStripWithSessionId: "/api/get-strip-with-session-id",
  },
  dashboard: {
    dashboard: "/dashboard",
    profile: "/dashboard/profile",
    changePassword: "/dashboard/profile/password",
    payment: "/dashboard/payment",
    support: "/dashboard/support",
    taskDetail: (taskId: string) => `/dashboard/task-detail?taskId=${taskId}`,
  },
  admin: {
    dashboard: "/admin/dashboard",
    userDetail: (userId: string) =>
      `/admin/dashboard/user-detail?userId=${userId}`,
    profile: "/admin/profile",
    support: "/admin/support",
    supportChat: (chatId: string) => `/admin/support/chat?chatId=${chatId}`,
  },
} as const;
