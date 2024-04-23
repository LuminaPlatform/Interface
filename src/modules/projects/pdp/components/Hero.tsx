import { Box, HStack, Img, Stack, Text, VStack } from "@chakra-ui/react";
import { useProjectData } from "../hooks";
import { textTruncator } from "@/utils";
import Link from "next/link";
import { TbLink } from "react-icons/tb";

const Tags = () => {
  const {
    tags,
    project: {},
  } = useProjectData();
  console.log(textTruncator("1234567890"));

  return (
    <Stack
      flexDirection={{ base: "column", md: "row" }}
      width="full"
      justifyContent={{ base: "flex-start", md: "space-between" }}
      alignItems={{ base: "flex-start" }}
    >
      <HStack width="full" justifyContent="flex-start" alignItems="flex-start">
        {tags.map((tag) => (
          <Text
            borderRadius="12px"
            height="24px"
            px="8px"
            display="inline-block"
            lineHeight="24px"
            key={tag.id}
            color={tag.color.txt}
            bg={tag.color.bg}
            fontWeight="700"
          >
            {tag.title}
          </Text>
        ))}
      </HStack>
      <HStack
        width="full"
        justifyContent={{ base: "flex-start", md: "flex-end" }}
        alignItems="flex-start"
      >
        <Text
          bg="gray.600"
          borderRadius="12px"
          height="24px"
          lineHeight="24px"
          fontSize="xs"
          fontWeight="700"
          px="8px"
          color="gray.80"
        >
          Project
        </Text>
        <Text
          bg="gray.600"
          borderRadius="12px"
          height="24px"
          lineHeight="24px"
          fontSize="xs"
          fontWeight="700"
          px="8px"
          color="gray.80"
        >
          {textTruncator("1234567890")}
        </Text>
      </HStack>
    </Stack>
  );
};
export const Hero = () => {
  const {
    project: { name },
  } = useProjectData();
  return (
    <VStack pb="24px" rowGap="0px" width="full">
      <VStack
        borderRadius="12px"
        p="12px"
        bg="red"
        height={{ base: "200px", md: "329px" }}
        width="full"
      >
        <HStack width="full" justifyContent="flex-start">
          <Tags />
        </HStack>
      </VStack>
      <Stack width="full" position="relative">
        <Box
          border="1px solid"
          borderColor="gray.100"
          width={{ base: "80px", md: "120px" }}
          height={{ base: "80px", md: "120px" }}
          bg="gray.900"
          position="absolute"
          top={{ base: "-40px", md: "-60px" }}
          left={{ base: "8px", md: "24px" }}
          borderRadius="16px"
        >
          <Img src="" />
        </Box>
        <VStack pl={{ base: "104px", md: "168px" }} width="full">
          <Stack
            flexDirection={{ base: "column", md: "row" }}
            width="full"
            justifyContent="space-between"
            alignItems={{ md: "flex-end" }}
          >
            <HStack>
              <Text
                fontSize="28px"
                fontWeight="600"
                color="gray.20"
                fontFamily="lexend"
                as={Link}
                href="#"
              >
                {name}
              </Text>
              <TbLink fontSize="28px" color="var(--chakra-colors-gray-20)" />
            </HStack>
            <Text
              px="8px"
              borderRadius="12px"
              bg="gray.40"
              color="gray.400"
              fontSize="xs"
              fontWeight="700"
              lineHeight={{ base: "16px", md: "24px" }}
              height={{ base: "16px", md: "24px" }}
              width="fit-content"
            >
              Appears in 95 ballots
            </Text>
          </Stack>
          <Text
            width="full"
            textAlign="left"
            fontSize="lg"
            fontWeight="500"
            color="gray.20"
          >
            A collective of Ethereum&apos;s active core protocol contributors
          </Text>
        </VStack>
      </Stack>
    </VStack>
  );
};
