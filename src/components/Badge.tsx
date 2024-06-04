import { Icon, IconProps, Text, TextProps } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface BadgeProps extends TextProps {
  title: string;
  colorScheme: string;
  icon: IconType;
  iconsProps?: IconProps;
}
export const Badge = ({
  colorScheme,
  title,
  icon,
  iconsProps,
  ...cssProps
}: BadgeProps) => (
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
    {...cssProps}
  >
    {icon && (
      <Icon
        as={icon}
        fontSize="16px"
        color={`${colorScheme}.500`}
        {...iconsProps}
      />
    )}

    {title}
  </Text>
);
