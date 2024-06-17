import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { TbChevronRight, TbConfetti, TbTrash } from "react-icons/tb";

interface NotificationItemProps {
  isSeen: boolean;
  title: string;
  message: string;
  cta?: () => void;
  ctaText?: string;
}
export const NotificationItem = ({
  isSeen,
  title,
  message,
  cta,
  ctaText,
}: NotificationItemProps) => {
  const [isSeenState, setIsSeenState] = useState(isSeen);
  return (
    <VStack borderRadius="lg" p="12px" bg="gray.700" columnGap={2} width="full">
      <HStack justifyContent="space-between" width="full">
        <HStack width="full">
          <Box bg="primary.300" rounded="full" boxSize={1.5} />
          <TbConfetti
            fontSize="2xl"
            color={
              isSeen
                ? "var(--chakra-colors-gray-60)"
                : "var(--chakra-colors-gray-20)"
            }
          />
          <Text
            fontSize="md"
            fontWeight="700"
            color={isSeen ? "gray.60" : "gray.20"}
          >
            {title}
          </Text>
        </HStack>
        <TbTrash
          cursor="pointer"
          fontSize="2xl"
          color="var(--chakra-colors-gray-60)"
        />
      </HStack>
      <Text fontSize="sm" fontWeight="500" lineHeight="22px" color="gray.60">
        {message}
      </Text>
      <HStack width="full" justifyContent={ctaText ? "space-between" : "flex"}>
        {ctaText && (
          <Text
            cursor="pointer"
            columnGap={1}
            display="flex"
            alignItems="center"
            fontSize="xs"
            fontWeight="700"
            color="gray.60"
            as="span"
          >
            {ctaText}{" "}
            <TbChevronRight
              fontSize="xs"
              color="var(--chakra-colors-gray-60)"
            />
          </Text>
        )}
        <Text fontSize="xs" color="gray.80">
          2024-02-26, 14:05
        </Text>
      </HStack>
    </VStack>
  );
};
