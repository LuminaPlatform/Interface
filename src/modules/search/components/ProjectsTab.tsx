import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import Table from "@/modules/projects/components/Table";

interface PeopleCardProps {
  search: string;
}

const ProjectsTab = ({ search }: PeopleCardProps) => {
  return (
    <VStack
      pb="16px"
      overflow="hidden"
      position="relative"
      zIndex={1}
      marginTop="28px"
    >
      <Box width="full" overflow="auto">
        <Table highlightNeeded search={search} />
      </Box>
    </VStack>
  );
};

export default ProjectsTab;
