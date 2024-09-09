import { Box, Text, VStack } from "@chakra-ui/react";
import React from "react";
import Table from "@/modules/projects/components/Table";

interface PeopleCardProps {
  searchedProjects: any[];
  search: string;
}

const ProjectsTab = ({ searchedProjects, search }: PeopleCardProps) => {
  return (
    <VStack
      pb="16px"
      overflow="hidden"
      position="relative"
      zIndex={1}
      marginTop="28px"
    >
      <Box width="full" overflow="auto">
        <Table
          searchText={search}
          highlightNeeded={true}
          searchedProjects={searchedProjects}
        />
      </Box>
    </VStack>
  );
};

export default ProjectsTab;
