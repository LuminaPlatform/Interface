import { ReviewCard } from "@/components/ReviewCard";
import { VStack } from "@chakra-ui/react";

export const Reviews = () => {
  return (
    <VStack rowGap='16px' width="full">
      {[0, 1, 2, 3].map((item) => (
        <ReviewCard showProjectName={false} review={item} key={item} />
      ))}
    </VStack>
  );
};
