import { HStack, Img, Text } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { getHighlightedText } from "../HighlightText";

interface PeopleCardProps {
  item: any;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const PeopleCard = ({ item, search, setSearch }: PeopleCardProps) => {
  const name = item?.username || item?.x_username || item?.display_name;
  return (
    <HStack
      bg="gray.600"
      py="8px"
      px="12px"
      borderRadius="8px"
      gap="4px"
      cursor="pointer"
      as={Link}
      href={`/profile/${item.id}`}
      onClick={() => setSearch("")}
    >
      <Img
        rounded="full"
        width="32px"
        minW="32px"
        height="32px"
        minH="32px"
        src={
          item.id
            ? `${process.env.NEXT_PUBLIC_BASE_FILE_URL}/${item.id}`
            : "/assets/images/default-img.png"
        }
        alt={name}
      />

      <Text color="gray.0" fontSize="16px">
        {getHighlightedText(name, search)}
      </Text>
    </HStack>
  );
};

export default PeopleCard;
