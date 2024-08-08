import { HStack, Img, Text, VStack } from "@chakra-ui/react";
import React from "react";

interface ReviewCardProps {
  title: string;
  text: string;
  name: string;
  date: string;
}

const ReviewCard = ({ title, text, name, date }: ReviewCardProps) => {
  return (
    <>
      <VStack
        w="100%"
        bg="gray.600"
        p="12px"
        borderRadius="12px"
        gap="12px"
        h="145px"
      >
        <HStack w="100%" justifyContent="space-between">
          <Text color="gray.0" fontSize="18px" fontWeight="700">
            {title}
          </Text>
          <Text color="gray.80" fontSize="12px" fontWeight="700">
            Tag
          </Text>
        </HStack>

        <VStack w="100%" h="60x" justifyContent="start" overflow="hidden">
          <Text
            textAlign="start"
            color="gray.0"
            fontSize="14px"
            fontWeight="700"
            lineHeight="22px"
          >
            {text}
          </Text>
        </VStack>

        <HStack w='100%' justifyContent="space-between">
          <HStack gap="8px">
            <Img
              rounded="full"
              width="24px"
              minW="24px"
              height="24px"
              minH="24px"
              src={"/assets/images/default-avatar.png"}
            />
            <Text color="gray.40" fontSize="14px">
              {name}
            </Text>
          </HStack>

          <Text color="gray.80" fontSize="12px">
            {date}
          </Text>
        </HStack>
      </VStack>
    </>
  );
};

export default ReviewCard;
