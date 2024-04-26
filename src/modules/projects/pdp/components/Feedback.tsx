import {
  Button,
  Divider,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FeedbackChart } from "./FeedbackChart";
import { useState } from "react";
import { ReviewStatus } from "@/types";
import { reviewStatuses } from "@/constant";
import { Badge } from "@/components/Badge";
import { TbEdit } from "react-icons/tb";
import { ModalBase } from "@/components/ModalBase";
import WriteFeedback from "./WriteFeedback";
import { Statuses } from "./Statuses";

export const Feedback = () => {
  const [status, setStatus] = useState<ReviewStatus["id"]>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <VStack
      rowGap="24px"
      p="22px 32px"
      height="full"
      width="full"
      bg="gray.700"
      borderRadius="10px"
    >
      <FeedbackChart />
      <Divider my="0" borderColor="gray.600" width="full" />
      <VStack width="full" rowGap="16px">
        <Text
          fontSize="lg"
          color="gray.20"
          fontWeight="500"
          lineHeight="28.8px"
          textAlign="center"
        >
          Which status best describes your view of the project?
        </Text>
        <Statuses setStatus={setStatus} status={status} />
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
        modalBody={<WriteFeedback onClose={onClose} setStatus={setStatus} status={status} />}
        isOpen={isOpen}
        onClose={onClose}
      />
    </VStack>
  );
};
