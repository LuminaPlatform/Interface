import { Box, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Table from "../components/Table";

const Index = () => {
  const [search, setSearch] = useState("");

  return (
    <VStack
      pb="16px"
      overflow="hidden"
      position="relative"
      zIndex={1}
      marginTop="28px"
    >
      <Text
        fontFamily="lexend"
        mr="auto"
        color="gray.20"
        fontSize="28px"
        fontWeight="600"
      >
        Projects Ranking
      </Text>
      <Input
        height="30px"
        px="16px"
        value={search}
        onChange={(e) => {
          const value = e.target.value.replace(/^\s+|\s+$/g, "");
          setSearch(value);
        }}
        bg="gray.600"
        border="1px solid"
        borderColor="gray.200"
        _hover={{
          borderColor: "gray.300",
        }}
        _active={{ borderColor: "gray.400" }}
        _focus={{ borderColor: "gray.400" }}
        boxShadow="none !important"
        outline="none"
        fontFamily="satoshi"
        fontSize="md"
        color="gray.100"
        fontWeight="400"
        _placeholder={{
          fontWeight: "400",
          color: "gray.100",
        }}
        borderRadius="27px"
        marginTop="16px !important"
        placeholder="Search Project"
      />
      <Box width="full" overflow="auto">
        <Table search={search} />
      </Box>
    </VStack>
  );
};

export default Index;
