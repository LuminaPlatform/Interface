import { getBrowserCookie } from "@/utils";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getBrowserCookie("access_token")}`
  }
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  }
);
