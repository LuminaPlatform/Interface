import { Img, Text, VStack } from "@chakra-ui/react";

export const EmptyState = () => {
  return (
    <VStack alignItems="center" rowGap="24px" mt="70px">
      <Img
        alt="projects not found"
        src="/assets/images/projects/empty-state.png"
      />
      <Text
        fontWeight="600"
        fontFamily="lexend"
        fontSize="3xl"
        textAlign="center"
        color="gray.50"
      >
        No Results Found
      </Text>
      <Text
        fontSize="lg"
        lineHeight="28.8px"
        color="gray.50"
        textAlign="center"
        maxW="600px"
        fontWeight="500"
      >
        We couldn&apos;t find any projects matching your search. Try refining
        your query or browse through other exciting content in Lumina!
      </Text>
    </VStack>
  );
};
