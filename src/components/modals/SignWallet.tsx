import { useDispatchModalSteps, useWalletModal } from "@/hooks/bases";
import { STEP_MODAL, WalletModalBodyProps } from "@/types";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface SignWalletProps extends WalletModalBodyProps {}

import { useEffect, useRef } from "react";
import { recoverMessageAddress } from "viem";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";

export const SignWallet = ({}: SignWalletProps) => {
  const dispatchSteps = useDispatchModalSteps();

  const recoveredAddress = useRef<string>();
  const {
    data: signMessageData,
    error,
    signMessage,
    variables,
  } = useSignMessage();

  const { onClose } = useWalletModal();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    (async () => {
      if (variables?.message && signMessageData) {
        const recoveredAddress = await recoverMessageAddress({
          message: variables?.message,
          signature: signMessageData,
        });
      }
    })();
  }, [signMessageData, variables?.message]);
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
            if (!!signMessageData) {
              onClose();
              dispatchSteps(STEP_MODAL.wallet);
            }
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
