import { Box, HStack, Link, Text } from "@chakra-ui/react";
import { TbBrandGithub, TbExternalLink } from "react-icons/tb";

interface ProjectLinkProps {
  showCount: boolean;
  description: string;
  count?: string;
  url: string;
}
export const ProjectLink = ({
  showCount,
  description,
  count,
  url,
}: ProjectLinkProps) => {
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
      <Box width="20px" height="20px">
        <TbBrandGithub color="var(--chakra-colors-gray-80)" fontSize="20px" />
      </Box>
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
