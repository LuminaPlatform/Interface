import { ReviewCard } from "@/components/ReviewCard";
import { Text, VStack } from "@chakra-ui/react";

const reviews = Array(4)
  .fill("")
  .map((_, index) => index);
export const UserActivities = () => {
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
      {reviews.map((item) => (
        <ReviewCard key={item} review={item} showProjectName />
      ))}
    </VStack>
  );
};
