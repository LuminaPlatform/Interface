import { VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuthorization, useGlobalUserData } from "@/hooks/bases";
import { useEffect } from "react";
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
    if (selfUserData && !userProfile.isCurrentProfileFollowed) {
      profileDispatch({
        ...userProfile,
        isCurrentProfileFollowed: globalUser.followings.find(
          (item: any) => +item.id === +query?.userId
        )
      });
    }
  }, [selfUserData]);

  return (
    <VStack rowGap="16px" width="full">
      <UserInfo />
      {userProjectsCategories.length !== 0 && <InterestedProjects />}
      <UserActivities />
    </VStack>
  );
};
