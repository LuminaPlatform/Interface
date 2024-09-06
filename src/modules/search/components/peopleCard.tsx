import {
  Box,
  Button,
  HStack,
  Img,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { textTruncator } from "@/utils";
import { TbBrandX, TbMail, TbUserCheck, TbUserPlus } from "react-icons/tb";
import { Avatar } from "@/components/AvatarText";
import { xDomain } from "@/constant";

interface PeopleCardProps {
  name: string;
  search: string;
  id: string;
  walletAddress: string;
  profile_id: string;
  email: string;
  x_username: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const getHighlightedText = (text: string, highlight: string) => {
  // Split the text based on the search text
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <Text as="span" color="primary.300" key={i}>
        {part}
      </Text>
    ) : (
      <Text as="span" color="gray.20" key={i}>
        {part}
      </Text>
    )
  );
};

const PeopleCard = ({
  name,
  search,
  id,
  walletAddress,
  profile_id,
  email,
  x_username,
  setSearch,
}: PeopleCardProps) => {
  return (
    <HStack
      w="full"
      h="88px"
      bg="gray.700"
      p="12px"
      borderRadius="8px"
      gap="4px"
      justifyContent="space-between"
    >
      <HStack>
        {/* <Img
          rounded="full"
          width="60px"
          minW="60px"
          height="60px"
          minH="60px"
          src={"/assets/images/default-avatar.png"}
        /> */}
        <Link href={`/profile/${id}`} onClick={() => setSearch("")}>
          <Avatar
            badgeSize={{}}
            imageStyle={{
              width: "60px",
              height: "60px",
            }}
            hasBadge={false}
            src={
              !!profile_id
                ? `${process.env.NEXT_PUBLIC_BASE_FILE_URL}/${profile_id}`
                : "/assets/images/default-img.png"
            }
          />
        </Link>

        <VStack alignItems="start">
          <HStack>
            <Text color="gray.0" fontSize="20px" fontWeight="700">
              {getHighlightedText(name, search)}
            </Text>

            {email && (
              <Stack
                w="32px"
                h="32px"
                borderRadius="25px"
                bg="gray.900"
                justifyContent="center"
                alignItems="center"
              >
                <Link href={`mailto:${email}`}>
                  <TbMail
                    cursor="pointer"
                    fontSize="24px"
                    color="var(--chakra-colors-gray-10)"
                    size={20}
                  />
                </Link>
              </Stack>
            )}
            {x_username && (
              <Stack
                w="32px"
                h="32px"
                borderRadius="25px"
                bg="gray.900"
                justifyContent="center"
                alignItems="center"
              >
                <Link
                  title={`${xDomain}/${x_username}`}
                  rel="noreferrer noopener"
                  href={`${xDomain}/${x_username}`}
                  target="_blank"
                >
                  <TbBrandX
                    cursor="pointer"
                    fontSize="24px"
                    color="var(--chakra-colors-gray-10)"
                    size={20}
                  />
                </Link>
              </Stack>
            )}
          </HStack>
          {!!walletAddress && (
            <Box
              borderRadius="12px"
              justifyContent="center"
              alignItems="center"
              bg="gray.600"
              paddingY="3px"
              paddingX="8px"
              maxW="86px"
            >
              <Text color="gray.80" fontSize="12px">
                {textTruncator(walletAddress)}
              </Text>
            </Box>
          )}
        </VStack>
      </HStack>
      {true ? (
        <Button
          onClick={() => {}}
          borderRadius="8px"
          height="40px"
          px="12px"
          py="8px"
          variant="primary"
          gap="8px"
        >
          <TbUserPlus strokeWidth={3} />

          <Text fontWeight="bold" fontSize="14px">
            Follow
          </Text>
        </Button>
      ) : (
        <Button
          onClick={() => {}}
          borderRadius="8px"
          height="40px"
          px="12px"
          py="8px"
          gap="8px"
          variant="gray.700"
        >
          <TbUserCheck strokeWidth={3} color="rgba(67, 67, 70, 1)" />

          <Text color="gray.40" fontSize="14px">
            Follow
          </Text>
        </Button>
      )}
    </HStack>
  );
};

export default PeopleCard;
