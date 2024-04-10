import { Divider, HStack, Text } from "@chakra-ui/react";

export const MethodSeparator = () => {
  return (
    <HStack width="full">
      <Divider width="full" borderColor="gray.700" />
      <Text color="gray.60" fontSize="lg" fontWeight="500">
        or
      </Text>
      <Divider width="full" borderColor="gray.700" />
    </HStack>
  );
};
