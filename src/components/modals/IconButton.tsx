import { Button, HStack, Icon, Img, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaArrowRightLong } from "react-icons/fa6";

interface IconButtonProps {
  onClick: () => void;
  icon?: IconType | string;
  text: string;
}

export const IconButton = ({ onClick, icon, text }: IconButtonProps) => {
  return (
    <Button
      bg="gray.700"
      _hover={{
        bg: "gray.800"
      }}
      _active={{
        bg: "gray.900"
      }}
      height="48px"
      px="12px"
      width="full"
      justifyContent="space-between"
      onClick={onClick}
      display="flex"
    >
      <HStack>
        {icon &&
          (typeof icon === "string" ? (
            <Img width="30px" src={icon} />
          ) : (
            <Icon fontSize={21} color="gray.0" as={icon} />
          ))}
        <Text color="gray.40" fontSize="md" fontWeight="700">
          {text}
        </Text>
      </HStack>
      <FaArrowRightLong color="var(--chakra-colors-gray-0)" />
    </Button>
  );
};
