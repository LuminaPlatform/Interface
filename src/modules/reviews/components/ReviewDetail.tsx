import { Badge } from "@/components/Badge";
import { reviewStatuses } from "@/constant";
import { useProjectData } from "@/modules/projects/pdp/hooks";
import { Review } from "@/modules/projects/types";
import { Box, HStack, Img, Text, VStack } from "@chakra-ui/react";

interface ReviewDetailProps {
  review: Review;
}
export const ReviewDetail = ({ review }: ReviewDetailProps) => {
  const project = useProjectData();
  const foundReviewStatus = reviewStatuses.find(
    (item) => item.name === review.viewpoint
  );
console.log({project});

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
          height="84px"
          borderRadius="9px"
          p="8px 12px"
          justifyContent="center"
        >
          <Img
            src={project.content.profile.profileImageUrl}
            width="36px"
            height="36px"
            rounded="full"
            alt={project.name}
          />
          <Text color="gray.40" fontSize="md" fontWeight="500">
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
              border="1px solid"
              borderColor="gray.0"
              alt="writer"
              src={review.user.profile_picture}
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
      {/* TODO should attachment added to model */}
      {/* <Img
        width="full"
        height="full"
        maxWidth="full"
        maxHeight="312px"
        alt="review"
      /> */}
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
        {/* TODO should add timestamps */}
        <Text>
          {new Date().getFullYear()}-{new Date().getMonth() + 1}-
          {new Date().getDate()}
        </Text>
        <Text>17:05</Text>{" "}
      </HStack>
    </VStack>
  );
};
