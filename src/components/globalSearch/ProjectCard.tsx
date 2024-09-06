import { HStack, Img, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface ProjectCardProps {
  name: string;
  search: string;
  id: string;
  imageUrl: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const getHighlightedText = (text: string, highlight: string) => {
  // Split the text based on the search text
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <Text as="span" color="primary.300" key={i}>
        {part}
      </Text>
    ) : (
      <Text as="span" color="gray.20" key={i}>
        {part}
      </Text>
    )
  );
};

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
