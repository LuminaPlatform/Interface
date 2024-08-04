"use client";
import {
  GridItem,
  HStack,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { TbChevronRight } from "react-icons/tb";
import { useProjectData, useProjectReviews } from "../hooks";
import { useEffect, useRef, useState } from "react";
import { Reviews } from "./Reviews";
import { Feedback } from "./Feedback";
import { ProjectLink } from "./ProjectLink";

export const Contribution = () => {
  const project = useProjectData();
  const reviews = useProjectReviews();
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
  const contributionRef = useRef<HTMLDivElement>();
  const [contributionHeight, setContributionHeight] = useState(
    contributionRef?.current?.clientHeight
  );
  useEffect(() => {
    setContributionHeight(contributionRef?.current?.clientHeight);
  }, [contributionRef?.current?.clientHeight]);

  const impactRef = useRef<HTMLDivElement>();
  const [impactHeight, setImpactHeight] = useState(
    impactRef?.current?.clientHeight
  );
  useEffect(() => {
    setImpactHeight(impactRef?.current?.clientHeight);
  }, [impactRef?.current?.clientHeight]);

  return (
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
        {reviews.length !== 0 && (
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
        )}
      </HStack>
      <SimpleGrid width="full" gap="24px" columns={{ base: 1, lg: 3 }}>
        <GridItem
          h={
            !!project.userRole.find((role: any) =>
              role.name.includes("BETA_USER")
            )
              ? "384px"
              : "276px"
          }
          overflow="auto"
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
        minH="325px"
      >
        <GridItem ref={contributionRef} colSpan={{ base: 1, lg: 2 }}>
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
        {contributionHeight && (
          <GridItem
            overflowY="auto"
            rowGap="12px"
            colSpan={{ base: 1, lg: 1 }}
            maxH={contributionHeight}
          >
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
        )}
      </SimpleGrid>
      <SimpleGrid
        mt="32px"
        width="full"
        gap="24px"
        columns={{ base: 1, lg: 3 }}
        minH="325px"
      >
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <VStack ref={impactRef} rowGap="8px" width="full">
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
        {impactHeight && (
          <GridItem
            maxHeight={impactHeight}
            overflowY="auto"
            rowGap="12px"
            colSpan={{ base: 1, lg: 1 }}
          >
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
        )}
      </SimpleGrid>
    </VStack>
  );
};
