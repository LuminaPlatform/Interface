import { textTruncator } from "@/utils";
import {
  Box,
  Button,
  Code,
  HStack,
  Img,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { TbBrandX, TbMail, TbUserCheck, TbUserPlus } from "react-icons/tb";

const hasBadge = true;
const hasWallet = true;

export const UserInfo = () => {
  const { username } = useParams<{ username: string }>();

  const [isFollowed, setFollowed] = useState(false);

  return (
    <Stack
      flexDirection={{ base: "column", md: "row" }}
      width="full"
      columnGap="24px"
      padding={{ base: "12px", md: "24px" }}
      alignItems={{ base: "center", md: "stretch" }}
    >
      <Box
        outline="2px solid red"
        outlineOffset="2px"
        rounded="full"
        minWidth={{ base: "100px", md: "186px" }}
        minHeight={{ base: "100px", md: "186px" }}
        {...(hasBadge && {
          position: "relative",
        })}
      >
        <Img
          objectFit="cover"
          rounded="full"
          width={{ base: "100px", md: "186px" }}
          height={{ base: "100px", md: "186px" }}
          src="/assets/images/default-img.png"
          alt="profile"
        />
        {hasBadge && (
          <Img
            src="/assets/images/profile/badge.png"
            position="absolute"
            bottom="0"
            left="0"
          />
        )}
      </Box>
      <VStack
        width="full"
        justifyContent="space-between"
        alignItems={{ base: "center", md: "flex-start" }}
      >
        <VStack width="full" alignItems={{ base: "center", md: "flex-start" }}>
          <HStack width="full" justifyContent="space-between">
            <HStack>
              <Text
                fontSize="2xl"
                fontWeight="600"
                fontFamily="lexend"
                color="gray.10"
              >
                Nickname
              </Text>
              <Link href="#" target="_blank">
                <TbMail
                  cursor="pointer"
                  fontSize="24px"
                  color="var(--chakra-colors-gray-10)"
                />
              </Link>
              <Link href="#" target="_blank">
                <TbBrandX
                  cursor="pointer"
                  fontSize="24px"
                  color="var(--chakra-colors-gray-10)"
                />
              </Link>
            </HStack>
            {!isFollowed ? (
              <Button
                onClick={() => {
                  setFollowed(true);
                }}
                leftIcon={<TbUserPlus />}
                variant="primary"
              >
                Follow
              </Button>
            ) : (
              <Button
                leftIcon={<TbUserCheck />}
                size="md"
                background="gray.40"
                color="gray.500"
                onClick={() => {
                  setFollowed(false);
                }}
              >
                Following
              </Button>
            )}
          </HStack>
          <Text
            color="gray.60"
            fontWeight="500"
            fontSize="lg"
            textAlign={{ base: "center", md: "left" }}
          >
            {username}
          </Text>
          {hasWallet && (
            <Code
              bg="gray.600"
              px="8px"
              lineHeight="24px"
              height="24px"
              borderRadius="12px"
              textAlign={{ base: "center", md: "left" }}
              color="gray.80"
            >
              {textTruncator("9de258cae570fb9736dd40c205194e2c")}
            </Code>
          )}
        </VStack>
        <HStack width="full">
          <Button flex="1" variant="primaryDark">
            <HStack width="full" justifyContent="space-between">
              <Text>Followers</Text>
              <Text>10</Text>
            </HStack>
          </Button>
          <Button flex="1" variant="primaryDark">
            <HStack width="full" justifyContent="space-between">
              <Text>Followings</Text>
              <Text>10</Text>
            </HStack>
          </Button>
        </HStack>
      </VStack>
    </Stack>
  );
};
