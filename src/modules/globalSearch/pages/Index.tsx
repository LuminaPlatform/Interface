import {
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { globalSearchTabs } from "../constants";
import { StringParam, useQueryParams } from "use-query-params";

const Index = () => {
  const [query, setQuery] = useQueryParams({
    tab: StringParam,
  });
  const activeTab = useMemo(
    () =>
      globalSearchTabs.findIndex((tab) => tab.query === query.tab) > 0
        ? globalSearchTabs.findIndex((tab) => tab.query === query.tab)
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
          Explore Search Results
        </Text>
      </HStack>

      <Tabs index={activeTab} width="full">
        <TabList borderColor="gray.400">
          {globalSearchTabs.map((tab) => (
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
        {/* {(selectedProject?.length !== 0 || activeTab === 1) && (
          <Box width="full" mt="16px">
            <ProjectSearch search={search} setSearch={setSearch} />
          </Box>
        )} */}
        <TabPanels>
          <TabPanel>
            <Text color={"white"}>people</Text>
          </TabPanel>
          <TabPanel>
            <Text color={"white"}>projects</Text>
          </TabPanel>
          <TabPanel>
            <Text color={"white"}>reviews</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default Index;
