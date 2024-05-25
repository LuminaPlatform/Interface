export const apiKeys = {
  auth: {
    login: {
      google: {
        req: "/auth/login/google/request",
        cb: "/auth/login/google",
      },
      twitter: "",
      email: "/auth/login/email",
      wallet: "",
    },
    signup: {
      google: "",
      twitter: "",
      email: "/auth/signup/email/request",
      wallet: "",
    },
    isAuthorized: "/auth/me",
    otp: "/auth/signup/email/verify",
  },
  read: {
    fetch: "/read/fetch",
    create: "/read/create",
  },
};
