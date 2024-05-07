import {
  Button,
  HStack,
  Tag,
  TagLabel,
  Text,
  UseDisclosureProps,
  VStack,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

interface CategoryModalProps {
  data: any[];
  title: string;
  setData: Dispatch<SetStateAction<any[]>>;
  onClose: UseDisclosureProps["onClose"];
  selectedData: any[];
}
export const CategoryModal = ({
  data,
  title,
  setData,
  onClose,
  selectedData,
}: CategoryModalProps) => {
  const [selectors, setSelector] = useState(selectedData);

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
      <HStack
        mb="16px"
        rowGap="16px"
        columnGap="8px"
        width="full"
        flexWrap="wrap"
      >
        {data.map((item) => (
          <Tag
            cursor="pointer"
            onClick={() => {
              const index = selectors.findIndex((tag) => tag.id === item.id);
              console.log({ index });

              if (index !== -1) {
                setSelector((prev) => prev.filter((tag) => tag.id !== item.id));
              } else {
                setSelector((prev) => [...prev, item]);
              }
            }}
            size="md"
            variant={
              selectors.find((tag) => tag.id === item.id)
                ? "lightOrange"
                : "dark"
            }
            key={item.id}
          >
            <TagLabel>{item.title}</TagLabel>
          </Tag>
        ))}
      </HStack>
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
