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
import { useProjectData } from "../hooks";
import { Hero } from "../components/Hero";
import { Reviews } from "../components/Reviews";
import { Feedback } from "../components/Feedback";
import Link from "next/link";
import { TbChevronRight } from "react-icons/tb";
import { ProjectLink } from "../components/ProjectLink";

export const Index = () => {
  const project = useProjectData();
  const {
    id,
    content: {
      contributionLinks,
      contributionDescription,
      impactDescription,
      impactMetrics,
    },
  } = project;

  const { isOpen, onOpen, onClose } = useDisclosure();

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
                href={`/projects/${id}/reviews`}
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
              maxH="384px"
              order={{ base: "1", lg: "0" }}
              colSpan={{ base: 1, lg: 2 }}
            >
              <Reviews isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            </GridItem>
            <GridItem
              order={{ base: "0", lg: "1" }}
              colSpan={{ base: 1, lg: 1 }}
              bg="gray.700"
              borderRadius="10px"
              p="16px"
            >
              <Feedback
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                headerTitle="Which status best describes your view of the project?"
              />
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
                <Text color="gray.20" fontSize="md" lineHeight="24px">
                  {contributionDescription}
                </Text>
              </VStack>
            </GridItem>
            <GridItem maxH="352px" overflowY='auto' rowGap="12px" colSpan={{ base: 1, lg: 1 }}>
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
                {contributionLinks.data.map((item) => (
                  <ProjectLink
                    description={item.description}
                    url={item.url}
                    key={item.url}
                    showCount={false}
                    type={item.type}
                  />
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
                <Text color="gray.20" fontSize="md" lineHeight="24px">
                  {impactDescription}
                </Text>
              </VStack>
            </GridItem>
            <GridItem maxH="352px" overflowY='auto' rowGap="12px" colSpan={{ base: 1, lg: 1 }}>
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
                {impactMetrics.data.map((item) => (
                  <ProjectLink
                    key={item.url}
                    description={item.description}
                    showCount
                    url={item.url}
                    count={item.number}
                  />
                ))}
              </VStack>
            </GridItem>
          </SimpleGrid>
        </VStack>
      </VStack>
    </VStack>
  );
};
