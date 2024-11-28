import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import { ACCESS_TOKEN_COOKIE_KEY, TWITTER_INFO } from "@/constant";
import { GetServerSidePropsContext } from "next";
import { useEffect } from "react";

interface CallbackProps {
  data: any;
}
const Callback = ({ data }: CallbackProps) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(TWITTER_INFO, JSON.stringify(data));
      window.close();
    }
  }, []);
  return <></>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { query } = ctx;
  const accessToken = ctx?.req?.cookies?.[ACCESS_TOKEN_COOKIE_KEY] ?? undefined;

  if (!query.code && !query.state) {
    return {
      redirect: {
        permanent: false,
        destination: "/projects"
      }
    };
  }

  const data = await axiosClient
    .get(
      `${apiKeys.auth.login.twitter.cb}?code=${query.code}&state=${query.state}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      throw new Error(e);
    });
  return {
    props: { data }
  };
};

export default Callback;
