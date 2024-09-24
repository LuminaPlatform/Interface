import { Box, Spinner, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";
import { ReviewCard } from "@/components/ReviewCard";
import { EmptyState } from "@/modules/projects/components/EmptyState";

interface SearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const ReviewTab = ({ searchState }: { searchState: SearchProps }) => {
  const [searchedReviews, setSearchedReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    search
    // , setSearch
  } = searchState;

  useEffect(() => {
    if (search !== "") {
      setIsLoading(true);
      axiosClient
        .post(apiKeys.fetch, {
          0: {
            model: "Review",
            model_id: "None",
            orders: [],
            graph: {
              fetch_fields: [
                {
                  name: "*"
                },
                {
                  name: "files",
                  graph: {
                    fetch_fields: [
                      {
                        name: "*"
                      }
                    ]
                  }
                },
                {
                  name: "user",
                  graph: {
                    fetch_fields: [
                      {
                        name: "display_name"
                      },
                      {
                        name: "id"
                      },
                      {
                        name: "profile_id"
                      }
                    ]
                  }
                },
                {
                  name: "project",
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
                      { name: "content.applicantType" },
                      { name: "content.websiteUrl" },
                      { name: "content.bio" },
                      { name: "content.profile" },
                      { name: "content.applicant" },
                      { name: "content.contributionDescription" },
                      { name: "content.contributionLinks" },
                      { name: "content.impactDescription" },
                      { name: "content.impactMetrics" },
                      { name: "content.impactCategory" }
                    ]
                  }
                }
              ]
            },
            condition: {
              __type__: "SimpleFetchCondition",
              field: "title",
              operator: "LIKE",
              value: search
            }
          }
        })
        .then((res) => {
          setSearchedReviews(res.data[0]);
        })
        .finally(() => setIsLoading(false));
    } else {
      setSearchedReviews([]);
    }
  }, [search]);

  return (
    <VStack w="full" gap="16px">
      {isLoading && <Spinner color="primary.300" />}
      {!isLoading &&
        (searchedReviews.length === 0 ? (
          <Box width="full" overflow="auto">
            <EmptyState />
          </Box>
        ) : (
          searchedReviews.map((reviews) => (
            <ReviewCard
              project={reviews.project}
              showProjectName
              review={reviews}
              key={reviews.id}
              highlightNeeded
              search={search}
            />
          ))
        ))}
    </VStack>
  );
};
