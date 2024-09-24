import { HStack, Img, Text, useDisclosure, VStack } from "@chakra-ui/react";
import React from "react";
import { ReviewDetail } from "@/modules/reviews/components/ReviewDetail";
import { Project, Review } from "@/modules/projects/types";
import { reviewStatuses } from "@/constant";
import { ModalBase } from "../ModalBase";
import { Badge } from "../Badge";
import { getHighlightedText } from "../HighlightText";

interface ReviewCardProps {
  title: string;
  text: string;
  name: string;
  date: string;
  UserProfileID: string;
  search: string;
  viewpoint: string;
  project: Project;
  review: Review;
}

const ReviewCard = ({
  title,
  text,
  name,
  date,
  search,
  project,
  review,
  UserProfileID,
  viewpoint
}: ReviewCardProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const foundReviewStatus = reviewStatuses.find(
    (item) => item.name === viewpoint
  );

  return (
    <>
      <VStack
        onClick={onOpen}
        w="100%"
        bg="gray.600"
        p="12px"
        borderRadius="12px"
        gap="12px"
        h="145px"
        cursor="pointer"
      >
        <HStack w="100%" justifyContent="space-between">
          <Text color="gray.0" fontSize="18px" fontWeight="700">
            {getHighlightedText(title, search)}
          </Text>
          <Badge
            title={foundReviewStatus?.name}
            colorScheme={foundReviewStatus?.colorScheme}
            icon={foundReviewStatus?.icon}
          />
        </HStack>

        <VStack
          w="100%"
          minH="44px"
          h="44px"
          justifyContent="start"
          alignItems="start"
          overflow="hidden"
        >
          <Text
            textAlign="start"
            color="gray.0"
            fontSize="14px"
            fontWeight="700"
            lineHeight="22px"
          >
            {text}
          </Text>
        </VStack>

        <HStack w="100%" justifyContent="space-between">
          <HStack gap="8px">
            <Img
              rounded="full"
              width="24px"
              minW="24px"
              height="24px"
              minH="24px"
              src={
                UserProfileID
                  ? `${process.env.NEXT_PUBLIC_BASE_FILE_URL}/${UserProfileID}`
                  : "/assets/images/default-avatar.png"
              }
            />
            <Text color="gray.40" fontSize="14px">
              {name}
            </Text>
          </HStack>

          <Text color="gray.80" fontSize="12px">
            {date.split("T")[0]}, {date.split("T")[1].slice(0, 5)}
          </Text>
        </HStack>
      </VStack>
      <ModalBase
        isOpen={isOpen}
        onClose={onClose}
        modalBody={<ReviewDetail project={project} review={review} />}
      />
    </>
  );
};

export default ReviewCard;
