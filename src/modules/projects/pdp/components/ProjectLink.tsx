import { Box, HStack, Text } from "@chakra-ui/react";
import { TbBrandGithub, TbExternalLink } from "react-icons/tb";

interface ProjectLinkProps {
  showCount: boolean;
}
export const ProjectLink = ({ showCount }: ProjectLinkProps) => {
  return (
    <HStack justifyContent="space-between" borderRadius="8px" px="8px" py="4px" width="full" bg="gray.700">
      <Box width="20px" height="20px">
        <TbBrandGithub color="var(--chakra-colors-gray-80)" fontSize="20px" />
      </Box>
      <Text fontSize="sm" color="gray.10">
        Main repository for Ethereum&apos;s core protocol development
      </Text>
      <HStack>
        {showCount && (
          <Text fontSize="sm" color="gray.20">
            110
          </Text>
        )}
        <TbExternalLink color="var(--chakra-colors-gray-80)" fontSize="20px" />
      </HStack>
    </HStack>
  );
};
