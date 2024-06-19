import { ReviewCard } from "@/components/ReviewCard";
import {
  Button,
  HStack,
  Text,
  UseDisclosureProps,
  VStack,
} from "@chakra-ui/react";
import { useProjectData, useProjectReviews } from "../hooks";
import { useAuthorization, useGlobalUserData } from "@/hooks/bases";
import { useMemo } from "react";
import { TbEdit, TbMessagePlus } from "react-icons/tb";

interface EmptyStateProps extends UseDisclosureProps {}
const EmptyState = ({ onOpen }: EmptyStateProps) => {
  const userBaseInfo = useAuthorization();
  const userDetail = useGlobalUserData();
  console.log(userBaseInfo);
  const isWhiteList = true;
  const userHasAccessToWrite = userDetail?.user?.x_username && isWhiteList;
  return (
    <VStack maxW="421px" height="full" justifyContent="center">
      <Text
        width="full"
        textAlign="center"
        color="gray.100"
        fontFamily="lexend"
        fontWeight="600"
        fontSize="xl"
      >
        No Reviews Yet
      </Text>
      <Text
        mt="8px"
        color="gray.100"
        width="full"
        textAlign="center"
        fontWeight="500"
        fontSize="lg"
        lineHeight="28.8px"
      >
        It looks like there are no reviews for this project yet. Stay tuned for
        updates!
      </Text>
      {userBaseInfo && userHasAccessToWrite && (
        <HStack mt="24px">
          <Button
            onClick={onOpen}
            leftIcon={<TbEdit />}
            variant="primary"
            size="sm"
          >
            Write a Review
          </Button>
          <Button leftIcon={<TbMessagePlus />} variant="outline" size="sm">
            Import a Review
          </Button>
        </HStack>
      )}
    </VStack>
  );
};

interface ReviewsProps extends UseDisclosureProps {}

export const Reviews = ({ isOpen, onClose, onOpen }: ReviewsProps) => {
  const reviews = useProjectReviews();
  const project = useProjectData();

  return (
    <VStack height="full" justifyContent="center" rowGap="16px" width="full">
      {reviews.length === 0 ? (
        <EmptyState isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      ) : (
        reviews?.map((review) => (
          <ReviewCard
            project={project}
            showProjectName={false}
            review={review}
            key={review.id}
          />
        ))
      )}
    </VStack>
  );
};
