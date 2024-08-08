import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
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
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface CategoryModalProps {
  title: string;
  setData: Dispatch<SetStateAction<any[]>>;
  onClose: UseDisclosureProps["onClose"];
  selectedData: any[];
  type: "CATEGORIES" | "PEOPLE";
}
export const CategoryModal = ({
  title,
  setData,
  onClose,
  selectedData,
  type
}: CategoryModalProps) => {
  const [interests, setInterests] = useState([]);
  const [selectors, setSelector] = useState(selectedData);
  const [isLoading, setLoading] = useState(false);

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
              variant={selectors.includes(item.id) ? "lightOrange" : "dark"}
              key={item.id}
            >
              <TagLabel>{item.title}</TagLabel>
            </Tag>
          ))}
        </HStack>
      )}
      <HStack justifyContent="flex-end" width="full">
        <Button
          onClick={() => {
            setSelector([]);
            onClose();
          }}
          variant="outline"
          size="md"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            setData(selectors);
            onClose();
          }}
          variant="primary"
        >
          Save Changes
        </Button>
      </HStack>
    </VStack>
  );
};
