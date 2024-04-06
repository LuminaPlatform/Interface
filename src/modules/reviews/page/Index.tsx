import { Text, VStack } from "@chakra-ui/react";
import TabBar from "../components/TabBar";
import { QueryParamProvider } from "use-query-params";
import NextAdapterApp from "next-query-params/app";

const Index = () => {
  return (
    <QueryParamProvider adapter={NextAdapterApp}>
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
    </QueryParamProvider>
  );
};

export default Index;
