import {
  Box,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import dynamic from "next/dynamic";

const Contribution = dynamic(
  () =>
    import("../components/Contribution").then(
      (modules) => modules.Contribution
    ),
  {
    ssr: false,
  }
);

export const Index = () => {
  return (
    <VStack
      pb="16px"
      position="relative"
      zIndex={1}
      marginTop="28px"
      rowGap="16px"
      width="full"
    >
      <Box
        zIndex={-1}
        position="fixed"
        top="0"
        right="0"
        boxShadow={`0 0 ${150}px ${150}px rgba(255,136,0,0.5)`}
        rounded="full"
        opacity="0.3"
        width="100px"
        height="100px"
        backgroundColor="rgba(255,136,0,0.5)"
      />
      <Header />
      <VStack
        minHeight="100vh"
        width="full"
        bg="gray.800"
        borderRadius="16px"
        p="24px"
      >
        <Hero />
        <Contribution />
      </VStack>
    </VStack>
  );
};
