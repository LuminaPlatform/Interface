import { Box, Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { textTruncator } from "@/utils";
import { TbBrandX, TbMail, TbUserCheck, TbUserPlus } from "react-icons/tb";
import { Avatar } from "@/components/AvatarText";
import { xDomain } from "@/constant";
import { getHighlightedText } from "@/components/globalSearch/HighlightText";
import {
  useAuthorization,
  useGlobalUserData,
  useWalletModal
} from "@/hooks/bases";

interface PeopleCardProps {
  name: string;
  search: string;
  id: string;
  walletAddress: string;
  email: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const PeopleCard = ({
  name,
  search,
  id,
  walletAddress,
  email,
  setSearch
}: PeopleCardProps) => {
  const globalUser = useGlobalUserData();
  const authorization = useAuthorization();
  const { onOpen } = useWalletModal();

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
        <Link href={`/profile/${id}`} onClick={() => setSearch("")}>
          <Avatar
            badgeSize={{}}
            imageStyle={{
              width: "60px",
              height: "60px"
            }}
            hasBadge={false}
            src={
              globalUser?.user?.profile_id
                ? `${process.env.NEXT_PUBLIC_BASE_FILE_URL}/${globalUser?.user?.profile_id}`
                : "/assets/images/default-img.png"
            }
          />
        </Link>

        <VStack alignItems="start">
          <HStack>
            <Link href={`/profile/${id}`} onClick={() => setSearch("")}>
              <Text color="gray.0" fontSize="20px" fontWeight="700">
                {getHighlightedText(name, search)}
              </Text>
            </Link>

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
            {globalUser?.user?.profile_id?.x_username && (
              <Stack
                w="32px"
                h="32px"
                borderRadius="25px"
                bg="gray.900"
                justifyContent="center"
                alignItems="center"
              >
                <Link
                  title={`${xDomain}/${globalUser?.user?.x_username}`}
                  rel="noreferrer noopener"
                  href={`${xDomain}/${globalUser?.user?.x_username}`}
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
      {!authorization ? (
        <Button
          onClick={onOpen}
          borderRadius="8px"
          height="40px"
          px="28px"
          variant="primary"
        >
          Connect
        </Button>
      ) : true ? (
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
            Following
          </Text>
        </Button>
      )}
    </HStack>
  );
};

export default PeopleCard;
