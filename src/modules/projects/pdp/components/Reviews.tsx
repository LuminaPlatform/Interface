import { ReviewCard } from "@/components/ReviewCard";
import {
  Button,
  HStack,
  Text,
  useDisclosure,
  UseDisclosureProps,
  VStack
} from "@chakra-ui/react";
import { TbEdit, TbMessagePlus } from "react-icons/tb";
import { ModalBase } from "@/components/ModalBase";
import { useProjectData, useProjectReviews } from "../hooks";
import { ImportReview } from "./ImportReview";

type EmptyStateProps = UseDisclosureProps;
const EmptyState = ({ onOpen }: EmptyStateProps) => {
  const project = useProjectData();
  const hasAccessWriteReview = !!project.userRole.find((role: any) =>
    role.name.includes("BETA_USER")
  );

  const {
    onClose: onCloseImportReview,
    onOpen: onOpenImportReview,
    isOpen: isOpenImportReview
  } = useDisclosure();
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
      {hasAccessWriteReview && (
        <HStack mt="24px">
          <Button
            onClick={onOpen}
            leftIcon={<TbEdit />}
            variant="primary"
            size="sm"
          >
            Write a Review
          </Button>
          <Button
            onClick={onOpenImportReview}
            leftIcon={<TbMessagePlus />}
            variant="outline"
            size="sm"
          >
            Import a Review
          </Button>
        </HStack>
      )}
      <ModalBase
        modalBody={<ImportReview onClose={onCloseImportReview} />}
        isOpen={isOpenImportReview}
        onClose={onCloseImportReview}
      />
    </VStack>
  );
};

type ReviewsProps = UseDisclosureProps;

export const Reviews = ({ isOpen, onClose, onOpen }: ReviewsProps) => {
  const reviews = useProjectReviews();
  const project = useProjectData();

  return (
    <VStack rowGap="16px" width="full">
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
