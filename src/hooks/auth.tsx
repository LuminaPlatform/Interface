import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constant";
import { ApiErrorType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useCustomToast, useDispatchAuthorization } from "./bases";

type UseEmailSignUpInputs = {
  email: string;
  password: string;
};
export const useEmailSignUp = () => {
  return useMutation<
    { data: string },
    AxiosError<{ error_message: string; error_detail: string }>,
    UseEmailSignUpInputs
  >({
    mutationFn: ({ email, password }) =>
      axiosClient.post<any, { data: string }, UseEmailSignUpInputs>(
        apiKeys.auth.signup.email,
        { email, password }
      )
  });
};

type UseEmailLoginInputs = {
  username: string;
  password: string;
};
export const useEmailLogin = () => {
  return useMutation<
    { data: { access_token: string } },
    AxiosError<ApiErrorType>,
    UseEmailLoginInputs
  >({
    mutationFn: ({ username, password }) => {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      return axios.post<any, { data: { access_token: string } }>(
        `${
          process.env.production
            ? process.env.NEXT_PUBLIC_BASE_API_URL
            : process.env.NEXT_PUBLIC_DEV_BASE_API_URL
        }${apiKeys.auth.login.email}`,
        formData
      );
    }
  });
};

type UseOTPInputs = {
  email: string;
  code: string;
};
export const useOTPVerification = () => {
  return useMutation<{ data: string }, AxiosError<ApiErrorType>, UseOTPInputs>({
    mutationFn: ({ email, code }) =>
      axiosClient.post<any, { data: string }, UseOTPInputs>(apiKeys.auth.otp, {
        email,
        code
      })
  });
};

export const usePlatformLogin = (callback: () => void) => {
  const [authorizationCode, setAuthorizationCode] = useState(undefined);
  const toast = useCustomToast();
  const dispatchAuthorization = useDispatchAuthorization();

  useEffect(() => {
    if (authorizationCode) {
      axiosClient
        .get(apiKeys.auth.login.google.cb, {
          params: {
            code: authorizationCode
          }
        })
        .then((res) => {
          setCookie(ACCESS_TOKEN_COOKIE_KEY, res.data.access_token);
          axiosClient
            .get(apiKeys.auth.isAuthorized, {
              headers: {
                Authorization: `Bearer ${res.data.access_token}`
              }
            })
            .then((userDataResponse) => userDataResponse.data)
            .then((user) => {
              dispatchAuthorization(user);
              callback();
              return toast({
                description: "You are logged in",
                status: "success"
              });
            });
        });
    }
  }, [authorizationCode]);
  return (url: string) =>
    axiosClient.get(url).then((response) => {
      const openedWindow = window.open(
        response.data.url,
        "_blank",
        "width=500,height=600"
      );
      const pollTimer = window.setInterval(function () {
        try {
          if (openedWindow.location.href.includes("callback")) {
            window.clearInterval(pollTimer);
            const urlParams = new URLSearchParams(openedWindow.location.search);
            setAuthorizationCode(urlParams.get("code"));
            openedWindow.close();
          }
        } catch (e) {
          throw new Error("error");
        }
      }, 1000);
    });
};
