import { GridItem, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { ProjectDetailProps } from "../types";
import { useProjectData } from "../hooks";
import { Hero } from "../components/Hero";
import { Reviews } from "../components/Reviews";
import { Feedback } from "../components/Feedback";
import Link from "next/link";
import { TbChevronRight } from "react-icons/tb";

export const Index = () => {
  const project = useProjectData();

  console.log(project);

  return (
    <VStack
      pb="16px"
      position="relative"
      zIndex={1}
      marginTop="28px"
      rowGap="16px"
      width="full"
    >
      <Header />
      <VStack
        minHeight="100vh"
        width="full"
        bg="gray.800"
        borderRadius="16px"
        p="24px"
      >
        <Hero />
        <VStack width="full">
          <HStack justifyContent="space-between" width="full">
            <Text
              fontFamily="lexend"
              fontSize="2xl"
              color="gray.20"
              fontWeight="600"
            >
              Reviews
            </Text>
            <HStack>
              <Text
                color="primary.200"
                fontSize="md"
                fontWeight="700"
                as={Link}
                href="#"
              >
                Show All Reviews
              </Text>
              <TbChevronRight
                size="16px"
                color="var(--chakra-colors-primary-200)"
              />
            </HStack>
          </HStack>
          <SimpleGrid width="full" gap="24px" columns={{ base: 1, lg: 3 }}>
            <GridItem
              overflow="auto"
              maxH="575px"
              order={{ base: "1", lg: "0" }}
              colSpan={{ base: 1, lg: 2 }}
            >
              <Reviews />
            </GridItem>
            <GridItem
              order={{ base: "0", lg: "1" }}
              colSpan={{ base: 1, lg: 1 }}
            >
              <Feedback />
            </GridItem>
          </SimpleGrid>
        </VStack>
      </VStack>
    </VStack>
  );
};
