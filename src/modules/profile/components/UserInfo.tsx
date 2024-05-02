import { ModalBase } from "@/components/ModalBase";
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
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { TbBrandX, TbMail, TbUserCheck, TbUserPlus } from "react-icons/tb";
import { UsersModal } from "./UsersModal";
import { Avatar, AvatarText } from "@/components/AvatarText";

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
const hasBadge = true;
const hasWallet = true;

export const UserInfo = () => {
  const params = useParams<{ username: string }>();
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

  const [isFollowed, setFollowed] = useState(false);

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
        src="/assets/images/default-img.png"
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
            {params?.username}
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
