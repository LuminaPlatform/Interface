import { Text } from "@chakra-ui/react";

interface BadgeProps {
  title: string;
  colorScheme: string;
}
export const Badge = ({ colorScheme, title }: BadgeProps) => (
  <Text
    maxW={{ base: "fit-content", md: "auto" }}
    display="inline-block"
    px="8px"
    lineHeight="24px"
    borderRadius="12px"
    height="24px"
    fontSize="xs"
    fontWeight="bold"
    color={`${colorScheme}.500`}
    background={`${colorScheme}.75`}
  >
    {title}
  </Text>
);
