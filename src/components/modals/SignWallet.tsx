import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constant";
import {
  useCustomToast,
  useDispatchAuthorization,
  useDispatchModalSteps,
  useGlobalUserData,
  useWalletModal
} from "@/hooks/bases";
import { STEP_MODAL } from "@/types";
import { Button, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { getCookie, setCookie } from "cookies-next";
import { motion } from "framer-motion";

import { useEffect, useState } from "react";

import { useAccount, useDisconnect, useSignMessage } from "wagmi";

export const SignWallet = () => {
  const dispatchSteps = useDispatchModalSteps();
  const globalUser = useGlobalUserData();
  const { data: signMessageData, signMessage } = useSignMessage();

  const { onClose } = useWalletModal();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  const dispatchAuthorization = useDispatchAuthorization();

  const [isLoading, setIsLoading] = useState(false);

  const connectedWallet = globalUser?.wallet?.find(
    (wallet: any) => wallet?.address === address
  );

  useEffect(() => {
    if (!!signMessageData || connectedWallet?.last_verified_signature) {
      onClose();
      dispatchSteps(STEP_MODAL.wallet);
    }
  }, [signMessageData, connectedWallet]);

  const toast = useCustomToast();

  useEffect(() => {
    if (signMessageData) {
      axiosClient
        .post(apiKeys.auth.login.wallet, {
          wallet: address,
          signature: signMessageData
        })
        .then((res) => {
          const accessToken = res.data.access_token;
          setCookie(ACCESS_TOKEN_COOKIE_KEY, accessToken);
          return axiosClient.get(apiKeys.auth.isAuthorized, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
        })
        .then(async (res) => {
          const userBaseInfo = res.data;

          await axiosClient
            .post(
              apiKeys.create,
              {
                "0": {
                  model_name: "Wallet",
                  params: {
                    address,
                    last_verified_signature: signMessageData
                  },
                  id: userBaseInfo?.id
                }
              },
              {
                headers: {
                  Authorization: `Bearer ${getCookie(ACCESS_TOKEN_COOKIE_KEY)}`
                }
              }
            )
            .then(() => {
              dispatchAuthorization(userBaseInfo);
            });
        })
        .catch((error: AxiosError<{ error_message: string }>) => {
          return toast({
            status: "error",
            description: error.response.data.error_message
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [signMessageData]);

  return (
    <VStack
      as={motion.div}
      exit={{
        opacity: 0
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
                    return response.data;
                  })
                  .then((msg: string) => {
                    signMessage({
                      message: msg,
                      account: address
                    });
                  });
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
