import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import {
  useCustomToast,
  useDispatchModalSteps,
  useWalletModal,
} from "@/hooks/bases";
import { STEP_MODAL, WalletModalBodyProps } from "@/types";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { motion } from "framer-motion";

interface SignWalletProps extends WalletModalBodyProps {}

import { useEffect } from "react";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";

export const SignWallet = ({}: SignWalletProps) => {
  const dispatchSteps = useDispatchModalSteps();

  const { data: signMessageData, signMessage, submittedAt } = useSignMessage();

  const { onClose } = useWalletModal();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (!!signMessageData) {
      onClose();
      dispatchSteps(STEP_MODAL.wallet);
    }
  }, [signMessageData]);

  const toast = useCustomToast();

  useEffect(() => {
    if (signMessageData) {
      axiosClient
        .post(apiKeys.auth.wallet.add, {
          wallet: address,
          signature: signMessageData,
          timestamp: submittedAt,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error: AxiosError<{ error_message: string }>) => {
          return toast({
            status: "error",
            description: error.response.data.error_message,
          });
        });
    }
  }, [signMessageData]);

  return (
    <VStack
      as={motion.div}
      exit={{
        opacity: 0,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      display="flex"
      flexDirection="column"
      width="full"
      rowGap="16px"
      px="14px"
      position="relative"
      overflow="hidden"
    >
      <Text fontSize="xl" fontFamily="lexend" color="gray.0">
        Sign your wallet
      </Text>
      <HStack width="full">
        <Button
          onClick={() => {
            onClose();
            dispatchSteps(STEP_MODAL.wallet);
            if (isConnected && !signMessageData) {
              disconnect();
            }
          }}
          variant="outline"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            signMessage({
              message: "there is a message to sign",
              account: address,
            });
          }}
          flex={1}
          variant="primary"
        >
          Sign
        </Button>
      </HStack>
    </VStack>
  );
};
