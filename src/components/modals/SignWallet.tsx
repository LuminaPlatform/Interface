import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import {
  useCustomToast,
  useDispatchModalSteps,
  useWalletModal,
} from "@/hooks/bases";
import { STEP_MODAL, WalletModalBodyProps } from "@/types";
import { Button, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { motion } from "framer-motion";

interface SignWalletProps extends WalletModalBodyProps {}

import { useEffect, useState } from "react";

import { useAccount, useDisconnect, useSignMessage } from "wagmi";

export const SignWallet = ({}: SignWalletProps) => {
  const dispatchSteps = useDispatchModalSteps();

  const { data: signMessageData, signMessage } = useSignMessage();

  const { onClose } = useWalletModal();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  const [signMessageApi, setSignMessageApi] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isConnected && !signMessageData) {
      console.log("render");
    }
  }, []);

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
        .post(apiKeys.auth.login.wallet, {
          wallet: address,
          signature: signMessageData,
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
      {isLoading ? (
        <Spinner color="primary.300" />
      ) : (
        <>
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
                setIsLoading(true);
                axiosClient
                  .get(`${apiKeys.getSignMessage}/${address}`)
                  .then((response) => {
                    setSignMessageApi(response.data);
                  })
                  .then(() => {
                    signMessage({
                      message: signMessageApi,
                      account: address,
                    });
                  })
                  .then(() => {
                    console.log({ signMessageData });
                  })
                  .finally(() => setIsLoading(false));
              }}
              flex={1}
              variant="primary"
            >
              Sign
            </Button>
          </HStack>
        </>
      )}
    </VStack>
  );
};
