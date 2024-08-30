import { ACCESS_TOKEN_COOKIE_KEY } from "@/constant";
import axios from "axios";
import { getCookie } from "cookies-next";

export const axiosClient = axios.create({
  baseURL: process.env.production
    ? process.env.NEXT_PUBLIC_BASE_API_URL
    : process.env.NEXT_PUBLIC_DEV_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
    ...(getCookie(ACCESS_TOKEN_COOKIE_KEY) && {
      Authorization: `Bearer ${getCookie(ACCESS_TOKEN_COOKIE_KEY)}`
    })
  }
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  }
);
