import {
  Box,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { searchTabs } from "../constants";
import { StringParam, useQueryParams } from "use-query-params";
import { ProjectSearch } from "@/modules/distribute/components/ProjectSearch";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";
import PeopleCard from "../components/peopleCard";
import ProjectsTab from "../components/ProjectsTab";
import { ReviewCard } from "@/components/ReviewCard";
// import { useGlobalSearchData } from "@/hooks/bases";

const Index = () => {
  // const globalSearch = useGlobalSearchData();
  const [search, setSearch] = useState("");
  const [searchedProjects, setSearchedProjects] = useState([]);
  const [searchedReviews, setSearchedReviews] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);

  // console.log(globalSearch?.inputValue);

  const [query, setQuery] = useQueryParams({
    tab: StringParam,
  });
  const activeTab = useMemo(
    () =>
      searchTabs.findIndex((tab) => tab.query === query.tab) > 0
        ? searchTabs.findIndex((tab) => tab.query === query.tab)
        : 0,
    [query.tab]
  );

  useEffect(() => {
    if (search !== "") {
      axiosClient
        .post(apiKeys.fetch, {
          0: {
            model: "Project",
            model_id: "None",
            orders: [],
            graph: {
              fetch_fields: [
                {
                  name: "id",
                },
                {
                  name: "name",
                },
                {
                  name: "logo_id",
                },
                { name: "content.fundingSources" },
                { name: "content.includedInBallots" },
                { name: "content.lists.count" },
                { name: "content.profile" },
                { name: "content.impactCategory" },
              ],
            },
            condition: {
              __type__: "SimpleFetchCondition",
              field: "name",
              operator: "LIKE",
              value: search,
            },
          },
        })
        .then((res) => {
          setSearchedProjects(res.data[0]);
        });

      axiosClient
        .post(apiKeys["fetch"], {
          0: {
            model: "Review",
            model_id: "None",
            orders: [],
            graph: {
              fetch_fields: [
                {
                  name: "*",
                },
                {
                  name: "files",
                  graph: {
                    fetch_fields: [
                      {
                        name: "*",
                      },
                    ],
                  },
                },
                {
                  name: "user",
                  graph: {
                    fetch_fields: [
                      {
                        name: "display_name",
                      },
                      {
                        name: "id",
                      },
                      {
                        name: "profile_id",
                      },
                    ],
                  },
                },
                {
                  name: "project",
                  graph: {
                    fetch_fields: [
                      {
                        name: "id",
                      },
                      {
                        name: "name",
                      },
                      {
                        name: "logo_id",
                      },
                      { name: "content.fundingSources" },
                      { name: "content.includedInBallots" },
                      { name: "content.applicantType" },
                      { name: "content.websiteUrl" },
                      { name: "content.bio" },
                      { name: "content.profile" },
                      { name: "content.applicant" },
                      { name: "content.contributionDescription" },
                      { name: "content.contributionLinks" },
                      { name: "content.impactDescription" },
                      { name: "content.impactMetrics" },
                      { name: "content.impactCategory" },
                    ],
                  },
                },
              ],
            },
            condition: {
              __type__: "SimpleFetchCondition",
              field: "title",
              operator: "LIKE",
              value: search,
            },
          },
        })
        .then((res) => {
          setSearchedReviews(res.data[0]);
        });

      axiosClient
        .post(apiKeys.fetch, {
          "0": {
            model: "User",
            model_id: "None",
            orders: [],
            graph: {
              fetch_fields: [
                {
                  name: "*",
                },
                {
                  name: "wallets",
                  graph: {
                    fetch_fields: [
                      {
                        name: "*",
                      },
                    ],
                  },
                },
              ],
            },

            condition: {
              __type__: "SimpleFetchCondition",
              field: "username",
              operator: "LIKE",
              value: search,
            },
          },
        })
        .then((res) => {
          setSearchedUsers(res.data[0]);
          console.log(res.data[0]);
        });
    } else {
      setSearchedProjects([]);
      setSearchedUsers([]);
      setSearchedReviews([]);
    }
  }, [search]);

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
              {item.id === 0 ? (
                <VStack w="full" gap="16px">
                  {searchedUsers.map((item, key) => (
                    <PeopleCard
                      key={key}
                      profile_id={item.profile_id}
                      id={item?.id.toString()}
                      setSearch={setSearch}
                      search={search}
                      email={item.email}
                      x_username={item.x_username}
                      name={
                        item?.username || item?.x_username || item?.display_name
                      }
                      walletAddress={item.wallets?.address}
                    />
                  ))}
                </VStack>
              ) : item.id === 1 ? (
                searchedProjects.length !== 0 ? (
                  <ProjectsTab searchedProjects={searchedProjects} />
                ) : (
                  <Text color={"white"}></Text>
                )
              ) : // <Text color={"white"}>i'm tired</Text>
              searchedReviews.length !== 0 ? (
                <VStack w="full" gap="16px">
                  {searchedReviews.map((item) => (
                    <ReviewCard
                      project={item.project}
                      showProjectName
                      review={item}
                      key={item.id}
                    />
                  ))}
                </VStack>
              ) : (
                <Text color={"white"}></Text>
              )}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default Index;
