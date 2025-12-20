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
    taskDetail: (taskId: string) => `/dashboard/task-detail?taskId=${taskId}`,
  },
  admin: {
    dashboard: "/admin/dashboard",
    profile: "/admin/profile",
  },
} as const;
