import { Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface BadgeProps {
  title: string;
  colorScheme: string;
  icon: IconType;
}
export const Badge = ({ colorScheme, title, icon }: BadgeProps) => (
  <Text
    maxW={{ base: "fit-content", md: "auto" }}
    display="flex"
    px="8px"
    lineHeight="24px"
    borderRadius="12px"
    height="24px"
    fontSize="xs"
    fontWeight="bold"
    color={`${colorScheme}.500`}
    background={`${colorScheme}.75`}
    columnGap="8px"
    alignItems="center"
  >
    <Icon as={icon} fontSize="16px" color={`${colorScheme}.500`} />
    {title}
  </Text>
);
