import {
  Box,
  Button,
  HStack,
  Img,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { TbBell } from "react-icons/tb";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";
import { useGlobalUserData } from "@/hooks/bases";
import { getCookie } from "cookies-next";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constant";
import { NotificationItem } from "./NotificationItem";

const NotificationEmptyState = () => {
  return (
    <>
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
    </>
  );
};

interface NotificationBodyProps {
  messages: any[];
  setMessages: Dispatch<SetStateAction<any>>;
}
const NotificationBody = ({ messages, setMessages }: NotificationBodyProps) => {
  return (
    <>
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
            bg: "transparent"
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
              key={item.id}
              initial={{
                transform: "translateX(0px)"
              }}
              animate={{
                transform: "translateX(0px)"
              }}
              exit={{
                transform: "translateX(400px)"
              }}
              transition={{ delay: index * 0.2, duration: 0.3 }}
              style={{ width: "100%" }}
            >
              <NotificationItem
                key={item.id}
                message={item}
                setMessages={setMessages}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </VStack>
    </>
  );
};

export const NotificationContainer = () => {
  const [messages, setMessages] = useState([]);

  const globalUser = useGlobalUserData();
  const { onOpen, onClose, isOpen } = useDisclosure();

  useEffect(() => {
    const notifsAreNotSeen = messages.filter((item) => item.read === false);
    const updatePlan = notifsAreNotSeen.map((item) => ({
      model_name: "Notification",
      params: {
        read: true
      },
      id: item.id
    }));

    if (isOpen && messages.length !== 0) {
      axiosClient
        .post(
          apiKeys.update,
          { ...updatePlan },
          {
            headers: {
              Authorization: `Bearer ${getCookie(ACCESS_TOKEN_COOKIE_KEY)}`
            }
          }
        )
        .then(() => {
          setMessages((prev) => prev.map((msg) => ({ ...msg, read: true })));
        });
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (globalUser) {
      axiosClient
        .post(apiKeys.fetch, {
          0: {
            model: "Notification",
            orders: [],
            graph: {
              fetch_fields: [
                {
                  name: "*"
                }
              ]
            },
            condition: {
              __type__: "ComplexFetchCondition",
              operator: "AND",
              conditions: [
                {
                  __type__: "SimpleFetchCondition",
                  field: "user_id",
                  operator: "EQ",
                  value: globalUser?.user?.id
                },
                {
                  __type__: "SimpleFetchCondition",
                  field: "read",
                  operator: "EQ",
                  value: false
                }
              ]
            }
          }
        })
        .then((res) => {
          setMessages(res.data[0]);
        });
    }
  }, [globalUser]);

  const unReadMessages = useMemo(
    () => messages.filter((item) => item.read === false),
    [messages]
  );

  return (
    <Box cursor="pointer" onClick={() => {}} position="relative">
      {unReadMessages.length !== 0 &&
        unReadMessages.some((item) => item.read === false) && (
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
            {unReadMessages.length}
          </Text>
        )}
      <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
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
              <AnimatePresence>
                {messages.length === 0 ? (
                  <motion.div
                    key="emptyState"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: messages.length * 0.2 + 0.3
                    }}
                    style={{ rowGap: "16px", width: "100%" }}
                  >
                    <NotificationEmptyState />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    key="bodyState"
                    style={{
                      maxHeight: "398px",
                      overflowY: "auto",
                      overflowX: "hidden",
                      rowGap: "16px",
                      width: "100%",
                      height: "fit-content"
                    }}
                  >
                    <NotificationBody
                      messages={messages}
                      setMessages={setMessages}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Box>
  );
};
