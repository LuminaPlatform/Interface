import { Box, Button, HStack, Img, Text, VStack } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { textTruncator } from "@/utils";
import { TbUserCheck, TbUserPlus } from "react-icons/tb";
import Table from "@/modules/projects/components/Table";

interface PeopleCardProps {
  searchedProjects: any[];
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

const ProjectsTab = ({ searchedProjects }: PeopleCardProps) => {
  return (
    <VStack
      pb="16px"
      overflow="hidden"
      position="relative"
      zIndex={1}
      marginTop="28px"
    >
      <Box width="full" overflow="auto">
        <Table searchedProjects={searchedProjects} />
      </Box>
    </VStack>
  );
};

export default ProjectsTab;
