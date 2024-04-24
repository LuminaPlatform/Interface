import {
  Box,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Header } from "../components/Header";
import { ProjectDetailProps } from "../types";
import { useProjectData } from "../hooks";
import { Hero } from "../components/Hero";
import { Reviews } from "../components/Reviews";
import { Feedback } from "../components/Feedback";
import Link from "next/link";
import { TbChevronRight } from "react-icons/tb";
import { ProjectLink } from "../components/ProjectLink";

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
          <SimpleGrid
            mt="32px"
            width="full"
            gap="24px"
            columns={{ base: 1, lg: 3 }}
          >
            <GridItem colSpan={{ base: 1, lg: 2 }}>
              <VStack rowGap="8px" width="full">
                <Text
                  color="gray.20"
                  fontSize="2xl"
                  fontWeight="600"
                  fontFamily="lexend"
                  width="full"
                  textAlign="left"
                >
                  Contribution
                </Text>
                <Box
                  color="gray.20"
                  fontSize="md"
                  lineHeight="24px"
                  dangerouslySetInnerHTML={{
                    __html: `<p>As a rollup, Optimism leverages Ethereum for settlement & security assurances. It also uses
                    several core infrastructure components (client implementations, specifications, test suites, etc)
                    developed and maintained by Protocol Guild contributors over the years. Optimism also directly
                    benefits from protocol upgrades such as proto-danksharding (ElP-4844), which will reduce the
                    fees its users need to pay.</p>
</br>
<p>All of this work supports a mutual relationship;
- Ethereum provides an infrastructural foundation with particular characteristics (eg social, political, technical, economic) that only it can provide
- Optimism produces lower-cost blockspace, while still inheriting some of Ethereum's
characteristics, but at the same time allowing for more experimentation</p>`,
                  }}
                />
              </VStack>
            </GridItem>
            <GridItem rowGap="12px" colSpan={{ base: 1, lg: 1 }}>
              <Text
                color="gray.20"
                fontSize="xl"
                fontWeight="600"
                fontFamily="lexend"
                mb="12px"
              >
                Contribution links
              </Text>
              <VStack width="full" rowGap="12px">
                {[1, 2, 3, 4].map((item) => (
                  <ProjectLink key={item} showCount={false} />
                ))}
              </VStack>
            </GridItem>
          </SimpleGrid>
          <SimpleGrid
            mt="32px"
            width="full"
            gap="24px"
            columns={{ base: 1, lg: 3 }}
          >
            <GridItem colSpan={{ base: 1, lg: 2 }}>
              <VStack rowGap="8px" width="full">
                <Text
                  color="gray.20"
                  fontSize="2xl"
                  fontWeight="600"
                  fontFamily="lexend"
                  width="full"
                  textAlign="left"
                  mb="12px"
                >
                  Impact
                </Text>
                <Box
                  color="gray.20"
                  fontSize="md"
                  lineHeight="24px"
                  dangerouslySetInnerHTML={{
                    __html: `<p>As a rollup, Optimism leverages Ethereum for settlement & security assurances. It also uses
                    several core infrastructure components (client implementations, specifications, test suites, etc)
                    developed and maintained by Protocol Guild contributors over the years. Optimism also directly
                    benefits from protocol upgrades such as proto-danksharding (ElP-4844), which will reduce the
                    fees its users need to pay.
                    </p>
</br>
<p>All of this work supports a mutual relationship;
- Ethereum provides an infrastructural foundation with particular characteristics (eg social, political, technical, economic) that only it can provide
- Optimism produces lower-cost blockspace, while still inheriting some of Ethereum's
characteristics, but at the same time allowing for more experimentation</p>`,
                  }}
                />
              </VStack>
            </GridItem>
            <GridItem rowGap="12px" colSpan={{ base: 1, lg: 1 }}>
              <Text
                color="gray.20"
                fontSize="xl"
                fontWeight="600"
                fontFamily="lexend"
                mb="12px"
              >
                Impact Metrics
              </Text>
              <VStack width="full" rowGap="12px">
                {[1, 2, 3, 4].map((item) => (
                  <ProjectLink key={item} showCount />
                ))}
              </VStack>
            </GridItem>
          </SimpleGrid>
        </VStack>
      </VStack>
    </VStack>
  );
};
