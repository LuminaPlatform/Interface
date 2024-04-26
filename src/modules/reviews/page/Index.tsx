import { Text, VStack } from "@chakra-ui/react";
import TabBar from "../components/TabBar";

const Index = () => {
  return (
    <VStack width="full">
      <Text
        color="gray.20"
        fontSize="28px"
        fontWeight="600"
        mr="auto"
        marginTop="32px"
      >
        Reviews
      </Text>
      <TabBar />
    </VStack>
  );
};

export default Index;
