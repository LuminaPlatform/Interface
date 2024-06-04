import { Box, HStack, Img, Stack, Text, VStack } from "@chakra-ui/react";
import { useProjectData } from "../hooks";
import { textTruncator } from "@/utils";
import Link from "next/link";
import { TbLink } from "react-icons/tb";
import { primaryCategories } from "@/constant";

const Tags = () => {
  const { content } = useProjectData();
  const {
    applicantType,
    impactCategory,
    applicant: {
      address: { address },
    },
  } = content;

  return (
    <Stack
      flexDirection={{ base: "column", md: "row" }}
      width="full"
      justifyContent={{ base: "flex-start", md: "space-between" }}
      alignItems={{ base: "flex-start" }}
    >
      <HStack width="full" justifyContent="flex-start" alignItems="flex-start">
        {impactCategory.map((tag) => {
          const foundCategory = primaryCategories.find(
            (item) => item.title === tag.split("_").join(" ")
          );
          return (
            <Text
              borderRadius="12px"
              height="24px"
              px="8px"
              display="inline-block"
              lineHeight="24px"
              key={foundCategory.value}
              color={foundCategory.color.txt}
              bg={foundCategory.color.bg}
              fontWeight="700"
            >
              {foundCategory.shortTitle}
            </Text>
          );
        })}
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
          {applicantType}
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
          {textTruncator(address)}
        </Text>
      </HStack>
    </Stack>
  );
};
export const Hero = () => {
  const { name, content } = useProjectData();
  const { profile, websiteUrl, includedInBallots, bio } = content;

  return (
    <VStack pb="24px" rowGap="0px" width="full">
      <VStack
        borderRadius="12px"
        p="12px"
        backgroundImage={profile?.bannerImageUrl}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="100% 100%"
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
          overflow="hidden"
        >
          <Img width="full" height="full" src={profile?.profileImageUrl} />
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
                href={websiteUrl}
                rel="noopener noreferrer"
                target="_blank"
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
              Appears in {includedInBallots} ballots
            </Text>
          </Stack>
          <Text
            width="full"
            textAlign="left"
            fontSize="lg"
            fontWeight="500"
            color="gray.20"
          >
            {bio}
          </Text>
        </VStack>
      </Stack>
    </VStack>
  );
};
