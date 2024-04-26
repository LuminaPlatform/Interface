import Table from "@/modules/projects/components/Table";
import { Box } from "@chakra-ui/react";

interface PopularProjectsPanelProps {
  search: string;
}
export const PopularProjectsPanel = ({ search }: PopularProjectsPanelProps) => {
  return (
    <Box width="full" overflow="auto">
      <Table search={search} />
    </Box>
  );
};
