import {
  Box,
  Button,
  CloseButton,
  HStack,
  Tag,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import { TbPlus } from "react-icons/tb";

const interests = [
  {
    id: 0,
    title: "Metaverse",
  },
  {
    id: 0,
    title: "Lend & Borrow",
  },
];
export const Interests = () => {
  return (
    <VStack
      rowGap="16px"
      zIndex={1}
      borderRadius="12px"
      width="full"
      p="24px"
      bg="gray.800"
    >
      <Text
        mb="8px"
        textAlign="left"
        width="full"
        color="gray.40"
        fontFamily="lexend"
        fontSize="xl"
        fontWeight="600"
      >
        Interests
      </Text>

      <VStack p="16px" borderRadius="12px" bg="gray.700" width="full">
        <HStack justifyContent="space-between" width="full">
          <Text fontSize="md" fontWeight="700" color="gray.40">
            Projects
          </Text>
          <Button
            size="sm"
            borderRadius="17px"
            leftIcon={<TbPlus />}
            variant="outline"
          >
            Add Categories
          </Button>
        </HStack>
        <HStack width="full" flexWrap="wrap">
          {interests.map((item) => (
            <Tag
              key={item.id}
              minWidth="75px"
              size="sm"
              variant="lightOrange"
              columnGap="8px"
            >
              <CloseButton w="16px" height="16px" size="sm" color="gray.300" />
              <TagLabel>{item.title}</TagLabel>
            </Tag>
          ))}
        </HStack>
      </VStack>
      <VStack p="16px" borderRadius="12px" bg="gray.700" width="full">
        <HStack justifyContent="space-between" width="full">
          <Text fontSize="md" fontWeight="700" color="gray.40">
            People
          </Text>
          <Button
            size="sm"
            borderRadius="17px"
            leftIcon={<TbPlus />}
            variant="outline"
          >
            Add Categories
          </Button>
        </HStack>
        <HStack width="full" flexWrap="wrap">
          {interests.map((item) => (
            <Tag
              key={item.id}
              minWidth="75px"
              size="sm"
              variant="lightOrange"
              columnGap="8px"
            >
              <CloseButton w="16px" height="16px" size="sm" color="gray.300" />
              <TagLabel>{item.title}</TagLabel>
            </Tag>
          ))}
        </HStack>
      </VStack>
    </VStack>
  );
};
