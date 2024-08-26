export const apiKeys = {
  auth: {
    password: {
      change: "/auth/password/change"
    },
    login: {
      google: {
        req: "/auth/login/google/request",
        cb: "/auth/login/google"
      },
      twitter: {
        req: "/auth/authorize/twitter/request",
        cb: "/auth/authorize/twitter"
      },
      email: "/auth/login/email",
      wallet: "/auth/login/wallet"
    },
    signup: {
      google: "",
      twitter: "",
      email: "/auth/signup/email/request"
    },
    isAuthorized: "/auth/me",
    otp: "/auth/signup/email/verify",
    wallet: {
      add: "/auth/wallet/add"
    },

    resetPassword: {
      verify: "/auth/password/reset/verify",
      otp: "/auth/password/reset/request"
    }
  },
  fetch: "/read/fetch",
  viewpoint: "/read/viewpoints",
  create: "/create",
  update: "/update",
  distribute: "/distribution/distribute",
  getSignMessage: "/auth/wallet/get-message",
  file: {
    file: "/file/file",
    link: "/file/link"
  },
  relation: {
    remove: "/remove-relations",
    add: "/add-relations"
  }
};
