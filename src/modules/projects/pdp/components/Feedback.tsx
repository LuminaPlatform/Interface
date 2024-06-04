import {
  Button,
  Divider,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { ReviewStatus } from "@/types";
import { reviewStatuses } from "@/constant";
import { Badge } from "@/components/Badge";
import { TbEdit } from "react-icons/tb";
import { ModalBase } from "@/components/ModalBase";
import WriteFeedback from "./WriteFeedback";
import { Statuses } from "./Statuses";
import { FeedbackResult } from "./FeedbackResult";

export const Feedback = () => {
  const [status, setStatus] = useState<ReviewStatus["name"]>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <VStack
      rowGap="24px"
      p="16px"
      height="auto"
      width="full"
      bg="gray.700"
      borderRadius="10px"
    >
      <VStack width="full" rowGap="16px">
        <Text
          fontSize="lg"
          color="gray.20"
          fontWeight="500"
          lineHeight="28.8px"
          textAlign="left"
        >
          Which status best describes your view of the project?
        </Text>
        <FeedbackResult />
        <Text mr="auto" color="gray.60" fontSize="xs" fontWeight="500">
          Based on 604 rating
        </Text>

        <Button
          onClick={onOpen}
          size="md"
          leftIcon={<TbEdit />}
          width="full"
          variant="outline"
        >
          Write a Review
        </Button>
      </VStack>
      <ModalBase
        modalBody={
          <WriteFeedback
            onClose={onClose}
            setStatus={setStatus}
            status={status}
          />
        }
        isOpen={isOpen}
        onClose={onClose}
      />
    </VStack>
  );
};
