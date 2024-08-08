import { HStack, Img, Text } from "@chakra-ui/react";
import React from "react";

interface PeopleCardProps {
  name: string;
}

const PeopleCard = ({ name }: PeopleCardProps) => {
  return (
    <HStack bg="gray.600" py="8px" px="12px" borderRadius="8px" gap="4px">
      <Img
        rounded="full"
        width="32px"
        minW="32px"
        height="32px"
        minH="32px"
        src={"/assets/images/default-avatar.png"}
      />
      <Text color="gray.0" fontSize="16px">
        {name}
      </Text>
    </HStack>
  );
};

export default PeopleCard;
