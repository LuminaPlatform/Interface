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
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { ModalForm, STEP_MODAL, WalletModalBodyProps } from "@/types";
import { Login } from "./Login";
import { MethodSeparator } from "../MethodSeparator";
import { Register } from "./Register";
import { AnimatePresence, motion } from "framer-motion";
import { Connectors } from "./Connectors";
import { OTP } from "./OTP";
import { FormProvider, useForm } from "react-hook-form";

interface IconButtonProps {
  onClick: () => void;
  icon?: IconType | string;
  text: string;
}

export const IconButton = ({ onClick, icon, text }: IconButtonProps) => {
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
        {icon &&
          (typeof icon === "string" ? (
            <Img width="30px" src={icon} />
          ) : (
            <Icon fontSize={21} color="gray.0" as={icon} />
          ))}
        <Text color="gray.40" fontSize="md" fontWeight="700">
          {text}
        </Text>
      </HStack>
      <FaArrowRightLong color="var(--chakra-colors-gray-0)" />
    </Button>
  );
};

interface ConnectProps {
  onClose: UseDisclosureProps["onClose"];
  isOpen: UseDisclosureProps["isOpen"];
}

const ModalBody = ({ setStep }: WalletModalBodyProps) => {
  return (
    <VStack
      as={motion.div}
      exit={{
        opacity: 0,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      padding="0"
      margin="0"
    >
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
        <IconButton
          text="Connect Wallet"
          onClick={() => {
            setStep(STEP_MODAL.connectors);
          }}
          icon={LuWallet}
        />
        <MethodSeparator />
        <IconButton
          text="Join by Email"
          onClick={() => {
            setStep(STEP_MODAL.login);
          }}
          icon={MdOutlineMailOutline}
        />
      </VStack>
    </VStack>
  );
};

export const ConnectModal = ({ onClose, isOpen }: ConnectProps) => {
  const methods = useForm<ModalForm>({
    mode: "all",
    reValidateMode: "onChange",
  });

  const [step, setStep] = useState<STEP_MODAL>(STEP_MODAL.wallet);
  const modalBody = useMemo(
    () => ({
      [STEP_MODAL.wallet]: <ModalBody setStep={setStep} />,
      [STEP_MODAL.login]: <Login setStep={setStep} />,
      [STEP_MODAL.register]: <Register setStep={setStep} />,
      [STEP_MODAL.connectors]: <Connectors setStep={setStep} />,
      [STEP_MODAL.otp]: <OTP setStep={setStep} />,
    }),
    []
  );
  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      modalBody={
        <AnimatePresence>
          <FormProvider {...methods}>{modalBody[step]}</FormProvider>
        </AnimatePresence>
      }
    />
  );
};
