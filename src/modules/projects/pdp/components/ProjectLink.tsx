import { Box, HStack, Link, Text } from "@chakra-ui/react";
import { ReactNode, useMemo } from "react";
import { TbBrandGithub, TbExternalLink, TbMap, TbWorld } from "react-icons/tb";

interface ProjectLinkProps {
  showCount: boolean;
  description: string;
  count?: string;
  url: string;
  type?: "CONTRACT_ADDRESS" | "OTHER" | "GITHUB_REPO";
}

export const ProjectLink = ({
  showCount,
  description,
  count,
  url,
  type
}: ProjectLinkProps) => {
  const icons: Record<"CONTRACT_ADDRESS" | "OTHER" | "GITHUB_REPO", ReactNode> =
    useMemo(
      () => ({
        CONTRACT_ADDRESS: (
          <TbMap color="var(--chakra-colors-gray-80)" fontSize="20px" />
        ),
        OTHER: <TbWorld color="var(--chakra-colors-gray-80)" fontSize="20px" />,
        GITHUB_REPO: (
          <TbBrandGithub color="var(--chakra-colors-gray-80)" fontSize="20px" />
        )
      }),
      []
    );
  return (
    <HStack
      justifyContent="space-between"
      borderRadius="8px"
      px="8px"
      py="4px"
      width="full"
      bg="gray.700"
      as={Link}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {type && (
        <Box width="20px" height="20px">
          {icons[type]}
        </Box>
      )}
      <Text fontSize="sm" color="gray.10">
        {description}
      </Text>
      <HStack>
        {showCount && (
          <Text fontSize="sm" color="gray.20">
            {count}
          </Text>
        )}
        <TbExternalLink color="var(--chakra-colors-gray-80)" fontSize="20px" />
      </HStack>
    </HStack>
  );
};
