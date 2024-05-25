import { ReviewCard } from "@/components/ReviewCard";
import { VStack } from "@chakra-ui/react";
import { useProjectReviews } from "../hooks";

export const Reviews = () => {
  const reviews = useProjectReviews();
  console.log({reviews});
  
  return (
    <VStack rowGap="16px" width="full">
      {reviews?.map((review) => (
        <ReviewCard showProjectName={false} review={review} key={review.id} />
      ))}
    </VStack>
  );
};
