import { dataConnectors } from "@/constant";
import { STEP_MODAL, WalletModalBodyProps } from "@/types";
import { Icon, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { TbArrowNarrowLeft } from "react-icons/tb";
import { useConnect } from "wagmi";
import { IconButton } from "./Connect";
import { useDispatchModalSteps, useWalletModal } from "@/hooks/bases";

export const Connectors = ({}: WalletModalBodyProps) => {
  const { connectors, connect } = useConnect();
  const { onClose } = useWalletModal();
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
      mt="16px"
    >
      <Icon
        cursor="pointer"
        as={TbArrowNarrowLeft}
        color="gray.0"
        fontSize="24px"
        top="16px"
        position="absolute"
        left="16px"
        onClick={() => {
          dispatchSteps(STEP_MODAL.wallet);
        }}
      />
      {connectors.slice(0, connectors.length - 2)?.map((connector) => (
        <IconButton
          onClick={() => {
            if (onClose) {
              onClose();
            }
            connect({ connector });
          }}
          key={connector.uid}
          icon={
            connector.icon ||
            dataConnectors.find((data) => {
              return data.type === connector.type;
            })?.icon
          }
          text={connector.name}
        />
      ))}
    </VStack>
  );
};
