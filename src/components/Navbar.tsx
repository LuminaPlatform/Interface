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
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ConnectModal } from "./modals/Connect";
import {
  useAuthorization,
  useGlobalUserData,
  useWalletModal,
} from "@/hooks/bases";
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
import { Logout } from "./modals/Logout";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";
import { NotificationItem } from "./NotificationItem";
import { AnimatePresence, motion } from "framer-motion";

const ProfileBox = () => {
  const userData = useGlobalUserData();
  const user = userData?.user;
  const { isOpen, onClose, onOpen } = useDisclosure();

  const baseUserData = useAuthorization();

  if (!user) {
    return null;
  }

  return (
    <>
      <Menu>
        <MenuButton as={Box} display="flex">
          <HStack width="full">
            <Img
              rounded="full"
              width="32px"
              height="32px"
              src={user?.profile_picture ?? "/assets/images/default-avatar.png"}
              alt="user"
            />
            <Text color="gray.10" fontSize="md" fontWeight="200">
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
              src={user.profile_picture ?? "/assets/images/default-avatar.png"}
              alt="profile"
            />
            <Text
              fontFamily="lexend"
              color="gray.0"
              fontSize="xl"
              fontWeight="600"
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
              as={Link}
              href={`/profile/${user?.id}`}
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
    </>
  );
};

const NotificationEmptyState = () => {
  return (
    <VStack rowGap="16px" width="full">
      <Img src="/assets/images/notif-empty-state.png" />
      <Text
        fontFamily="lexend"
        color="gray.10"
        fontWeight="600"
        fontSize="xl"
        width="full"
        textAlign="center"
      >
        No new notifications right now. Stay tuned!
      </Text>
    </VStack>
  );
};

interface NotificationBodyProps {
  messages: any[];
  setMessages: Dispatch<SetStateAction<any>>;
}
const NotificationBody = ({ messages, setMessages }: NotificationBodyProps) => {
  return (
    <VStack
      maxHeight="398px"
      overflowY="auto"
      overflowX="hidden"
      rowGap="16px"
      width="full"
      height="fit-content"
    >
      <HStack width="full" justifyContent="space-between">
        <Text
          fontWeight="600"
          fontFamily="lexend"
          fontSize="xl"
          color="gray.10"
        >
          Notifications
        </Text>
        <Button
          onClick={() => {
            setMessages([]);
          }}
          px="0"
          size="md"
          color="gray.60"
          _hover={{ color: "gray.0", bg: "transparent" }}
          _active={{
            color: "orange.300",
            bg: "transparent",
          }}
          bg="transparent"
        >
          Clear All
        </Button>
      </HStack>
      <VStack width="full" rowGap="16px">
        <AnimatePresence>
          {messages.map((item, index) => (
            <motion.div
              key={item}
              exit={{
                transform: "translateX(400px)",
                opacity: 0,
              }}
              transition={{ delay: index * 0.2, duration: 0.2 }}
            >
              <NotificationItem
                key={item}
                message="A Badge Holder is now following you. You can now vote and review projects. Share your thoughts!"
                isSeen
                title="You've been upgraded!"
                ctaText="CTA"
                cta={() => {}}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </VStack>
    </VStack>
  );
};

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const {
    isOpen: badgeIsOpen,
    onClose: badgeOnClose,
    onOpen: badgeOnOpen,
  } = useDisclosure();

  const { isOpen, onClose, onOpen } = useWalletModal();

  const authorization = useAuthorization();

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
        {!!authorization && (
          <Box cursor="pointer" onClick={() => {}} position="relative">
            {true && (
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
            <Popover>
              <PopoverTrigger>
                <Button
                  maxWidth="24px"
                  maxH="24px"
                  minWidth="24px"
                  padding="0"
                  width="fit-content"
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                >
                  <TbBell fontSize="24px" color="var(--chakra-colors-gray-0)" />
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverArrow bg="transparent" color="transparent" />
                <PopoverContent
                  p="24px 0px"
                  borderRadius="12px"
                  border="none"
                  bg="gray.800"
                >
                  <PopoverBody>
                    {messages.length === 0 ? (
                      <NotificationEmptyState />
                    ) : (
                      <NotificationBody
                        messages={messages}
                        setMessages={setMessages}
                      />
                    )}
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
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
