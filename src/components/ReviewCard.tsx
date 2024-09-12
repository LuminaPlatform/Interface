import {
  AspectRatio,
  HStack,
  Img,
  Stack,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { reviewStatuses } from "@/constant";
import { ReviewDetail } from "@/modules/reviews/components/ReviewDetail";
import { Project, Review } from "@/modules/projects/types";
import { generateImageSrc } from "@/utils";
import { ModalBase } from "./ModalBase";
import { Badge } from "./Badge";

interface ReviewCardProps {
  review: Review;
  showProjectName: boolean;
  project: Project;
}
export const ReviewCard = ({
  review,
  showProjectName,
  project
}: ReviewCardProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const foundReviewStatus = reviewStatuses.find(
    (item) => item.name === review.viewpoint
  );
  return (
    <>
      <HStack
        onClick={onOpen}
        cursor="pointer"
        width="full"
        borderRadius="12px"
        fontFamily="satoshi"
        padding={{ base: "8px", md: "12px" }}
        bg="gray.700"
        columnGap={{ base: "8px", md: "12px" }}
        alignItems="stretch"
      >
        {showProjectName && (
          <VStack
            borderRadius="9px"
            justifyContent="center"
            alignItems="center"
            minWidth="118px"
            px="12px"
            bg="rgba(55, 55, 58,0.6)"
            py={{ base: "10px", md: "17px" }}
          >
            <Img
              alt={project.name}
              rounded="full"
              src={project.content.profile?.profileImageUrl}
              width={{ base: "24px", md: "36px" }}
              height={{ base: "24px", md: "36px" }}
            />
            <Text
              width="full"
              textAlign="center"
              alignSelf="center"
              color="gray.40"
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="500"
            >
              {project.name}
            </Text>
          </VStack>
        )}
        <VStack
          rowGap="12px"
          alignItems="flex-start"
          justifyContent="space-between"
          width="full"
        >
          <Stack
            flexDirection={{ base: "column", md: "row" }}
            width="full"
            justifyContent="space-between"
          >
            <Text
              color="gray.20"
              fontWeight="600"
              fontSize={{ base: "lg", md: "xl" }}
            >
              {review.title}
            </Text>
            <Badge
              title={foundReviewStatus?.name}
              colorScheme={foundReviewStatus?.colorScheme}
              icon={foundReviewStatus?.icon}
            />
          </Stack>
          <Stack
            flexDirection={{ base: "column", md: "row" }}
            position="relative"
            width="full"
          >
            {review.files && (
              <AspectRatio
                ratio={1.14}
                minWidth={{ base: "full", md: "192px" }}
                w="192px"
                h="108px"
                maxH={{ base: "250px", md: "initial" }}
                order={{ base: "0", md: "1" }}
              >
                <Img src={generateImageSrc(review.files.id)} alt="banner" />
              </AspectRatio>
            )}
            <Text
              width="full"
              display="flex"
              color="gray.20"
              fontSize={{ base: "sm", md: "md" }}
              noOfLines={4}
              lineHeight="24px"
              background="linear-gradient(to bottom,var(--chakra-colors-gray-20),var(--chakra-colors-gray-20) ,rgba(0,0,0,0))"
              backgroundClip="text"
            >
              {review.description}
            </Text>
          </Stack>
          <HStack width="full" justifyContent="space-between">
            <HStack columnGap="8px">
              <Img
                rounded="full"
                alt="writer"
                src={
                  review?.user?.profile_id
                    ? generateImageSrc(review?.user?.profile_id)
                    : "/assets/images/default-avatar.png"
                }
                width={{ base: "16px", md: "24px" }}
                height={{ base: "16px", md: "24px" }}
              />

              <Text color="gray.40" fontSize={{ base: "sm", md: "md" }}>
                {review?.user?.display_name}
              </Text>
            </HStack>
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
      </HStack>
      <ModalBase
        isOpen={isOpen}
        onClose={onClose}
        modalBody={<ReviewDetail project={project} review={review} />}
      />
    </>
  );
};
