import { Text } from "@chakra-ui/react";

interface ModalHeaderProps {
  text: string;
}
export const ModalHeader = ({ text }: ModalHeaderProps) => {
  return (
    <Text
      textAlign="center"
      color="gray.0"
      fontSize="xl"
      fontWeight="600"
      fontFamily="lexend"
    >
      {text}
    </Text>
  );
};
