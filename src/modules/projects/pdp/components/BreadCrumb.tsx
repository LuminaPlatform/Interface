import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { TbChevronRight } from "react-icons/tb";

interface BreadCrumbProps {
  projectName: string;
}
export const BreadCrumb = ({ projectName }: BreadCrumbProps) => {
  const router = useRouter();

  return (
    <Breadcrumb
      separator={
        <TbChevronRight size={28} color="var(--chakra-colors-gray-20)" />
      }
    >
      {router?.asPath
        .split("/")
        .slice(1)
        .map((item, index) => {
          const path = router.asPath
            .split("/")
            .slice(1, index + 2)
            .join("/");
          return (
            <BreadcrumbItem key={item}>
              <BreadcrumbLink
                as={Link}
                fontWeight="600"
                fontSize="28px"
                color="gray.20"
                href={`/${path}`}
              >
                {index === 0
                  ? "RetroPGF3 Projects"
                  : Object.is(NaN, Number(item))
                    ? "review"
                    : projectName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
    </Breadcrumb>
  );
};
