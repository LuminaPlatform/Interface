import {
  TbBookmarkFilled,
  TbBookmarkPlus,
  TbChevronRight,
} from "react-icons/tb";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useProjectData } from "../hooks";
import {
  useDispatchSelectedProjects,
  useSelectedProjects,
} from "@/hooks/bases";
import { useMemo } from "react";
import { useAccount } from "wagmi";
import Link from "next/link";
import { BreadCrumb } from "./BreadCrumb";

export const Header = () => {
  const dispatchSelectedProject = useDispatchSelectedProjects();
  const selectedProjects = useSelectedProjects();
  const { query } = useRouter();

  const project = useProjectData();
  console.log({ project });

  const { name } = project;

  const { isConnected } = useAccount();

  const isProjectSelected = useMemo(() => {
    return selectedProjects.find((item) => item.id === project.id);
  }, [project.id, selectedProjects]);
  return (
    <Stack
      width="full"
      justifyContent={{ md: "space-between" }}
      flexDirection={{ base: "column", md: "row" }}
    >
      <BreadCrumb />
      {isConnected && (
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
