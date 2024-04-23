import { TbBookmarkPlus, TbChevronRight } from "react-icons/tb";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useProjectData } from "../hooks";

export const Header = () => {
  const { query } = useRouter();
  const {
    project: { name },
  } = useProjectData();
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
      <Button size="md" variant="primary" leftIcon={<TbBookmarkPlus />}>
        Add to List
      </Button>
    </Stack>
  );
};
