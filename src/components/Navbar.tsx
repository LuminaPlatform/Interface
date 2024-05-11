"use client";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  HStack,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ConnectModal } from "./modals/Connect";
import { useAuthorization, useWalletModal } from "@/hooks/bases";
import {
  TbBell,
  TbLogout,
  TbSearch,
  TbSettings2,
  TbUserCircle,
} from "react-icons/tb";
import { useAccount } from "wagmi";
import Link from "next/link";
import { BadgeModal } from "./modals/badges/Badge";
import { Badges } from "@/types";

const ProfileBox = () => {
  return (
    <Menu>
      <MenuButton as={Box} display="flex">
        <HStack width="full">
          <Img
            rounded="full"
            width="32px"
            height="32px"
            border="1px solid"
            borderColor="gray.0"
            src="/assets/images/default-img.png"
            alt="user"
          />
          <Text color="gray.10" fontSize="md" fontWeight="200">
            Anonyms
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
            src="/assets/images/default-img.png"
            alt="profile"
          />
          <Text
            fontFamily="lexend"
            color="gray.0"
            fontSize="xl"
            fontWeight="600"
          >
            Anonyms
          </Text>
        </HStack>
        <VStack rowGap="24px">
          <Button
            fontSize="md"
            fontWeight="700"
            height="48px"
            variant="primaryDark"
            width="full"
            as={Link}
            href="/profile/username"
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
            as={Link}
            href="/settings"
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
            as={Link}
            href="/settings"
          >
            <HStack width="full" justifyContent="flex-start" columnGap="8px">
              <TbLogout fontSize="20px" />
              <Text>Log Out</Text>
            </HStack>
          </Button>
        </VStack>
      </MenuList>
    </Menu>
  );
};

const Navbar = () => {
  const [search, setSearch] = useState("");

  const {
    isOpen: badgeIsOpen,
    onClose: badgeOnClose,
    onOpen: badgeOnOpen,
  } = useDisclosure();

  const { isOpen, onClose, onOpen } = useWalletModal();
  const { isConnected } = useAccount();

  const authorization = useAuthorization();

  useEffect(() => {
    if (isConnected && onClose) {
      onClose();
    }
  }, [isConnected, onClose]);

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
        <InputGroup
          display={{ base: "none", md: "inline-block" }}
          width="311px"
          height="40ox"
        >
          <InputLeftElement>
            <TbSearch size={24} color="var(--chakra-colors-gray-100)" />
          </InputLeftElement>
          <Input
            px="16px"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            bg="gray.600"
            border="1px solid"
            borderColor="gray.200"
            _hover={{
              borderColor: "gray.300",
            }}
            _active={{ borderColor: "gray.400" }}
            _focus={{ borderColor: "gray.400" }}
            boxShadow="none !important"
            outline="none"
            fontFamily="satoshi"
            fontSize="md"
            color="gray.100"
            fontWeight="regular"
            _placeholder={{
              fontWeight: "regular",
              color: "gray.100",
            }}
            borderRadius="27px"
            placeholder="Search"
          />
        </InputGroup>
        {authorization && (
          <Box
            cursor="pointer"
            onClick={() => {
              console.log("clicked on notif");
            }}
            position="relative"
          >
            {false && (
              <Text
                textAlign="center"
                fontSize="10px"
                fontWeight="bold"
                margin="0px !important"
                padding="0px"
                lineHeight="16px"
                rounded="full"
                minHeight="16px"
                minWidth="16px"
                bg="red.300"
                color="gray.0"
                position="absolute"
                right="-5px"
                top="-5px"
              >
                1
              </Text>
            )}
            <TbBell size={24} color="var(--chakra-colors-gray-0)" />
          </Box>
        )}
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
        badgeType={Badges["HOLDER"]}
        isOpen={badgeIsOpen}
        onClose={badgeOnClose}
      />
    </>
  );
};

export default Navbar;
