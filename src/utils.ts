import { getCookie as getNextCookie } from "cookies-next";
import { apiKeys } from "./api/apiKeys";
import { axiosClient } from "./config/axios";
import { ACCESS_TOKEN_COOKIE_KEY, TWITTER_INFO } from "./constant";

export const textTruncator = (text: string) => {
  const startText = text.substring(0, 4);
  const endText = text.substring(text.length - 4);

  if (text.length > 8) {
    return `${startText}...${endText}`;
  }
  return text;
};

export const getCookie = (cookie: string, name: string): string =>
  cookie
    ?.split(";")
    .find((row) => row.trim().startsWith(name))
    ?.split("=")[1]
    .trim();

export const getBrowserCookie = (name: string): string => {
  if (typeof document === "undefined" || !document.cookie) return undefined;
  return getCookie(document.cookie, name);
};

export const generateImageSrc = (id: string | number) => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASE_FILE_URL
      : process.env.NEXT_PUBLIC_DEV_BASE_FILE_URL;
  return `${baseUrl}/${id}`;
};

export const handleTwitterLogin = async () => {
  return axiosClient
    .get(apiKeys.auth.login.twitter.req, {
      headers: {
        Authorization: `Bearer ${getNextCookie(ACCESS_TOKEN_COOKIE_KEY)}`
      }
    })
    .then((resp) => {
      window.open(resp.data.url, "_blank", "width=500,height=600");
    });
};

export const handleStorageChange = (dispatch: any, globalUser: any) => {
  const twitterInfo = localStorage.getItem(TWITTER_INFO);
  if (twitterInfo) {
    const { ...data } = JSON.parse(localStorage.getItem(TWITTER_INFO));
    dispatch({
      ...globalUser,
      user: { ...globalUser?.user, x_username: data?.data?.username },
      twitter: data
    });
    localStorage.removeItem(TWITTER_INFO);
  }
};
