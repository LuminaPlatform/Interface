import { ReviewCard } from "@/components/ReviewCard";
import { Text, VStack } from "@chakra-ui/react";
import { useUserProfile } from "../hooks";

export const UserActivities = () => {
  const userProfileData = useUserProfile();

  return (
    <VStack rowGap="24px" width="full" p="24px">
      <Text
        fontSize="xl"
        color="gray.40"
        fontFamily="lexend"
        width="full"
        textAlign="left"
        fontWeight="600"
      >
        Activities
      </Text>
      {userProfileData?.activities.length === 0 ? (
        <Text color='gray.0' >There are not any activities </Text>
      ) : (
        userProfileData?.activities.map((item) => (
          <ReviewCard
            project={item.project}
            key={item.id}
            review={item}
            showProjectName
          />
        ))
      )}
    </VStack>
  );
};
