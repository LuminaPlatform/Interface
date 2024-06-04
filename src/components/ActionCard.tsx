import {
  Box,
  HStack,
  Icon,
  Stack,
  Tag,
  Text,
  TagLabel,
  Button,
  ButtonProps,
  Spinner,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { IconType } from "react-icons";
import {
  TbCircleCheckFilled,
  TbEye,
  TbEyeOff,
  TbPinnedFilled,
} from "react-icons/tb";

interface ActionCardProps {
  logo?: IconType;
  text: string;
  pin?: {
    showPin: boolean;
    isPin: boolean;
    setPin: (args: any) => void;
  };
  actionCardId: number;
  secure?: {
    isPublic: boolean;
    showPublic: boolean;
    setPublic: (args?: any) => void;
    isLoading: boolean;
  };
  connect?: {
    showConnect: boolean;
    isConnect: boolean;
    handleClick: () => void;
    buttonText: string;
    buttonIcon?: ButtonProps["leftIcon"];
  };
}
export const ActionCard = ({
  logo,
  text,
  pin,
  actionCardId,
  secure,
  connect,
}: ActionCardProps) => {
  const [isHover, setHover] = useState(false);

  const [isLoading, setLoading] = useState(false);

  return (
    <HStack
      px="12px"
      py="20px"
      borderRadius="12px"
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      bg="gray.700"
      justifyContent="space-between"
      width="full"
      _hover={{
        bg: "#00000040",
        ".connect_button__actionCard": {
          color: "primary.300",
          borderColor: "primary.300",
        },
      }}
    >
      <HStack columnGap="12px">
        {logo && (
          <Stack
            justifyContent="center"
            alignItems="center"
            width="40px"
            height="40px"
            bg="gray.900"
            rounded="25px"
          >
            <Icon
              color="var(--chakra-colors-gray-0)"
              as={logo}
              fontSize="24px"
            />
          </Stack>
        )}
        {pin?.showPin && (
          <Box width="24px">
            <AnimatePresence>
              {(isHover || pin?.isPin) && (
                <Box
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  as={motion.div}
                >
                  <TbPinnedFilled fontSize="24px" onClick={pin?.setPin} />
                </Box>
              )}
            </AnimatePresence>
          </Box>
        )}
        <Text color="gray.40" fontSize="md" fontWeight="700">
          {text}
        </Text>
      </HStack>
      <HStack columnGap="12px">
        {secure?.showPublic && (
          <Tag
            minWidth="75px"
            size="sm"
            variant={secure?.isPublic ? "lightOrange" : "darkOrange"}
            onClick={() => {
              if (!secure.isLoading) {
                secure?.setPublic();
              }
            }}
            columnGap="8px"
          >
            {secure?.isLoading ? (
              <Spinner boxSize={3} mx="auto" my="auto" />
            ) : (
              <>
                <Box
                  display="flex"
                  alignItems="center"
                  width="16px"
                  height="16px"
                >
                  {secure?.isPublic ? (
                    <TbEye fontSize="16px" />
                  ) : (
                    <TbEyeOff fontSize="16px" />
                  )}
                </Box>
                <TagLabel>{secure?.isPublic ? "Public" : "Private"}</TagLabel>
              </>
            )}
          </Tag>
        )}
        {connect?.showConnect &&
          (connect?.isConnect ? (
            <Tag minWidth="75px" size="sm" variant="green" columnGap="8px">
              <Box
                display="flex"
                alignItems="center"
                minW="16px"
                minHeight="16px"
              >
                <TbCircleCheckFilled fontSize="16px" />
              </Box>
              <TagLabel>Connected</TagLabel>
            </Tag>
          ) : (
            <Button
              leftIcon={connect.buttonIcon}
              className="connect_button__actionCard"
              onClick={connect?.handleClick}
              size="sm"
              variant="outline"
              borderRadius="17px"
            >
              {connect?.buttonText}
            </Button>
          ))}
      </HStack>
    </HStack>
  );
};
