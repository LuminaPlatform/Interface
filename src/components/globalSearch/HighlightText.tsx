import { Text } from "@chakra-ui/react";

export const getHighlightedText = (text: string, highlight: string) => {
  // Split the text based on the search text
  const parts = text.toLowerCase().split(highlight.toLowerCase());
  let new_parts: string[] = [];
  parts.slice(0, -1).map((part) => {
    new_parts.push(part);
    new_parts.push(highlight.toLowerCase());
  });
  new_parts.push(parts[parts.length - 1]);
  return new_parts.map((part, i) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <Text as="span" color="primary.300" key={i}>
        {part}
      </Text>
    ) : (
      <Text as="span" color="gray.20" key={i}>
        {part}
      </Text>
    )
  );
};
