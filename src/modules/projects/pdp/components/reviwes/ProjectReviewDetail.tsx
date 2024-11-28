import {
  Divider,
  HStack,
  Img,
  Link,
  Stack,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { TbLink } from "react-icons/tb";
import { useProjectData } from "../../hooks";
import { Feedback } from "../Feedback";

export const ProjectReviewDetail = () => {
  const project = useProjectData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Stack
      borderRadius="12px"
      bg="#26262999"
      p="24px"
      flexDirection={{ base: "row", md: "column" }}
      justifyContent={{ base: "space-between", md: "initial" }}
      divider={
        <Divider
          borderColor="gray.600"
          display={{ base: "none", md: "inline-block" }}
          my="16px !important"
        />
      }
    >
      <Stack alignItems="center" flexDirection={{ base: "row", md: "column" }}>
        <Img
          borderRadius="16px"
          boxSize={{ base: "80px", lg: "120px" }}
          src={project.content.profile?.profileImageUrl}
          alt={project.name}
        />
        <VStack width="full">
          <HStack
            justifyContent={{ base: "flex-start", md: "center" }}
            width="full"
          >
            <Link
              fontWeight="700"
              color="gray.20"
              fontFamily="lexend"
              textAlign={{ base: "left", md: "center" }}
              href={project.content.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.name}
            </Link>
            <TbLink color="var(--chakra-colors-gray-20)" fontSize="20px" />
          </HStack>
          <Text
            width="full"
            textAlign={{ base: "left", md: "center" }}
            fontSize="sm"
            color="gray.20"
            lineHeight="21.6px"
          >
            {project.content.bio}
          </Text>
          <Text
            borderRadius="12px"
            lineHeight="24px"
            bg="gray.40"
            fontSize="xs"
            fontWeight="500"
            textAlign={{ base: "left", md: "center" }}
            px="8px"
          >
            Appears in {project.content.includedInBallots} ballots
          </Text>
        </VStack>
      </Stack>
      <VStack rowGap="16px" width={{ base: "220px", md: "full", lg: "220px" }}>
        <Feedback
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          headerTitle="Check out how the community views this project!"
        />
      </VStack>
    </Stack>
  );
};
