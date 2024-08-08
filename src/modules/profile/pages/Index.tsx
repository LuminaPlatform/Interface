import { VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuthorization, useGlobalUserData } from "@/hooks/bases";
import { useEffect } from "react";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";
import { useDispatchUserProfile, useUserProfile } from "../hooks";
import { UserActivities } from "../components/UserActivities";
import { InterestedProjects } from "../components/InterestedProjects";
import { UserInfo } from "../components/UserInfo";

export const Index = () => {
  const { userProjectsCategories } = useUserProfile();
  const { query } = useRouter();
  const selfUserData = useAuthorization();
  const globalUser = useGlobalUserData();

  const profileDispatch = useDispatchUserProfile();
  const userProfile = useUserProfile();
  useEffect(() => {
    if (selfUserData) {
      axiosClient
        .post(apiKeys.fetch, {
          0: {
            model: "User.following",
            model_id: selfUserData.id,
            orders: [],
            graph: {
              fetch_fields: [
                {
                  name: "*"
                }
              ]
            },
            condition: {
              field: "id",
              operator: "EQ",
              value: query?.userId,
              __type__: "SimpleFetchCondition"
            }
          }
        })
        .then((res) => {
          const id = res.data[0][0]?.id;
          const isFollowed = id === +query.userId;

          profileDispatch({
            ...userProfile,
            isCurrentProfileFollowed: isFollowed
          });
        });
    }
  }, [globalUser]);

  return (
    <VStack rowGap="16px" width="full">
      <UserInfo />
      {userProjectsCategories.length !== 0 && <InterestedProjects />}
      <UserActivities />
    </VStack>
  );
};
