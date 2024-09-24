import { Text } from "@chakra-ui/react";

export const getHighlightedText = (text: string, highlight: string) => {
  const parts = text.toLowerCase().split(highlight.toLowerCase());

  return parts.map((part, index) => (
    <>
      <Text as="span" color="gray.20" key={part}>
        {part}
      </Text>
      {index < parts.length - 1 && (
        <Text as="span" color="primary.300" key={part}>
          {highlight}
        </Text>
      )}
    </>
  ));
};
