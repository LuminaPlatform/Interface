import { Text } from "@chakra-ui/react";

export const SettingsModalsHeader = ({ text }: { text: string }) => (
  <Text
    textAlign="center"
    width="full"
    mt="0px"
    color="gray.0"
    fontWeight="600"
    fontFamily="lexend"
  >
    {text}
  </Text>
);
