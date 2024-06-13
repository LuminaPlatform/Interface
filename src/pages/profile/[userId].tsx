import { getUserInformation } from "@/api";
import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constant";
import { UserProfileProvider } from "@/modules/profile/context";
import { Index } from "@/modules/profile/pages/Index";

interface ProfileProps {
  isSelfUser: boolean;
  // TODO should fixed type
  user: any;
  wallet: any;
  activities: any;
}
const Profile = ({ user, isSelfUser, wallet, activities }: ProfileProps) => {
  console.log({ user, wallet });

  return (
    <UserProfileProvider data={{ isSelfUser, user, wallet, activities }}>
      <Index />
    </UserProfileProvider>
  );
};
export default Profile;

export const getServerSideProps = async (ctx) => {
  const { userId } = ctx.params;
  const accessToken = ctx?.req?.cookies?.[ACCESS_TOKEN_COOKIE_KEY] ?? undefined;

  const userActivities = await axiosClient
    .post(apiKeys["fetch"], {
      0: {
        model: "Review",
        model_id: "None",
        limit: 100,
        orders: [],
        fetch_graph: {
          flex_fields: [
            {
              name: "*",
            },
            {
              name: "project",
              fetch_graph: {
                flex_fields: [
                  {
                    name: "*",
                  },
                ],
              },
            },
            {
              name: "user",
              fetch_graph: {
                flex_fields: [
                  {
                    name: "display_name",
                  },
                  {
                    name: "id",
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
          __type__: "SimpleSearchCondition",
        },
      },
    })
    .then((response) => response.data[0]);
  const userProfileData = await getUserInformation(userId);
  if (!userProfileData) {
    return {
      notFound: true,
    };
  }
  try {
    const response = await axiosClient.get(apiKeys.auth.isAuthorized, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const selfUserData = response.data;

    console.log(selfUserData?.id, +userId);

    return {
      props: {
        isSelfUser: selfUserData?.id === +userId,
        user: userProfileData[0][0],
        wallet: userProfileData[1]?.[0] ?? null,
        activities: userActivities,
      },
    };
  } catch (error) {
    return {
      props: {
        isSelfUser: false,
        user: userProfileData[0][0],
        wallet: userProfileData[1]?.[0] ?? null,
        activities: userActivities,
      },
    };
  }
};
