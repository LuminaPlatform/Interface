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
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import {
  ModalForm,
  OTPFormType,
  OTPProps,
  STEP_MODAL,
  WalletModalBodyProps,
} from "@/types";
import { Login } from "./Login";
import { MethodSeparator } from "../MethodSeparator";
import { Register } from "./Register";
import { AnimatePresence, motion } from "framer-motion";
import { Connectors } from "./Connectors";
import { OTP } from "./OTP";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import {
  useCustomToast,
  useDispatchAuthorization,
  useDispatchModalSteps,
  useModalSteps,
  useWalletModal,
} from "@/hooks/bases";
import { useEmailLogin, useOTPVerification } from "@/hooks/auth";
import { SetupWizard } from "./SetupWizard";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constant";
import { setCookie } from "cookies-next";
import { SignWallet } from "./SignWallet";
import { useAccount, useSignMessage } from "wagmi";
import { VerifiedAccount } from "@/modules/settings/components/modals/VerifiedAccount";

interface OTPContainerProps extends WalletModalBodyProps {}
const OTPContainer = ({}: OTPContainerProps) => {
  const dispatchSteps = useDispatchModalSteps();

  const { getValues } = useFormContext<ModalForm>();
  const toast = useCustomToast();

  const { mutate } = useOTPVerification();
  const { mutate: mutateLogin } = useEmailLogin();

  const email = getValues("email");
  const password = getValues("password");

  const { onClose } = useWalletModal();

  console.log({ email });

  const dispatchAuthorization = useDispatchAuthorization();
  return (
    <OTP
      handleClick={({ otp }: OTPFormType) => {
        mutate(
          { code: otp.join(""), email },
          {
            onError: (error) => {
              return toast({
                title: error.response.data.error_message,
                description: error.response.data.error_detail,
                status: "error",
              });
            },
            onSuccess: () => {
              dispatchSteps(STEP_MODAL.verified);
              mutateLogin(
                { username: email, password },
                {
                  onSuccess: (loginData) => {
                    setCookie(
                      ACCESS_TOKEN_COOKIE_KEY,
                      loginData.data.access_token
                    );
                    dispatchAuthorization(true);
                    return toast({
                      description: "You are logged in",
                      status: "success",
                    });
                  },
                }
              );
            },
          }
        );
      }}
      backIconHandler={() => dispatchSteps(STEP_MODAL.register)}
    />
  );
};
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

const ModalBody = ({}: WalletModalBodyProps) => {
  const dispatchSteps = useDispatchModalSteps();
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
            dispatchSteps(STEP_MODAL.connectors);
          }}
          icon={LuWallet}
        />
        <MethodSeparator />
        <IconButton
          text="Join by Email"
          onClick={() => {
            dispatchSteps(STEP_MODAL.login);
          }}
          icon={MdOutlineMailOutline}
        />
      </VStack>
    </VStack>
  );
};

export const ConnectModal = ({ onClose, isOpen }: ConnectProps) => {
  const { onOpen } = useWalletModal();
  const methods = useForm<ModalForm>({
    mode: "all",
    reValidateMode: "onChange",
  });

  const step = useModalSteps();
  const dispatchSteps = useDispatchModalSteps();

  const { isConnected } = useAccount();
  const { data: signMessageData } = useSignMessage();

  useEffect(() => {
    if (isConnected && !signMessageData) {
      dispatchSteps(STEP_MODAL.sign);
      onOpen();
    }
  }, [isConnected, signMessageData]);

  console.log({ isConnected });

  const modalBody = useMemo(
    () => ({
      [STEP_MODAL.wallet]: <ModalBody />,
      [STEP_MODAL.login]: <Login />,
      [STEP_MODAL.register]: <Register />,
      [STEP_MODAL.connectors]: <Connectors />,
      [STEP_MODAL.otp]: <OTPContainer />,
      [STEP_MODAL.setupWizard]: <SetupWizard />,
      [STEP_MODAL.sign]: <SignWallet />,
      [STEP_MODAL.verified]: <VerifiedAccount />,
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
      {...((STEP_MODAL.setupWizard === step ||
        STEP_MODAL.sign === step ||
        STEP_MODAL.verified === step) && {
        closeOnEsc: false,
        showCloseButton: false,

        ...(STEP_MODAL.setupWizard === step && {
          size: { base: "lg", md: "2xl", lg: "3xl" },
        }),
      })}
    />
  );
};
