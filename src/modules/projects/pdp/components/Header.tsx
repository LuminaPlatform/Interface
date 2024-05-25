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
      <Breadcrumb
        separator={
          <TbChevronRight size={28} color="var(--chakra-colors-gray-20)" />
        }
      >
        <BreadcrumbItem>
          <BreadcrumbLink
            fontWeight="600"
            fontSize="28px"
            color="gray.20"
            href="/projects"
          >
            RetroPGF3 Projects
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink
            fontWeight="600"
            fontSize="28px"
            color="gray.20"
            href={`/project${query.projectId}`}
          >
            {name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
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
