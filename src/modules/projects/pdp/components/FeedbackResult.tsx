import { reviewStatuses } from "@/constant";
import { ReviewStatus } from "@/types";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  TbHeart,
  TbHeartFilled,
  TbMoodAngry,
  TbThumbDown,
  TbThumbDownFilled,
  TbThumbUp,
  TbThumbUpFilled,
} from "react-icons/tb";
import { useProjectData } from "../hooks";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";

export const FeedbackResult = ({
  hasAccessWriteReview,
  setStatus,
  status,
}: {
  status: string;
  hasAccessWriteReview: boolean;
  setStatus: Dispatch<SetStateAction<string>>;
}) => {
  const project = useProjectData();

  const { viewpoints } = project;

  const totalLength = Object.values(viewpoints).reduce<number>(
    (accumulator, currentValue) => Number(accumulator) + Number(currentValue),
    0
  );
  const percentageCalculator = (count: number) => {
    if (totalLength !== 0) {
      return (count * 100) / totalLength;
    }
    return 0;
  };

  return (
    <VStack width="full">
      {reviewStatuses.map((result) => (
        <HStack
          width="full"
          key={result.id}
          {...(hasAccessWriteReview && {
            cursor: "pointer",
            onClick: () => {
              setStatus(result.name);
            },
          })}
        >
          <Box
            color={
              !hasAccessWriteReview ? `${result.colorScheme}.300` : "gray.0"
            }
            as={result.icon}
          />
          <Box
            transition="outline 0.2s"
            outline="1px solid"
            outlineColor="gray.0"
            borderRadius="6px"
            width="full"
            pos="relative"
            overflow="hidden"
            height="28px"
            _before={{
              content: "''",
              position: "absolute",
              left: 0,
              bottom: 0,
              width: `${percentageCalculator(+viewpoints[result.name])}%`,
              height: "full",
              bg: `${result.colorScheme}.300`,
              zIndex: 0,
            }}
            {...((!hasAccessWriteReview || status === result.name) && {
              outlineColor: `${result.colorScheme}.300`,
            })}
            {...(hasAccessWriteReview && {
              _hover: {
                outlineColor: `${result.colorScheme}.300`,
              },
            })}
          >
            <Text
              color="gray.0"
              width="full"
              textAlign="center"
              lineHeight="28px"
              fontSize="xs"
              fontWeight="700"
              pos="relative"
              zIndex={1}
            >
              {result.name}
            </Text>
          </Box>
          <Text fontSize="xs" fontWeight="700" color="gray.0" width="30px">
            {viewpoints[result.name]}
          </Text>
        </HStack>
      ))}
    </VStack>
  );
};
