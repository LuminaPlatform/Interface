import { Badge } from "@/components/Badge";
import { reviewStatuses } from "@/constant";
import { useProjectData } from "@/modules/projects/pdp/hooks";
import { Project, Review } from "@/modules/projects/types";
import { Box, HStack, Img, Text, VStack } from "@chakra-ui/react";

interface ReviewDetailProps {
  review: Review;
  project: Project;
}
export const ReviewDetail = ({ review, project }: ReviewDetailProps) => {
  const foundReviewStatus = reviewStatuses.find(
    (item) => item.name === review.viewpoint
  );

  return (
    <VStack
      maxWidth="616px"
      position="relative"
      width="full"
      padding="0"
      margin="0"
      mt="8px"
      alignItems="center"
      maxH={{ base: "350px", md: "756px" }}
      overflow="auto"
      rowGap="12px"
    >
      <HStack columnGap="16px" width="full">
        <VStack
          rowGap="8px"
          bg="#37373A99"
          width="124px"
          minH="84px"
          borderRadius="9px"
          p="8px 12px"
          justifyContent="center"
        >
          <Img
            src={project.content.profile?.profileImageUrl}
            width="36px"
            height="36px"
            rounded="full"
            alt={project.name}
          />
          <Text
            textAlign="center"
            color="gray.40"
            fontSize="md"
            fontWeight="500"
          >
            {project.name}
          </Text>
        </VStack>
        <VStack alignItems="flex-start">
          <Badge
            title={foundReviewStatus?.name}
            colorScheme={foundReviewStatus?.colorScheme}
            icon={foundReviewStatus?.icon}
          />
          <HStack columnGap="8px">
            <Img
              rounded="full"
              alt="writer"
              src={
                review.user?.profile_id
                  ? `${process.env.NEXT_PUBLIC_BASE_FILE_URL}/${review.user?.profile_id}`
                  : "/assets/images/default-avatar.png"
              }
              width={{ base: "16px", md: "24px" }}
              height={{ base: "16px", md: "24px" }}
            />
            <Text color="gray.40" fontSize={{ base: "sm", md: "md" }}>
              {review.user.display_name}
            </Text>
          </HStack>
        </VStack>
      </HStack>
      <Text
        fontSize="xl"
        color="gray.20"
        fontFamily="lexend"
        width="full"
        textAlign="left"
      >
        My recommendation
      </Text>
      <Text
        width="full"
        textAlign="left"
        fontSize="lg"
        color="gray.40"
        lineHeight="28.8px"
      >
        {review.description}
      </Text>
      {review?.files && (
        <Img
          width="full"
          height="full"
          maxWidth="full"
          maxHeight="312px"
          alt="review"
          src={`${process.env.NEXT_PUBLIC_BASE_FILE_URL}/${review?.files.id}`}
        />
      )}

      <HStack
        bg="gray.900"
        fontWeight="500"
        fontSize="xs"
        color="gray.80"
        right="0"
        width="full"
        position="sticky"
        bottom="0"
        justifyContent="flex-end"
      >
        <HStack fontWeight="500" fontSize="xs" color="gray.80">
          <Text>
            {new Date(review.createTimestamp).getFullYear()}-
            {new Date(review.createTimestamp).getMonth() + 1}-
            {new Date(review.createTimestamp).getDate()}
          </Text>
          <Text>
            {new Date(review.createTimestamp).getHours()}:
            {new Date(review.createTimestamp).getMinutes()}
          </Text>
        </HStack>
      </HStack>
    </VStack>
  );
};
