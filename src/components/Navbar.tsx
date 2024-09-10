"use client";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  HStack,
  Img,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useDisclosure,
  VStack,
  useOutsideClick
} from "@chakra-ui/react";
import React, { useMemo, useRef } from "react";
import {
  useAuthorization,
  useGlobalUserData,
  useWalletModal
} from "@/hooks/bases";
import { TbLogout, TbSettings2, TbUserCircle } from "react-icons/tb";
import { Badges } from "@/types";
import dynamic from "next/dynamic";
import { generateImageSrc } from "@/utils";
import { useRouter } from "next/router";
import { ConnectModal } from "./modals/Connect";
import { BadgeModal } from "./modals/badges/Badge";
import { Logout } from "./modals/Logout";
import SearchField from "./SearchField";

const ProfileBox = () => {
  const userData = useGlobalUserData();

  const user = userData?.user;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: menuIsOpen,
    onClose: menuOnClose,
    onOpen: menuOnOpen
  } = useDisclosure();

  const menuRef = useRef();

  useOutsideClick({
    ref: menuRef,
    handler: menuOnClose
  });

  const router = useRouter();

  if (!user) {
    return null;
  }

  return (
    <Box ref={menuRef}>
      <Menu onOpen={menuOnOpen} isOpen={menuIsOpen} onClose={menuOnClose}>
        <MenuButton as={Box} display="flex">
          <HStack width="full">
            <Img
              rounded="full"
              width="32px"
              height="32px"
              src={
                user?.profile_id
                  ? generateImageSrc(user.profile_id)
                  : "/assets/images/default-avatar.png"
              }
              alt="user"
            />
            <Text
              width="100px"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              color="gray.10"
              fontSize="md"
              fontWeight="200"
            >
              {user.display_name ?? user.email}
            </Text>
          </HStack>
        </MenuButton>
        <MenuList
          border="none"
          width="290px"
          px="16px"
          py="24px"
          bg="gray.900"
          zIndex={2}
          cursor="default"
        >
          <HStack columnGap="8px" mb="16px" rowGap="8px">
            <Img
              rounded="full"
              width="64px"
              height="64px"
              src={
                user?.profile_id
                  ? generateImageSrc(user.profile_id)
                  : "/assets/images/default-avatar.png"
              }
              alt="profile"
            />
            <Text
              fontFamily="lexend"
              color="gray.0"
              fontSize="xl"
              fontWeight="600"
              width="full"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {user.display_name ?? user.email}
            </Text>
          </HStack>
          <VStack rowGap="16px">
            <Button
              fontSize="md"
              fontWeight="700"
              height="48px"
              variant="primaryDark"
              width="full"
              onClick={() => {
                menuOnClose();
                router.push(`/profile/${user?.id}`);
              }}
            >
              <HStack width="full" justifyContent="flex-start" columnGap="8px">
                <TbUserCircle fontSize="20px" />
                <Text>My Profile</Text>
              </HStack>
            </Button>
            <Button
              fontSize="md"
              fontWeight="700"
              height="48px"
              variant="primaryDark"
              width="full"
              onClick={() => {
                menuOnClose();
                router.push("/settings");
              }}
            >
              <HStack width="full" justifyContent="flex-start" columnGap="8px">
                <TbSettings2 fontSize="20px" />
                <Text>Account Setting</Text>
              </HStack>
            </Button>
            <Button
              fontSize="md"
              fontWeight="700"
              height="48px"
              variant="primaryDark"
              width="full"
              onClick={onOpen}
            >
              <HStack width="full" justifyContent="flex-start" columnGap="8px">
                <TbLogout fontSize="20px" />
                <Text>Log Out</Text>
              </HStack>
            </Button>
          </VStack>
        </MenuList>
      </Menu>
      <Logout isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

const Navbar = () => {
  const { isOpen: badgeIsOpen, onClose: badgeOnClose } = useDisclosure();

  const { isOpen, onClose, onOpen } = useWalletModal();

  const authorization = useAuthorization();

  const NotificationContainer = useMemo(() => {
    if (authorization) {
      return dynamic(() =>
        import("./Notification").then(
          (modules) => modules.NotificationContainer
        )
      );
    }
    return null;
  }, [authorization]);

  return (
    <>
      <Alert
        mb="20px"
        display="flex"
        borderRadius="16px"
        status="warning"
        bg="orange.100"
      >
        <AlertIcon color="orange.400" />
        <Text fontSize="xs">
          Kindly note: The application is currently in development, and some
          functionalities may not be operational. We appreciate your
          understanding.
        </Text>
      </Alert>
      <HStack
        fontFamily="satoshi"
        justifyContent={{ base: "flex-start", md: "flex-end" }}
        columnGap="24px"
        width="full"
      >
        <SearchField />

        {!!authorization && <NotificationContainer />}
        <HStack cursor="pointer" columnGap="8px">
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
          ) : (
            <ProfileBox />
          )}
        </HStack>
      </HStack>
      <ConnectModal isOpen={isOpen} onClose={onClose} />
      <BadgeModal
        badgeType={Badges.HOLDER}
        isOpen={badgeIsOpen}
        onClose={badgeOnClose}
      />
    </>
  );
};

export default Navbar;
