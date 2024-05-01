import { VStack } from "@chakra-ui/react";
import { UserInfo } from "../components/UserInfo";
import { InterestedProjects } from "../components/InterestedProjects";
import { UserActivities } from "../components/UserActivities";

export const Index = () => {
  return (
    <VStack rowGap="16px" width="full">
      <UserInfo />
      <InterestedProjects />
      <UserActivities />
    </VStack>
  );
};
