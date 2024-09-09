import { HStack, Img, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { getHighlightedText } from "./HighlightText";

interface ProjectCardProps {
  name: string;
  search: string;
  id: string;
  imageUrl: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const ProjectCard = ({
  name,
  search,
  id,
  imageUrl,
  setSearch,
}: ProjectCardProps) => {
  return (
    <HStack
      bg="gray.600"
      p="8px"
      borderRadius="8px"
      gap="4px"
      cursor="pointer"
      as={Link}
      href={`/projects/${id}`}
      onClick={() => {
        setSearch("");
        console.log(`/projects/${id}`);
      }}
    >
      <Img
        rounded="full"
        width="32px"
        minW="32px"
        height="32px"
        minH="32px"
        // src={"/assets/images/search/default-project.png"}
        src={!!imageUrl ? imageUrl : "/assets/images/default-img.png"}
      />
      <Text fontSize="16px">{getHighlightedText(name, search)}</Text>
    </HStack>
  );
};

export default ProjectCard;
