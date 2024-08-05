import { TbBookmarkFilled, TbBookmarkPlus } from "react-icons/tb";
import { Button, Stack } from "@chakra-ui/react";
import { useProjectData } from "../hooks";
import {
  useAuthorization,
  useDispatchSelectedProjects,
  useSelectedProjects,
} from "@/hooks/bases";
import { useMemo } from "react";
import { BreadCrumb } from "./BreadCrumb";

export const Header = () => {
  const dispatchSelectedProject = useDispatchSelectedProjects();
  const selectedProjects = useSelectedProjects();

  const project = useProjectData();
  const { name } = project;

  const isProjectSelected = useMemo(() => {
    return selectedProjects.find((item) => item.id === project.id);
  }, [project.id, selectedProjects]);

  const isAuthorized = useAuthorization();
  return (
    <Stack
      width="full"
      justifyContent={{ md: "space-between" }}
      flexDirection={{ base: "column", md: "row" }}
    >
      <BreadCrumb projectName={name} />
      {!!isAuthorized && (
        <Button
          onClick={() => {
            if (isProjectSelected) {
              dispatchSelectedProject((prev) =>
                prev.filter((item) => item.id !== project.id)
              );
            } else {
              dispatchSelectedProject((prev) => [...prev, project]);
            }
          }}
          size="md"
          variant={isProjectSelected ? "outline" : "primary"}
          leftIcon={
            isProjectSelected ? <TbBookmarkFilled /> : <TbBookmarkPlus />
          }
        >
          {isProjectSelected ? "Added" : "Add to List"}
        </Button>
      )}
    </Stack>
  );
};
