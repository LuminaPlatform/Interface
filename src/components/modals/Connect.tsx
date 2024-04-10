import {
  Button,
  Divider,
  HStack,
  Icon,
  Img,
  Text,
  UseDisclosureProps,
  VStack,
} from "@chakra-ui/react";
import { ModalBase } from "../ModalBase";
import { LuWallet } from "react-icons/lu";
import { IconType } from "react-icons";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";

interface IconButtonProps {
  onClick: () => void;
  icon: IconType;
  text: string;
}

const IconButton = ({ onClick, icon, text }: IconButtonProps) => {
  return (
    <Button
      bg="gray.700"
      _hover={{
        bg: "gray.800",
      }}
      _active={{
        bg: "gray.900",
      }}
      height="48px"
      px="12px"
      width="full"
      justifyContent="space-between"
      onClick={onClick}
      display="flex"
    >
      <HStack>
        <Icon fontSize={21} color="gray.0" as={icon} />
        <Text color="gray.40" fontSize="md" fontWeight="700">
          {text}
        </Text>
      </HStack>
      <FaArrowRightLong color="var(--chakra-colors-gray-0)" />
    </Button>
  );
};

interface ConnectProps {
  onClose: () => void;
  isOpen: boolean;
}
const ModalBody = () => {
  return (
    <VStack padding="0" margin="0">
      <Img src="/assets/images/logo.png" />
      <Text
        fontFamily="lexend"
        fontWeight="600"
        fontSize="xl"
        color="gray.0"
        marginTop="10px"
        lineHeight="30px"
      >
        Connect to join
      </Text>
      <VStack width="full" rowGap="16px" py="24px">
        <IconButton text="Connect Wallet" onClick={() => {}} icon={LuWallet} />
        <HStack width="full">
          <Divider width="full" borderColor="gray.700" />
          <Text color="gray.60" fontSize="lg" fontWeight="500">
            or
          </Text>
          <Divider width="full" borderColor="gray.700" />
        </HStack>
        <IconButton
          text="Join by Email"
          onClick={() => {}}
          icon={MdOutlineMailOutline}
        />
      </VStack>
    </VStack>
  );
};

export const ConnectModal = ({ onClose, isOpen }: ConnectProps) => {
  return (
    <ModalBase isOpen={isOpen} onClose={onClose} modalBody={<ModalBody />} />
  );
};
