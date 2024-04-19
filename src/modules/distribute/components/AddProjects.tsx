import { ModalBase } from "@/components/ModalBase";
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { TbSearch } from "react-icons/tb";
import { AddProjectTable } from "./AddProjectTable";
import { useDispatchSelectedProject, useSelectedProject } from "../hooks";
import { ProjectSearch } from "./ProjectSearch";
import { Project } from "../types";

interface AddProjectsProps {
  onClose: () => void;
}
export const AddProjects = ({ onClose }: AddProjectsProps) => {
  const [search, setSearch] = useState("");
  const globalSelectedProjects = useSelectedProject();
  const DispatchGlobalSelectedProjects = useDispatchSelectedProject();

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
