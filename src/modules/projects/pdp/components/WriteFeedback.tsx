import {
  Box,
  HStack,
  Img,
  Text,
  UseDisclosureProps,
  VStack,
} from "@chakra-ui/react";
import { TbLink } from "react-icons/tb";
import { useProjectData } from "../hooks";
import Link from "next/link";
import { Statuses } from "./Statuses";
import { StatusesProps } from "../types";
import { ReviewForm } from "./ReviewForm";

interface WriteFeedbackProps {
  setStatus: StatusesProps["setStatus"];
  status: StatusesProps["status"];
  onClose: UseDisclosureProps["onClose"];
}
const WriteFeedback = ({ setStatus, status, onClose }: WriteFeedbackProps) => {
  const {
    name,
    content: {
      bio,
      profile
    },
  } = useProjectData();

  return (
    <VStack rowGap="16px" width="full">
      <HStack width="full">
        <Box
          bg="gray.900"
          width="120px"
          height="120px"
          border="1px solid"
          borderColor="gray.100"
          borderRadius="16px"
          overflow="hidden"
        >
          <Img src={profile?.profileImageUrl} alt="project" />
        </Box>
        <VStack justifyContent="center" alignItems="flex-start">
          <HStack>
            <Text
              fontSize="28px"
              fontWeight="600"
              color="gray.20"
              fontFamily="lexend"
              as={Link}
              href="#"
            >
              {name}
            </Text>
            <TbLink fontSize="28px" color="var(--chakra-colors-gray-20)" />
          </HStack>
          <Text
            width="full"
            textAlign="left"
            fontSize="lg"
            fontWeight="500"
            color="gray.20"
          >
            {bio}
          </Text>
        </VStack>
      </HStack>
      <Text
        width="full"
        textAlign="left"
        pt="16px"
        color="gray.40"
        fontSize="md"
        fontWeight="700"
      >
        Which status best describes your view of the project?
      </Text>
      <Box width="full">
        <Statuses setStatus={setStatus} status={status} />
      </Box>
      <ReviewForm status={status} onClose={onClose} />
    </VStack>
  );
};

export default WriteFeedback;
