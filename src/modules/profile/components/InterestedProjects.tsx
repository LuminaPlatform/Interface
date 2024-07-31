import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useUserProfile } from "../hooks";

const projects = Array(2)
  .fill("")
  .map((_, index) => index);
export const InterestedProjects = () => {
  const { userProjectsCategories } = useUserProfile();

  return (
    <VStack rowGap="24px" width="full" p="24px">
      <Text
        fontSize="xl"
        color="gray.40"
        fontFamily="lexend"
        width="full"
        textAlign="left"
        fontWeight="600"
      >
        Projects Interests
      </Text>
      <HStack gap="8px" width="full" flexWrap="wrap">
        {userProjectsCategories?.map((item) => (
          <Text
            borderRadius="12px"
            color="primary.400"
            bg="gray.40"
            lineHeight="32px"
            height="32px"
            px="8px"
            key={item.id}
            fontSize="md"
            fontWeight="700"
          >
            {item.name}
          </Text>
        ))}
      </HStack>
    </VStack>
  );
};
