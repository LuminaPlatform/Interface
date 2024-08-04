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
import { useState } from "react";
import { TbBrandX, TbMail, TbUserCheck, TbUserPlus } from "react-icons/tb";
import { UsersModal } from "./UsersModal";
import { Avatar } from "@/components/AvatarText";
import { useUserProfile } from "../hooks";
import { xDomain } from "@/constant";

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

  const userInfo = useUserProfile();
  const [isFollowed, setFollowed] = useState(false);

  const hasWallet = !!userInfo.wallet;

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
          userInfo.user.profile_picture ?? "/assets/images/default-avatar.png"
        }
        hasBadge
        imageStyle={{
          width: { base: "100px", md: "186px" },
          height: { base: "100px", md: "186px" },
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
            {!userInfo.isSelfUser &&
              (!isFollowed ? (
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
              <Text>10</Text>
            </HStack>
          </Button>
          <Button onClick={followingOnOpen} flex="1" variant="primaryDark">
            <HStack width="full" justifyContent="space-between">
              <Text>Followings</Text>
              <Text>10</Text>
            </HStack>
          </Button>
        </HStack>
      </VStack>
      <ModalBase
        modalHeader={<ModalHeader text="Followers" />}
        onClose={followersOnClose}
        isOpen={followersIsOpen}
        modalBody={<UsersModal />}
      />
      <ModalBase
        modalHeader={<ModalHeader text="Followings" />}
        onClose={followingOnClose}
        isOpen={followingIsOpen}
        modalBody={<UsersModal />}
      />
    </Stack>
  );
};
