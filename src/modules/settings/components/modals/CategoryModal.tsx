import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import { useDispatchGlobalUserData, useGlobalUserData } from "@/hooks/bases";
import {
  Button,
  HStack,
  Spinner,
  Tag,
  TagLabel,
  Text,
  UseDisclosureProps,
  VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface CategoryModalProps {
  title: string;
  onClose: UseDisclosureProps["onClose"];
  selectedData: any[];
  type: "CATEGORIES" | "PEOPLE";
}
export const CategoryModal = ({
  title,
  onClose,
  selectedData,
  type
}: CategoryModalProps) => {
  const [interests, setInterests] = useState([]);
  const [selectors, setSelector] = useState(selectedData);
  const [isLoading, setLoading] = useState(false);
  const [isFetchingLoading, setFetchingLoading] = useState(false);

  const globalUser = useGlobalUserData();
  const dispatchGlobalUser = useDispatchGlobalUserData();

  useEffect(() => {
    setLoading(true);
    if (type === "CATEGORIES") {
      axiosClient
        .post(apiKeys.fetch, {
          0: {
            model: "ProjectCategory",
            model_id: "None",
            orders: [],
            graph: {
              fetch_fields: [
                {
                  name: "*"
                }
              ]
            }
          }
        })
        .then((res) => {
          setInterests(res.data[0]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    if (type === "PEOPLE") {
      axiosClient
        .post(apiKeys.fetch, {
          0: {
            model: "Expertise",
            model_id: "None",
            orders: [],
            graph: {
              fetch_fields: [
                {
                  name: "*"
                }
              ]
            }
          }
        })
        .then((res) => {
          setInterests(res.data[0]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <VStack rowGap="16px" width="full">
      <Text
        fontSize="15px"
        color="gray.0"
        lineHeight="21.6px"
        maxW="556px"
        textAlign="center"
      >
        {title}
      </Text>
      {isLoading ? (
        <Spinner color="primary.300" />
      ) : (
        <HStack
          mb="16px"
          rowGap="16px"
          columnGap="8px"
          width="full"
          flexWrap="wrap"
        >
          {interests?.map((item) => (
            <Tag
              cursor="pointer"
              onClick={() => {
                const index = selectors.findIndex((tag) => tag.id === item.id);
                if (index !== -1) {
                  setSelector((prev) =>
                    prev.filter((tag) => tag.id !== item.id)
                  );
                } else {
                  setSelector((prev) => [...prev, item]);
                }
              }}
              size="md"
              variant={
                selectors.find((selector) => selector.id === item.id)
                  ? "lightOrange"
                  : "dark"
              }
              key={item.id}
            >
              <TagLabel>{item.name}</TagLabel>
            </Tag>
          ))}
        </HStack>
      )}
      <HStack justifyContent="flex-end" width="full">
        <Button
          onClick={() => {
            onClose();
          }}
          variant="outline"
          size="md"
        >
          Cancel
        </Button>
        <Button
          isLoading={isFetchingLoading}
          isDisabled={isFetchingLoading}
          onClick={() => {
            const params = {
              [type === "CATEGORIES"
                ? "interested_categories"
                : "interested_expertises"]: selectors
                .filter((item) => {
                  if (type === "CATEGORIES") {
                    return !globalUser.projectCategories.some(
                      (category: { id: number; name: string }) =>
                        category.id === item.id
                    );
                  }
                  return !globalUser.interestedExpertises.some(
                    (category: { id: number; name: string }) =>
                      category.id === item.id
                  );
                })
                .map((item) => item.id)
            };
            setFetchingLoading(true);
            axiosClient
              .post(apiKeys.relation.add, {
                "0": {
                  model_name: "User",
                  params,
                  id: globalUser?.user?.id
                }
              })
              .then(() => {
                if (type === "CATEGORIES") {
                  const data = [
                    ...selectors.filter((item) => {
                      return !globalUser.projectCategories.some(
                        (category: { id: number; name: string }) =>
                          category.id === item.id
                      );
                    }),
                    ...globalUser.projectCategories
                  ];
                  dispatchGlobalUser({
                    ...globalUser,
                    projectCategories: data
                  });
                  setSelector(data);
                } else {
                  const data = [
                    ...selectors.filter((item) => {
                      return !globalUser.interestedExpertises.some(
                        (category: { id: number; name: string }) =>
                          category.id === item.id
                      );
                    }),
                    ...globalUser.interestedExpertises
                  ];
                  dispatchGlobalUser({
                    ...globalUser,
                    interestedExpertises: data
                  });
                  setSelector(data);
                }
              })
              .finally(() => {
                onClose();
                setFetchingLoading(false);
              });
          }}
          variant="primary"
        >
          Save Changes
        </Button>
      </HStack>
    </VStack>
  );
};
