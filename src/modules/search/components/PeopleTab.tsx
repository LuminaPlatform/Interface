import { Box, Spinner, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";
import { EmptyState } from "@/modules/projects/components/EmptyState";
import { PeopleCard } from "./peopleCard";

interface SearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const PeopleTab = ({ searchState }: { searchState: SearchProps }) => {
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { search, setSearch } = searchState;

  useEffect(() => {
    if (search !== "") {
      setIsLoading(true);
      axiosClient
        .post(apiKeys.fetch, {
          0: {
            model: "User",
            model_id: "None",
            orders: [],
            graph: {
              fetch_fields: [
                {
                  name: "*"
                }
                // {
                //   name: "wallets",
                //   graph: {
                //     fetch_fields: [
                //       {
                //         name: "*"
                //       }
                //     ]
                //   }
                // }
              ]
            },
            condition: {
              __type__: "SimpleFetchCondition",
              field: "username",
              operator: "LIKE",
              value: search
            }
          }
        })
        .then((res) => {
          setSearchedUsers(res.data[0]);
        })
        .finally(() => setIsLoading(false));
    } else {
      setSearchedUsers([]);
    }
  }, [search]);

  return (
    <VStack w="full" gap="16px">
      {isLoading && <Spinner color="primary.300" />}
      {!isLoading &&
        (searchedUsers.length === 0 ? (
          <Box width="full" overflow="auto">
            <EmptyState />
          </Box>
        ) : (
          searchedUsers.map((users: any) => (
            <PeopleCard
              key={users?.id}
              id={users?.id.toString()}
              setSearch={setSearch}
              search={search}
              email={users.email}
              name={users?.username || users?.x_username || users?.display_name}
              walletAddress={users.wallets?.address}
            />
          ))
        ))}
    </VStack>
  );
};
