import { HStack, Img, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { getHighlightedText } from "../HighlightText";

interface ProjectCardProps {
  item: any;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const ProjectCard = ({ item, search, setSearch }: ProjectCardProps) => {
  const id = item?.id.toString();
  const { name } = item;
  const imageUrl = item.content.profile?.profileImageUrl;
  return (
    <HStack
      key={item.id}
      bg="gray.600"
      p="8px"
      borderRadius="8px"
      gap="4px"
      cursor="pointer"
      as={Link}
      href={`/projects/${id}`}
      h="48px"
      onClick={() => {
        setSearch("");
      }}
    >
      <Img
        key={item.id}
        rounded="full"
        width="32px"
        minW="32px"
        height="32px"
        minH="32px"
        // src={"/assets/images/search/default-project.png"}
        src={imageUrl || "/assets/images/search/default-project.png"}
        alt={name}
      />
      <Text key={item.id} fontSize="16px">
        {getHighlightedText(name, search)}
      </Text>
    </HStack>
  );
};

export default ProjectCard;
