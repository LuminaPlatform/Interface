import { Button, HStack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { UnAuthorized } from "../components/UnAuthorized";
import { EmptyState } from "../components/EmptyState";
import { ProjectsProvider } from "../context";
import { ProjectList } from "../components/ProjectList";
import { useMemo } from "react";
import { useSelectedProject } from "../hooks";
import { TbBookmarkPlus } from "react-icons/tb";
import { ModalBase } from "@/components/ModalBase";
import { AddProjects } from "../components/AddProjects";
import { useAccount } from "wagmi";

const Index = () => {
  const { isConnected } = useAccount();
  const selectedProject = useSelectedProject();
  const { onClose, isOpen, onOpen } = useDisclosure();

  const content = useMemo(() => {
    if (!isConnected) {
      return <UnAuthorized />;
    }
    if (selectedProject.length === 0) {
      return <EmptyState onOpen={onOpen} />;
    }
    return <ProjectList />;
  }, [selectedProject, isConnected]);

  return (
    <VStack
      pb="16px"
      overflow="hidden"
      position="relative"
      zIndex={1}
      marginTop="28px"
      rowGap="1rem"
    >
      <HStack width="full">
        <Text
          fontFamily="lexend"
          mr="auto"
          color="gray.20"
          fontSize="28px"
          fontWeight="600"
        >
          Distribute
        </Text>
        {selectedProject.length !== 0 && (
          <Button
            onClick={onOpen}
            variant="outline"
            size="md"
            leftIcon={<TbBookmarkPlus fontSize="20px" />}
          >
            Add Projects
          </Button>
        )}
      </HStack>
      {content}
      <ModalBase
        isOpen={isOpen}
        onClose={onClose}
        modalBody={<AddProjects onClose={onClose} />}
        modalHeader={
          <Text
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
            top="16px"
            color="gray.0"
            fontWeight="600"
            fontSize="xl"
          >
            Add Projects
          </Text>
        }
      />
    </VStack>
  );
};

export default Index;
