import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import {
  useCustomToast,
  useDispatchGlobalUserData,
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
import { AxiosError } from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  TbEye,
  TbEyeOff,
  TbInfoCircleFilled,
  TbPinnedFilled,
  TbPlus,
} from "react-icons/tb";

interface WalletItemProps {
  wallet: any;
}
const WalletItem = ({ wallet }: WalletItemProps) => {
  const [isPublic, setPublic] = useState(wallet.public);

  const [isHover, setHover] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [pinLoading, setPinLoading] = useState(false);

  const globalUser = useGlobalUserData();
  const dispatchGlobalUser = useDispatchGlobalUserData();

  const toast = useCustomToast();

  const isPinned = useMemo(() => {
    return globalUser.pinnedWalletId === wallet.id;
  }, [globalUser.pinnedWalletId]);

  const handleStatusChange = () => {
    setLoading(true);
    axiosClient
      .post(apiKeys.update, {
        0: {
          model_name: "Wallet",
          params: {
            public: !isPublic,
          },
          id: globalUser?.user?.id,
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
            {(isHover || isPinned) && (
              <Box
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                as={motion.div}
              >
                {pinLoading ? (
                  <Spinner size="xs" color="primary.300" />
                ) : (
                  <TbPinnedFilled
                    fontSize="24px"
                    onClick={() => {
                      setPinLoading(true);
                      axiosClient
                        .post(apiKeys.update, {
                          "0": {
                            model_name: "User",
                            params: {
                              pined_wallet_id: isPinned ? null : wallet?.id,
                            },
                            id: globalUser?.user?.id,
                          },
                        })
                        .then(() => {
                          dispatchGlobalUser({
                            ...globalUser,
                            pinnedWalletId: isPinned ? null : wallet?.id,
                          });
                        })
                        .catch(
                          (error: AxiosError<{ error_message: string }>) => {
                            toast({
                              status: "error",
                              description: error.response.data.error_message,
                            });
                          }
                        )
                        .finally(() => {
                          setPinLoading(false);
                        });
                    }}
                  />
                )}
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
  const globalUser = useGlobalUserData();
  const wallet = globalUser?.wallet;

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
          <WalletItem key={item.id} wallet={item} />
        ))}
      </VStack>
    </VStack>
  );
};
