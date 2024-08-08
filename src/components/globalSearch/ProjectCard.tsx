import { HStack, Img, Text } from "@chakra-ui/react";
import React from "react";

interface ProjectCardProps {
  name: string;
}

const ProjectCard = ({ name }: ProjectCardProps) => {
  return (
    <HStack bg="gray.600" p="8px" borderRadius="8px" gap="4px">
      <Img
        rounded="full"
        width="32px"
        minW="32px"
        height="32px"
        minH="32px"
        src={"/assets/images/default-project.png"}
      />
      <Text color="gray.0" fontSize="16px">
        {name}
      </Text>
    </HStack>
  );
};

export default ProjectCard;
