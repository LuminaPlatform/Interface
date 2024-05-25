import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { TbHeart, TbMoodAngry, TbThumbDown, TbThumbUp } from "react-icons/tb";

export const FeedbackResult = () => {
  const resultData = [
    {
      id: 0,
      icon: <TbHeart color="var(--chakra-colors-gray-0)" fontSize={14} />,
      percent: 10,
      title: "Advocate",
      colorScheme: "green",
    },
    {
      id: 1,
      icon: <TbThumbUp color="var(--chakra-colors-gray-0)" fontSize={14} />,
      percent: 20,
      title: "User",
      colorScheme: "blue",
    },
    {
      id: 2,
      icon: <TbThumbDown color="var(--chakra-colors-gray-0)" fontSize={14} />,
      percent: 5,
      title: "Abstainer",
      colorScheme: "orange",
    },
    {
      id: 3,
      icon: <TbMoodAngry color="var(--chakra-colors-gray-0)" fontSize={14} />,
      percent: 80,
      title: "Opposer",
      colorScheme: "red",
    },
  ];
  return (
    <VStack width="full">
      {resultData.map((result) => (
        <HStack width="full" key={result.id}>
          <Box>{result.icon}</Box>
          <Box
            outline="1px solid"
            outlineColor="gray.0"
            borderRadius="6px"
            width="full"
            pos="relative"
            overflow="hidden"
            height="28px"
            _before={{
              content: "''",
              position: "absolute",
              left: 0,
              bottom: 0,
              width: `${result.percent}%`,
              height: "full",
              bg: `${result.colorScheme}.300`,
              zIndex: 0,
            }}
          >
            <Text
              color="gray.0"
              width="full"
              textAlign="center"
              lineHeight="28px"
              fontSize="xs"
              fontWeight="700"
              pos="relative"
              zIndex={1}
            >
              {result.title}
            </Text>
          </Box>
          <Text fontSize="xs" fontWeight="700" color="gray.0" width="30px">
            {result.percent}%
          </Text>
        </HStack>
      ))}
    </VStack>
  );
};
