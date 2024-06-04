import { ReviewCard } from "@/components/ReviewCard";
import { VStack } from "@chakra-ui/react";
import { useProjectData, useProjectReviews } from "../hooks";

export const Reviews = () => {
  const reviews = useProjectReviews();
  console.log({ reviews });
  const project = useProjectData();
  return (
    <VStack rowGap="16px" width="full">
      {reviews?.map((review) => (
        <ReviewCard
          project={project}
          showProjectName={false}
          review={review}
          key={review.id}
        />
      ))}
    </VStack>
  );
};
