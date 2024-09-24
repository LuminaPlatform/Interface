import {
  Box,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { StringParam, useQueryParams } from "use-query-params";
import { ProjectSearch } from "@/modules/distribute/components/ProjectSearch";
// import { searchTabs } from "../constants";
import { PeopleTab } from "../components/PeopleTab";
import { ReviewTab } from "../components/ReviewTab";
import { ProjectsTab } from "../components/ProjectsTab";

const Index = () => {
  const [search, setSearch] = useState("");
  const searchState = { search, setSearch };

  const searchTabs = [
    {
      id: 0,
      title: "People",
      query: "people",
      comp: <PeopleTab searchState={searchState} />
    },
    {
      id: 1,
      title: "Projects",
      query: "projects",
      comp: <ProjectsTab searchState={searchState} />
    },
    {
      id: 2,
      title: "Reviews",
      query: "reviews",
      comp: <ReviewTab searchState={searchState} />
    }
  ];

  const [query, setQuery] = useQueryParams({
    tab: StringParam
  });
  const activeTab = useMemo(
    () =>
      searchTabs.findIndex((tab) => tab.query === query.tab) > 0
        ? searchTabs.findIndex((tab) => tab.query === query.tab)
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

      <Tabs isLazy index={activeTab} width="full">
        <TabList borderColor="gray.400">
          {searchTabs.map((tab) => (
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

        <Box width="full" mt="16px" mb="16px">
          <ProjectSearch search={search} setSearch={setSearch} />
        </Box>

        <TabPanels w="full" p="0">
          {searchTabs.map((item) => (
            <TabPanel w="full" p="0" key={item.id}>
              {item.comp}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default Index;
