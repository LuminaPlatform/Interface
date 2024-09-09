import { HStack, Img, Text } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { getHighlightedText } from "./HighlightText";

interface PeopleCardProps {
  name: string;
  search: string;
  id: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const PeopleCard = ({ name, search, id, setSearch }: PeopleCardProps) => {
  return (
    <HStack
      bg="gray.600"
      py="8px"
      px="12px"
      borderRadius="8px"
      gap="4px"
      cursor="pointer"
      as={Link}
      href={`/profile/${id}`}
      onClick={() => setSearch("")}
    >
      <Img
        rounded="full"
        width="32px"
        minW="32px"
        height="32px"
        minH="32px"
        src={
          !!id
            ? `${process.env.NEXT_PUBLIC_BASE_FILE_URL}/${id}`
            : "/assets/images/default-img.png"
        }
      />

      <Text color="gray.0" fontSize="16px">
        {getHighlightedText(name, search)}
      </Text>
    </HStack>
  );
};

export default PeopleCard;
