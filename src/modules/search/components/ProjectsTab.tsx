import { Box, Spinner, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Table from "@/modules/projects/components/Table";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";
import { EmptyState } from "@/modules/projects/components/EmptyState";
// import {
//   // useProjects,
//   useProjectsDispatch
// } from "@/modules/projects/hooks";

interface SearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const ProjectsTab = ({ searchState }: { searchState: SearchProps }) => {
  const [searchedProjects, setSearchedProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const dispatchProjects = useProjectsDispatch();
  const {
    search
    // setSearch
  } = searchState;

  // const projects = useProjects();

  useEffect(() => {
    if (search !== "") {
      setIsLoading(true);
      axiosClient
        .post(apiKeys.fetch, {
          0: {
            model: "Project",
            model_id: "None",
            orders: [],
            graph: {
              fetch_fields: [
                {
                  name: "id"
                },
                {
                  name: "name"
                },
                {
                  name: "logo_id"
                },
                { name: "content.fundingSources" },
                { name: "content.includedInBallots" },
                { name: "content.lists.count" },
                { name: "content.profile" },
                { name: "content.impactCategory" }
              ]
            },
            condition: {
              __type__: "SimpleFetchCondition",
              field: "name",
              operator: "LIKE",
              value: search
            }
          }
        })
        .then(() =>
          // res
          {
            // setSearchedProjects(res.data[0]);
            // dispatchProjects(res.data[0]);
          }
        )
        .finally(() => setIsLoading(false));
    } else {
      setSearchedProjects([]);
      setIsLoading(false);
    }
  }, [search]);

  return (
    <VStack w="full" gap="16px">
      {/* <Text color={"wheat"}>{search}</Text> */}
      {isLoading && <Spinner color="primary.300" />}
      {!isLoading &&
        (searchedProjects?.length === 0 ? (
          <Box width="full" overflow="auto">
            <EmptyState />
          </Box>
        ) : (
          <Box width="full" overflow="auto">
            <Table highlightNeeded search={search} />
          </Box>
        ))}
    </VStack>
  );
};
