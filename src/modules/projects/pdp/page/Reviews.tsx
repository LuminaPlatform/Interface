import { Box, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import { BreadCrumb } from "@/modules/projects/pdp/components/BreadCrumb";
import { ReviewCard } from "@/components/ReviewCard";
import { useProjectData, useProjectReviews } from "../hooks";
import { ProjectReviewDetail } from "../components/reviwes/ProjectReviewDetail";

export const Reviews = () => {
  const reviews = useProjectReviews();
  const project = useProjectData();

  return (
    <VStack
      pb="16px"
      position="relative"
      zIndex={1}
      marginTop="28px"
      rowGap="16px"
      width="full"
      alignItems="flex-start"
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
      <BreadCrumb projectName={project.name} />
      <Grid
        gap="24px"
        width="full"
        gridTemplateColumns={{ base: "1fr", md: "1fr 0.5fr", lg: "1fr 266px" }}
      >
        <GridItem
          as={VStack}
          rowGap="16px"
          order={{ base: 1, md: 0 }}
          width="full"
        >
          {reviews.length === 0 ? (
            <Text
              mt="48px"
              width="full"
              textAlign="center"
              color="gray.0"
              fontSize="2xl"
            >
              There isn&apos;t any review
            </Text>
          ) : (
            reviews?.map((review) => (
              <ReviewCard
                key={review.id}
                project={project}
                review={review}
                showProjectName={false}
              />
            ))
          )}
        </GridItem>
        <GridItem
          position={{ md: "sticky" }}
          top="0"
          right="0"
          order={{ base: 0, md: 1 }}
          height="fit-content"
          width="full"
        >
          <ProjectReviewDetail />
        </GridItem>
      </Grid>
    </VStack>
  );
};
