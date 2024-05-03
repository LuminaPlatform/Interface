import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import { ApiErrorType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

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
        apiKeys["auth"]["signup"]["email"],
        { email, password }
      ),
  });
};

type UseEmailLoginInputs = {
  username: string;
  password: string;
};
export const useEmailLogin = () => {
  return useMutation<
    { data: string },
    AxiosError<ApiErrorType>,
    UseEmailLoginInputs
  >({
    mutationFn: ({ username, password }) =>
      axiosClient.post<any, { data: string }, UseEmailLoginInputs>(
        apiKeys["auth"]["login"]["email"],
        { username, password }
      ),
  });
};

type UseOTPInputs = {
  email: string;
  code: string;
};
export const useOTPVerification = () => {
  return useMutation<{ data: string }, AxiosError<ApiErrorType>, UseOTPInputs>({
    mutationFn: ({ email, code }) =>
      axiosClient.post<any, { data: string }, UseOTPInputs>(
        apiKeys["auth"]["otp"],
        { email, code }
      ),
  });
};