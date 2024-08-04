import { getUserInformation } from "@/api";
import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constant";
import { UserProfileProvider } from "@/modules/profile/context";
import { Index } from "@/modules/profile/pages/Index";
import { GetServerSidePropsContext } from "next";

interface ProfileProps {
  // TODO should fixed type
  user: any;
  wallet: any;
  activities: any;
  userProjectsCategories: any;
  followers: any;
  followings: any;
}
const Profile = ({
  user,
  wallet,
  activities,
  userProjectsCategories,
  followers,
  followings,
}: ProfileProps) => {
  return (
    <UserProfileProvider
      data={{
        user,
        wallet,
        activities,
        userProjectsCategories,
        followers,
        followings,
      }}
    >
      <Index />
    </UserProfileProvider>
  );
};
export default Profile;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const params = ctx.params;
  const userId = params.userId as string;
  const accessToken = ctx?.req?.cookies?.[ACCESS_TOKEN_COOKIE_KEY] ?? undefined;

  const userBaseInfo = accessToken
    ? await axiosClient.get(apiKeys.auth.isAuthorized, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    : null;
  const selfUserData = (await userBaseInfo?.data) ?? null;
  const fetchPlan = await axiosClient
    .post(apiKeys["fetch"], {
      0: {
        model: "Review",
        model_id: "None",
        orders: [],
        graph: {
          fetch_fields: [
            {
              name: "*",
            },
            {
              name: "project",
              graph: {
                fetch_fields: [
                  {
                    name: "*",
                  },
                ],
              },
            },
            {
              name: "files",
              graph: {
                fetch_fields: [
                  {
                    name: "*",
                  },
                ],
              },
            },
            {
              name: "user",
              graph: {
                fetch_fields: [
                  {
                    name: "display_name",
                  },
                  {
                    name: "id",
                  },
                  {
                    name: "profile_id",
                  },
                ],
              },
            },
          ],
        },
        condition: {
          field: "user_id",
          operator: "EQ",
          value: userId,
          __type__: "SimpleFetchCondition",
        },
      },
    })
    .then((response) => response.data);

  const userActivities = await fetchPlan[0];
  const userProfileData = await getUserInformation(userId);

  if (!!selfUserData) {
  }

  const followers = await axiosClient
    .post(apiKeys.fetch, {
      0: {
        model: "User.followers",
        model_id: userId,
        orders: [],
        graph: {
          fetch_fields: [
            {
              name: "*",
            },
          ],
        },
      },
    })
    .then((res) => {
      return res.data[0];
    });
  const followings = await axiosClient
    .post(apiKeys.fetch, {
      0: {
        model: "User.following",
        model_id: userId,
        orders: [],
        graph: {
          fetch_fields: [
            {
              name: "*",
            },
          ],
        },
      },
    })
    .then((res) => {
      return res.data[0];
    });
  const userProjectsCategories = await axiosClient
    .post(apiKeys.fetch, {
      0: {
        model: "User.interested_categories",
        model_id: userId,
        orders: [],
        graph: {
          fetch_fields: [
            {
              name: "*",
            },
          ],
        },
      },
    })
    .then((res) => res.data[0]);
  if (!userProfileData) {
    return {
      notFound: true,
    };
  }
  try {
    return {
      props: {
        user: userProfileData[0][0],
        wallet: userProfileData[1]?.[0] ?? null,
        activities: userActivities,
        userProjectsCategories,
        followers,
        followings,
      },
    };
  } catch (error: any) {
    console.log(error);
    return {
      props: {
        user: userProfileData[0][0],
        wallet: userProfileData[1]?.[0] ?? null,
        activities: userActivities,
        userProjectsCategories,
        followers,
        followings,
      },
    };
  }
};
