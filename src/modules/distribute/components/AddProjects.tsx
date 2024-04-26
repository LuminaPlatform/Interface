import { Button, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { AddProjectTable } from "./AddProjectTable";
import { ProjectSearch } from "./ProjectSearch";
import {
  useDispatchSelectedProjects,
  useSelectedProjects,
} from "@/hooks/bases";
import { Project } from "@/modules/projects/types";

interface AddProjectsProps {
  onClose: () => void;
}
export const AddProjects = ({ onClose }: AddProjectsProps) => {
  const [search, setSearch] = useState("");
  const globalSelectedProjects = useSelectedProjects();
  const DispatchGlobalSelectedProjects = useDispatchSelectedProjects();

  const [selectedProjects, setSelectedProjects] = useState<Array<Project>>(
    () => globalSelectedProjects
  );

  return (
    <VStack width={{ md: "616px" }} rowGap="16px">
      <Text fontSize="lg" color="gray.0">
        Select projects to Allocate your OP
      </Text>
      <ProjectSearch search={search} setSearch={setSearch} />
      <AddProjectTable
        search={search}
        selectedProjects={selectedProjects}
        setSelectedProjects={setSelectedProjects}
      />
      <Button
        onClick={() => {
          DispatchGlobalSelectedProjects(selectedProjects);
          onClose();
        }}
        alignSelf="flex-end"
        variant="primary"
        isDisabled={selectedProjects.length === 0}
      >
        Add to List
      </Button>
    </VStack>
  );
};
