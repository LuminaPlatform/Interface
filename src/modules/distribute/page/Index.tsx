import {
  Box,
  Button,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { UnAuthorized } from "../components/UnAuthorized";
import { EmptyState } from "../components/EmptyState";
import { ProjectList } from "../components/ProjectList";
import { useMemo, useState } from "react";
import { TbBookmarkPlus } from "react-icons/tb";
import { ModalBase } from "@/components/ModalBase";
import { AddProjects } from "../components/AddProjects";
import { useAccount } from "wagmi";
import { useAuthorization, useSelectedProjects } from "@/hooks/bases";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { distributeTabs } from "../constants";
import { PopularProjectsPanel } from "../components/PopularProjectsPanel";
import { StringParam, useQueryParams } from "use-query-params";
import { ProjectSearch } from "../components/ProjectSearch";

const Index = () => {
  const userData = useAuthorization();
  const selectedProject = useSelectedProjects();

  const { onClose, isOpen, onOpen } = useDisclosure();
  const [search, setSearch] = useState("");

  const content = useMemo(() => {
    if (!userData) {
      return <UnAuthorized />;
    }
    if (selectedProject?.length === 0) {
      return <EmptyState onOpen={onOpen} />;
    }
    return <ProjectList search={search} onOpen={onOpen} />;
  }, [selectedProject, userData, search]);

  const [query, setQuery] = useQueryParams({
    tab: StringParam,
  });
  const activeTab = useMemo(
    () =>
      distributeTabs.findIndex((tab) => tab.query === query.tab) > 0
        ? distributeTabs.findIndex((tab) => tab.query === query.tab)
        : 0,
    [query.tab]
  );

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
      </HStack>
      <Tabs index={activeTab} width="full">
        <TabList borderColor="gray.400">
          {distributeTabs.map((tab) => (
            <Tab
              _active={{ color: "gray.100" }}
              _hover={{ color: "primary.300", borderColor: "primary.300" }}
              _selected={{ color: "primary.300", borderColor: "primary.300" }}
              color="gray.40"
              fontSize="md"
              fontWeight="500"
              onClick={() => setQuery({ tab: tab.query })}
              key={tab.id}
            >
              {tab.title}
            </Tab>
          ))}
        </TabList>
        {(selectedProject?.length !== 0 || activeTab === 1) && (
          <Box width="full" mt="16px">
            <ProjectSearch search={search} setSearch={setSearch} />
          </Box>
        )}
        <TabPanels>
          <TabPanel>{content}</TabPanel>
          <TabPanel>{/* <PopularProjectsPanel search={search} /> */}</TabPanel>
        </TabPanels>
      </Tabs>
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
