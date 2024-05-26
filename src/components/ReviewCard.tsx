import {
  AspectRatio,
  HStack,
  Img,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Badge } from "./Badge";
import { reviewStatuses } from "@/constant";
import { ModalBase } from "./ModalBase";
import { ReviewDetail } from "@/modules/reviews/components/ReviewDetail";
import { Review } from "@/modules/projects/types";
import { useProjectData } from "@/modules/projects/pdp/hooks";

interface ReviewCardProps {
  // TODO should fix review type
  review: Review | any;
  showProjectName: boolean;
}
export const ReviewCard = ({ review, showProjectName }: ReviewCardProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const project = useProjectData();

  const foundReviewStatus = reviewStatuses.find(
    (item) => item.name === review.viewpoint
  );
  return (
    // TODO should use dynamic alt
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
              alt={review.title}
              // TODO should add review img
              src="/assets/images/default-img.png"
              width={{ base: "24px", md: "36px" }}
              height={{ base: "24px", md: "36px" }}
            />
            <Text
              width="full"
              textAlign="center"
              display="flex"
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
          >
            {/* TODO should attachment added to model */}
            {/* {false && (
              <AspectRatio
                order={{ base: "0", md: "1" }}
                ratio={1.14}
                minWidth={{ base: "full", md: "192px" }}
                maxWidth={{ base: "100%", md: "192px" }}
              >
                <Img
                  objectFit="cover"
                  src="/assets/images/default-img.png"
                  alt="banner"
                />
              </AspectRatio>
            )} */}
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
                border="1px solid"
                borderColor="gray.0"
                alt="writer"
                src="/assets/images/default-img.png"
                width={{ base: "16px", md: "24px" }}
                height={{ base: "16px", md: "24px" }}
              />
              <Text color="gray.40" fontSize={{ base: "sm", md: "md" }}>
                {review.user.display_name}
              </Text>
            </HStack>
            <HStack fontWeight="500" fontSize="xs" color="gray.80">
              <Text>
                {new Date().getFullYear()}-{new Date().getMonth() + 1}-
                {new Date().getDate()}
              </Text>
              {/* TODO should add timestamps */}
              <Text>17:05</Text>
            </HStack>
          </HStack>
        </VStack>
      </HStack>
      <ModalBase
        isOpen={isOpen}
        onClose={onClose}
        modalBody={<ReviewDetail review={review} />}
      />
    </>
  );
};
