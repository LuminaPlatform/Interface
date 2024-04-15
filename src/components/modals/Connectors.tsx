import { dataConnectors } from "@/constant";
import { Button, Img, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useConnect } from "wagmi";

export const Connectors = () => {
  const { connectors, connect } = useConnect();
  console.log({ connectors });

  return (
    <VStack
      as={motion.div}
      exit={{
        opacity: 0,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      padding="0"
      margin="0"
    >
      {connectors?.map((connector) => (
        <Button
          onClick={() => connect({ connector })}
          justifyContent="flex-start"
          columnGap="6px"
          width="full"
          key={connector.uid}
          display="flex"
          fontSize="md"
        >
          <Img
            width="28px"
            src={
              connector.icon ||
              dataConnectors.find((data) => data.type === connector.type)?.icon
            }
          />
          <Text as="span">{connector.name}</Text>
        </Button>
      ))}
    </VStack>
  );
};
