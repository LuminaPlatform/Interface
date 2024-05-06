import { Text } from "@chakra-ui/react";

interface InputErrorProps {
  errorMessage: string;
}
export const InputError = ({ errorMessage }: InputErrorProps) => {
  return <Text pt="8px" color="red.200" fontSize="xs"  >{errorMessage}</Text>;
};
