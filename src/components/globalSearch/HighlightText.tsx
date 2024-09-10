import { Text } from "@chakra-ui/react";

export const getHighlightedText = (text: string, highlight: string) => {
  // Split the text based on the search text
  const parts = text.toLowerCase().split(highlight.toLowerCase());
  const newParts: string[] = [];
  parts.slice(0, -1).forEach((part) => {
    newParts.push(part);
    newParts.push(highlight.toLowerCase());
  });
  newParts.push(parts[parts.length - 1]);
  return newParts.map((part) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <Text as="span" color="primary.300" key={part}>
        {part}
      </Text>
    ) : (
      <Text as="span" color="gray.20" key={part}>
        {part}
      </Text>
    )
  );
};
