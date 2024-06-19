import { VStack } from "@chakra-ui/react";

import EmptyPage from "@/components/EmptyPage";
import { ReviewCard } from "@/components/ReviewCard";
import { useReviewsData } from "../hooks";

const TabBody = () => {
  const reviews = useReviewsData();


  return (
    <VStack rowGap="16px" py="16px">
      {reviews.length === 0 ? (
        <EmptyPage
          description="Looks like you haven't followed anyone yet! To see reviews, explore
        in other categories. Expand your network and discover insightful reviews
        from trusted voices."
          header="Start Following for Reviews"
          imgSrc="/assets/images/empty_reviews.png"
        />
      ) : (
        reviews.map((item) => (
          <ReviewCard
            project={item.project}
            showProjectName
            review={item}
            key={item.id}
          />
        ))
      )}
    </VStack>
  );
};

export default TabBody;
