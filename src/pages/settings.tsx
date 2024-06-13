import { getUserInformation } from "@/api";
import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constant";
import {
  useAuthorization,
  useDispatchGlobalUserData,
  useGlobalUserData,
} from "@/hooks/bases";
import { Index } from "@/modules/settings/page/Index";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface SettingsProps {
  user: any;
}
const Settings = ({ user }: SettingsProps) => {
  const userBaseData = useAuthorization();
  const userInfo = useGlobalUserData();
  const dispatchUserInfo = useDispatchGlobalUserData();
  const {
    0: [userData],
    1: wallet,
  } = user;
  console.log({ userData, wallet });

  const router = useRouter();

  useEffect(() => {
    if (!userInfo && !!userBaseData) {
      dispatchUserInfo({ user: userData, wallet });
    } else if (!userBaseData) {
      router.replace("/projects");
    }
  }, [userBaseData]);
  return <Index />;
};

export default Settings;

export const getServerSideProps = async (ctx) => {
  const accessToken = ctx?.req?.cookies?.[ACCESS_TOKEN_COOKIE_KEY] ?? undefined;
  if (!accessToken) {
    return {
      redirect: {
        permanent: false,
        destination: "/projects",
      },
    };
  }
  try {
    const userBaseData = await axiosClient.get(apiKeys.auth.isAuthorized, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userInformation = await getUserInformation(userBaseData.data.id);

    if (!userInformation) {
      return {
        redirect: {
          permanent: false,
          destination: "/projects",
        },
      };
    }
    return {
      props: { user: userInformation },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/projects",
      },
    };
  }
};
