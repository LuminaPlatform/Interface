import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import {
  useDispatchModalSteps,
  useGlobalUserData,
  useWalletModal,
} from "@/hooks/bases";
import { STEP_MODAL } from "@/types";
import { textTruncator } from "@/utils";
import {
  Box,
  Button,
  HStack,
  Spinner,
  Tag,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import {
  TbEye,
  TbEyeOff,
  TbInfoCircleFilled,
  TbPinnedFilled,
  TbPlus,
} from "react-icons/tb";

interface WalletItemProps {
  pinnedWalletId: number;
  wallet: any;
  setPinnedWalletId: Dispatch<SetStateAction<number>>;
}
const WalletItem = ({
  pinnedWalletId,
  setPinnedWalletId,
  wallet,
}: WalletItemProps) => {
  const [isPublic, setPublic] = useState(wallet.public);
  const [isHover, setHover] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleStatusChange = () => {
    setLoading(true);
    axiosClient
      .post(apiKeys.update, {
        0: {
          model_name: "Wallet",
          params: {
            public: !isPublic,
          },
          id: 1,
        },
      })
      .then(() => {
        setPublic((prev: boolean) => !prev);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <HStack
      px="12px"
      py="20px"
      as={motion.div}
      width="full"
      bg="gray.700"
      borderRadius="12px"
      justifyContent="space-between"
      _hover={{
        bg: "#00000040",
      }}
    >
      <HStack
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        color="gray.40"
        columnGap="12px"
      >
        <Box width="24px">
          <AnimatePresence>
            {(isHover || pinnedWalletId === wallet.id) && (
              <Box
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                as={motion.div}
              >
                <TbPinnedFilled
                  fontSize="24px"
                  onClick={() => {
                    setPinnedWalletId(wallet.id);
                  }}
                />
              </Box>
            )}
          </AnimatePresence>
        </Box>
        <Text fontSize="md" fontWeight="700">
          {textTruncator(wallet.address)}
        </Text>
      </HStack>
      <Tag
        minWidth="75px"
        size="sm"
        variant={isPublic ? "lightOrange" : "darkOrange"}
        onClick={() => {
          if (!isLoading) {
            handleStatusChange();
          }
        }}
        columnGap="8px"
      >
        {isLoading ? (
          <Spinner boxSize={3} mx="auto" my="auto" />
        ) : (
          <>
            <Box display="flex" alignItems="center" width="16px" height="16px">
              {isPublic ? (
                <TbEye fontSize="16px" />
              ) : (
                <TbEyeOff fontSize="16px" />
              )}
            </Box>
            <TagLabel>{isPublic ? "Public" : "Private"}</TagLabel>
          </>
        )}
      </Tag>
    </HStack>
  );
};

export const Wallet = () => {
  const [pinnedWalletId, setPinnedWalletId] = useState(undefined);
  const { wallet } = useGlobalUserData();
  const { onOpen } = useWalletModal();
  const dispatch = useDispatchModalSteps();

  return (
    <VStack zIndex={1} borderRadius="12px" width="full" p="24px" bg="gray.800">
      <HStack mb="24px" width="full" justifyContent="space-between">
        <HStack color="gray.40" width="full">
          <Text fontFamily="lexend" fontSize="xl" fontWeight="600">
            My Wallets
          </Text>
          <TbInfoCircleFilled fontSize="20px" />
        </HStack>
        <Button
          size="sm"
          borderRadius="17px"
          height="24px"
          leftIcon={<TbPlus />}
          variant="outline"
          onClick={() => {
            dispatch(STEP_MODAL.connectors);
            onOpen();
          }}
        >
          Add Wallet
        </Button>
      </HStack>
      <VStack width="full" rowGap="16px">
        {wallet.map((item: any) => (
          <WalletItem
            setPinnedWalletId={setPinnedWalletId}
            pinnedWalletId={pinnedWalletId}
            key={item.id}
            wallet={item}
          />
        ))}
      </VStack>
    </VStack>
  );
};
