import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useMemo } from "react";
import { IconType } from "react-icons";
import {
  TbChevronRight,
  TbConfetti,
  TbInfoHexagon,
  TbTrash
} from "react-icons/tb";

enum MESSAGE_TYPE {
  urgent = "URGENT",
  warning = "WARNING",
  info = "INFO"
}
interface NotificationItemProps {
  message: {
    id: number;
    read: boolean;
    type: MESSAGE_TYPE;
    title: string;
    msg: string;
    timestamp: string;
  };
  // cta?: () => void;
  ctaText?: string;
  setMessages: Dispatch<SetStateAction<any>>;
}

export const NotificationItem = ({
  message,
  // cta,
  ctaText,
  setMessages
}: NotificationItemProps) => {
  const messageIcon: {
    [MESSAGE_TYPE.info]: IconType;
    [MESSAGE_TYPE.urgent]: IconType;
    [MESSAGE_TYPE.warning]: IconType;
  } = useMemo(
    () => ({
      [MESSAGE_TYPE.info]: TbConfetti,
      [MESSAGE_TYPE.urgent]: TbInfoHexagon,
      [MESSAGE_TYPE.warning]: TbInfoHexagon
    }),
    []
  );

  return (
    <VStack borderRadius="lg" p="12px" bg="gray.700" columnGap={2} width="full">
      <HStack justifyContent="space-between" width="full">
        <HStack width="full">
          {!message.read && (
            <Box bg="primary.300" rounded="full" boxSize={1.5} />
          )}
          {message.type && (
            <Icon
              as={messageIcon[message.type]}
              fontSize="2xl"
              color={
                message.read
                  ? "var(--chakra-colors-gray-60)"
                  : "var(--chakra-colors-gray-20)"
              }
            />
          )}
          <Text
            fontSize="md"
            fontWeight="700"
            color={message.read ? "gray.60" : "gray.20"}
          >
            {message.title}
          </Text>
        </HStack>
        <TbTrash
          cursor="pointer"
          fontSize="2xl"
          color="var(--chakra-colors-gray-60)"
          onClick={() => {
            setMessages((prev: any) =>
              prev.filter((item: any) => item.id !== message.id)
            );
          }}
        />
      </HStack>
      <Text
        width="full"
        fontSize="sm"
        fontWeight="500"
        lineHeight="22px"
        color="gray.60"
      >
        {message.msg}
      </Text>
      <HStack width="full" justifyContent={ctaText ? "space-between" : "flex"}>
        {ctaText && (
          <Text
            cursor="pointer"
            columnGap={1}
            display="flex"
            alignItems="center"
            fontSize="xs"
            fontWeight="700"
            color="gray.60"
            as="span"
          >
            {ctaText}{" "}
            <TbChevronRight
              fontSize="xs"
              color="var(--chakra-colors-gray-60)"
            />
          </Text>
        )}
        <HStack fontWeight="500" fontSize="xs" color="gray.80">
          <Text>
            {new Date(message.timestamp).getFullYear()}-
            {new Date(message.timestamp).getMonth() + 1}-
            {new Date(message.timestamp).getDate()}
          </Text>
          <Text>
            {new Date(message.timestamp).getHours()}:
            {new Date(message.timestamp).getMinutes()}
          </Text>
        </HStack>
      </HStack>
    </VStack>
  );
};
