import {
  AspectRatio,
  Box,
  HStack,
  Img,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import EmptyPage from "@/components/EmptyPage";
import { ReviewCard } from "@/components/ReviewCard";

interface TabBodyProps {
  reviews: string | null | undefined;
}
const TabBody = ({ reviews }: TabBodyProps) => {
  return (
    <VStack rowGap="16px" py="16px">
      {reviews === "Popular" ? (
        <EmptyPage
          description="Looks like you haven't followed anyone yet! To see reviews, explore
        in other categories. Expand your network and discover insightful reviews
        from trusted voices."
          header="Start Following for Reviews"
          imgSrc="/assets/images/empty_reviews.png"
        />
      ) : (
        [0, 1, 2, 3].map((item) => <ReviewCard showProjectName review={item} key={item} />)
      )}
    </VStack>
  );
};

export default TabBody;
