export const apiKeys = {
  auth: {
    login: {
      google: {
        req: "/auth/login/google/request",
        cb: "/auth/login/google",
      },
      twitter: "",
      email: "/auth/login/email",
    },
    signup: {
      google: "",
      twitter: "",
      email: "/auth/signup/email/request",
    },
    isAuthorized: "/auth/me",
    otp: "/auth/signup/email/verify",
    wallet: {
      add: "/auth/wallet/add",
    },

    resetPassword: {
      verify: "/auth/password/reset/verify",
      otp: "/auth/password/reset/request",
    },
  },
  fetch: "/read/fetch",
  viewpoint: "/read/viewpoints",
  create: "/create",
  update: "/update",
  distribute: "/distribution/distribute",
};
