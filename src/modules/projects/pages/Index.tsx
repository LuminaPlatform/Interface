import { Box, Input, Text, VStack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { debounce } from "lodash";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";
import { pageThreshold } from "@/constant";
import { useRouter } from "next/router";
import Table from "../components/Table";
import { useProjects, useProjectsDispatch } from "../hooks";
import { EmptyState } from "../components/EmptyState";

const Index = () => {
  const [search, setSearch] = useState("");
  const dispatchProjects = useProjectsDispatch();
  const page = useRouter()?.query?.page ?? 1;

  const projects = useProjects();

  const handleSearchProjects = useMemo(
    () =>
      debounce((value) => {
        setSearch(value);
        axiosClient
          .post(apiKeys.fetch, {
            0: {
              model: "Project",
              model_id: "None",
              ...(!value && { limit: pageThreshold }),
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
              condition: value
                ? {
                    __type__: "SimpleFetchCondition",
                    field: "name",
                    operator: "LIKE",
                    value
                  }
                : {
                    __type__: "SimpleFetchCondition",
                    field: "id",
                    operator: "GTE",
                    value: (Number(page) - 1) * pageThreshold
                  }
            }
          })
          .then((res) => {
            dispatchProjects(res.data[0]);
          });
      }, 500),
    [search, page]
  );

  return (
    <VStack
      pb="16px"
      overflow="hidden"
      position="relative"
      zIndex={1}
      marginTop="28px"
    >
      <Text
        fontFamily="lexend"
        mr="auto"
        color="gray.20"
        fontSize="28px"
        fontWeight="600"
      >
        Projects Ranking
      </Text>
      <Input
        height="30px"
        px="16px"
        onChange={(e) => {
          const { value } = e.target;
          handleSearchProjects(value);
        }}
        bg="gray.600"
        border="1px solid"
        borderColor="gray.200"
        _hover={{
          borderColor: "gray.300"
        }}
        _active={{ borderColor: "gray.400" }}
        _focus={{ borderColor: "gray.400" }}
        boxShadow="none !important"
        outline="none"
        fontFamily="satoshi"
        fontSize="md"
        color="gray.100"
        fontWeight="400"
        _placeholder={{
          fontWeight: "400",
          color: "gray.100"
        }}
        borderRadius="27px"
        marginTop="16px !important"
        placeholder="Search Project"
      />
      <Box width="full" overflow="auto">
        {projects.length === 0 ? <EmptyState /> : <Table search={search} />}
      </Box>
    </VStack>
  );
};

export default Index;
