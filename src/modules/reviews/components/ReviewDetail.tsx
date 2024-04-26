import { Badge } from "@/components/Badge";
import { reviewStatuses } from "@/constant";
import { Box, HStack, Img, Text, VStack } from "@chakra-ui/react";

interface ReviewDetailProps {}
export const ReviewDetail = ({}: ReviewDetailProps) => {
  return (
    <VStack
      maxWidth="616px"
      position="relative"
      width="full"
      padding="0"
      margin="0"
      mt="8px"
      alignItems="center"
      maxH={{ base: "350px", md: "756px" }}
      overflow="auto"
      rowGap="12px"
    >
      <HStack columnGap="16px" width="full">
        <VStack
          rowGap="8px"
          bg="#37373A99"
          width="124px"
          height="84px"
          borderRadius="9px"
          p="8px 12px"
          justifyContent="center"
        >
          <Img width="36px" height="36px" rounded="full" src="" alt="project" />
          <Text color="gray.40" fontSize="md" fontWeight="500">
            Lumina
          </Text>
        </VStack>
        <VStack alignItems="flex-start">
          <Badge
            title={reviewStatuses[0].name}
            colorScheme={reviewStatuses[0].colorScheme}
            icon={reviewStatuses[0].icon}
          />
          <HStack columnGap="8px">
            <Img
              rounded="full"
              border="1px solid"
              borderColor="gray.0"
              alt="writer"
              src="/assets/images/default-img.png"
              width={{ base: "16px", md: "24px" }}
              height={{ base: "16px", md: "24px" }}
            />
            <Text color="gray.40" fontSize={{ base: "sm", md: "md" }}>
              Writer Name
            </Text>
          </HStack>
        </VStack>
      </HStack>
      <Text
        fontSize="xl"
        color="gray.20"
        fontFamily="lexend"
        width="full"
        textAlign="left"
      >
        My recommendation
      </Text>
      <Text fontSize="lg" color="gray.40" lineHeight="28.8px">
        Aliquet tellus risus sed elit aliquet venenatis ut. At non varius
        scelerisque aliquam et diam. Amet nec tortor dictum aliquet. Enim
        suspendisse congue aliquet tortor risus. Consectetur id parturient vel
        lobortis. At non varius scelerisque aliquam et diam. Amet nec tortor
        dictum aliquet. Enim suspendisse congue aliquet tortor risus.
        Consectetur id parturient vel lobortis. Aliquet tellus risus sed elit
        aliquet venenatis ut. At non varius scelerisque aliquam et diam. Amet
        nec tortor dictum aliquet. Enim suspendisse congue aliquet tortor risus.
        Consectetur id parturient vel lobortis. At non varius scelerisque
        aliquam et diam. Amet nec tortor dictum aliquet. Enim suspendisse congue
        aliquet tortor risus. Consectetur id parturient vel lobortis. Aliquet
        tellus risus sed elit aliquet venenatis ut. At non varius scelerisque
        aliquam et diam. Amet nec tortor dictum aliquet. Enim suspendisse congue
        aliquet tortor risus.
      </Text>
      <Img
        width="full"
        height="full"
        maxWidth="full"
        maxHeight="312px"
        alt="review"
      />
      <HStack
        bg="gray.900"
        fontWeight="500"
        fontSize="xs"
        color="gray.80"
        right="0"
        width="full"
        position="sticky"
        bottom="0"
        justifyContent='flex-end'
      >
        <Text>
          {new Date().getFullYear()}-{new Date().getMonth() + 1}-
          {new Date().getDate()}
        </Text>
        <Text>17:05</Text>{" "}
      </HStack>
    </VStack>
  );
};