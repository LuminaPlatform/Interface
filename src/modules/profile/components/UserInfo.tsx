import { ModalBase } from "@/components/ModalBase";
import { textTruncator } from "@/utils";
import {
  Button,
  Code,
  HStack,
  Link,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useGlobalUserData } from "@/hooks/bases";
import { useDispatchUserProfile, useUserProfile } from "../hooks";
import { ACCESS_TOKEN_COOKIE_KEY, xDomain } from "@/constant";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";
import { getCookie } from "cookies-next";
import { useState } from "react";
import { TbBrandX, TbMail, TbUserCheck, TbUserPlus } from "react-icons/tb";
import { UsersModal } from "./UsersModal";
import { Avatar } from "@/components/AvatarText";

const ModalHeader = ({ text }: { text: string }) => (
  <Text
    textAlign="center"
    position="absolute"
    top="16px"
    left="50%"
    transform="translateX(-50%)"
    width="fit-content"
    color="gray.0"
    fontWeight="600"
    fontFamily="lexend"
    fontSize="xl"
  >
    {text}
  </Text>
);

export const UserInfo = () => {
  const {
    isOpen: followersIsOpen,
    onOpen: followersOnOpen,
    onClose: followersOnClose,
  } = useDisclosure();
  const {
    isOpen: followingIsOpen,
    onOpen: followingOnOpen,
    onClose: followingOnClose,
  } = useDisclosure();

  const dispatchProfile = useDispatchUserProfile();
  const userInfo = useUserProfile();
  const [
    ,
    // isLoading
    setLoading,
  ] = useState(false);

  const hasWallet = !!userInfo.wallet;

  const globalUser = useGlobalUserData();

  const isSelfUser = globalUser?.user?.id === userInfo.user.id;
  return (
    <Stack
      flexDirection={{ base: "column", md: "row" }}
      width="full"
      columnGap="24px"
      padding={{ base: "12px", md: "24px" }}
      alignItems={{ base: "center", md: "stretch" }}
    >
      <Avatar
        badgeSize="48px"
        src={
          userInfo.user?.profile_id
            ? `${process.env.NEXT_PUBLIC_BASE_FILE_URL}/${userInfo.user?.profile_id}`
            : "/assets/images/default-avatar.png"
        }
        hasBadge
        imageStyle={{
          width: { base: "100px", md: "186px" },
          height: { base: "100px", md: "186px" },
          objectFit: "contain",
        }}
      />

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
                {userInfo.user.display_name}
              </Text>
              {userInfo.user.email && (
                <Link href={`mailto:${userInfo.user.email}`}>
                  <TbMail
                    cursor="pointer"
                    fontSize="24px"
                    color="var(--chakra-colors-gray-10)"
                  />
                </Link>
              )}
              {userInfo.user.x_username && (
                <Link
                  title={`${xDomain}/${userInfo.user.x_username}`}
                  rel="noreferrer noopener"
                  href={`${xDomain}/${userInfo.user.x_username}`}
                  target="_blank"
                >
                  <TbBrandX
                    cursor="pointer"
                    fontSize="24px"
                    color="var(--chakra-colors-gray-10)"
                  />
                </Link>
              )}
            </HStack>
            {!isSelfUser &&
              !!globalUser &&
              (!userInfo.isCurrentProfileFollowed ? (
                <Button
                  onClick={() => {
                    setLoading(true);
                    axiosClient
                      .post(apiKeys.relation.add, {
                        "0": {
                          model_name: "User",
                          params: {
                            following: [userInfo.user.id],
                          },
                          id: globalUser.user.id,
                        },
                      })
                      .then((res) => {
                        dispatchProfile({
                          ...userInfo,
                          followers: [...userInfo.followers, res.data[0]],
                          isCurrentProfileFollowed: true,
                        });
                      })
                      .finally(() => {
                        setLoading(false);
                      });
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
                    setLoading(true);
                    axiosClient
                      .post(
                        apiKeys.relation.remove,
                        {
                          "0": {
                            model_name: "User",
                            params: {
                              following: [userInfo.user.id],
                            },
                            id: globalUser.user.id,
                          },
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${getCookie(
                              ACCESS_TOKEN_COOKIE_KEY
                            )}`,
                          },
                        }
                      )
                      .then((res) => {
                        const filteredFollowers = userInfo.followers.filter(
                          (item: any) => item.id !== res.data[0].id
                        );
                        dispatchProfile({
                          ...userInfo,
                          followers: [...filteredFollowers],
                          isCurrentProfileFollowed: false,
                        });
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  }}
                >
                  Following
                </Button>
              ))}
          </HStack>
          <Text
            color="gray.60"
            fontWeight="500"
            fontSize="lg"
            textAlign={{ base: "center", md: "left" }}
          >
            {userInfo.user.username}
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
              {textTruncator(userInfo.wallet.address)}
            </Code>
          )}
        </VStack>
        <HStack width="full">
          <Button onClick={followersOnOpen} flex="1" variant="primaryDark">
            <HStack width="full" justifyContent="space-between">
              <Text>Followers</Text>
              <Text>{userInfo.followers.length}</Text>
            </HStack>
          </Button>
          <Button onClick={followingOnOpen} flex="1" variant="primaryDark">
            <HStack width="full" justifyContent="space-between">
              <Text>Followings</Text>
              <Text>{userInfo.followings.length}</Text>
            </HStack>
          </Button>
        </HStack>
      </VStack>
      <ModalBase
        modalHeader={<ModalHeader text="Followers" />}
        onClose={followersOnClose}
        isOpen={followersIsOpen}
        modalBody={<UsersModal type="FOLLOWERS" />}
      />
      <ModalBase
        modalHeader={<ModalHeader text="Followings" />}
        onClose={followingOnClose}
        isOpen={followingIsOpen}
        modalBody={<UsersModal type="FOLLOWING" />}
      />
    </Stack>
  );
};
