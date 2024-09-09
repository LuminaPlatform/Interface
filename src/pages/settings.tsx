import { getUserInformation } from "@/api";
import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constant";
import {
  useAuthorization,
  useDispatchGlobalUserData,
  useGlobalUserData
} from "@/hooks/bases";
import { Index } from "@/modules/settings/page/Index";
import { GetServerSidePropsContext } from "next";
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
    1: wallet
  } = user;

  const router = useRouter();

  useEffect(() => {
    if (!userInfo && !!userBaseData) {
      dispatchUserInfo({
        user: userData,
        wallet,
        // TODO shoud get from api
        followers: [],
        followings: [],
        projectCategories: [],
        interestedExpertises: [],
        userRole: [],
        twitter: ""
      });
    } else if (!userBaseData) {
      router.replace("/projects");
    }
  }, [userBaseData]);
  return <Index />;
};

export default Settings;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const accessToken =
      ctx?.req?.cookies?.[ACCESS_TOKEN_COOKIE_KEY] ?? undefined;

    if (!accessToken) {
      return {
        redirect: {
          permanent: false,
          destination: "/projects"
        }
      };
    }
    const userBaseData = await axiosClient.get(apiKeys.auth.isAuthorized, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const userInterests = await axiosClient
      .post(
        apiKeys.fetch,
        {
          0: {
            model: "User.interested_expertises",
            model_id: userBaseData.data.id,
            orders: [],
            graph: {
              fetch_fields: [
                {
                  name: "*"
                }
              ]
            }
          }
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      .then((res) => res.data[0] ?? []);
    const userInformation = await getUserInformation(
      userBaseData.data.id,
      accessToken
    );

    if (!userInformation) {
      return {
        redirect: {
          permanent: false,
          destination: "/projects"
        }
      };
    }
    return {
      props: {
        user: { ...userInformation, interestedExpertises: userInterests }
      }
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/500",
        permanent: false
      }
    };
  }
};
