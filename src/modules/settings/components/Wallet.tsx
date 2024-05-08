import { textTruncator } from "@/utils";
import {
  Box,
  Button,
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import {
  TbEye,
  TbEyeOff,
  TbInfoCircleFilled,
  TbPin,
  TbPinnedFilled,
  TbPlus,
} from "react-icons/tb";

const walletData = [
  {
    id: 0,
    wallet: "0x4a5dbc1F68F0E415c20b174cf09D1b4E1539CBD9",
    status: "pr" as WalletItemProps["status"],
  },
  {
    id: 1,
    wallet: "0x4a5dbc1F68F0E415c20b174cf09D1b4E1539CBD9",
    status: "pr" as WalletItemProps["status"],
  },
  {
    id: 2,
    wallet: "0x4a5dbc1F68F0E415c20b174cf09D1b4E1539CBD9",
    status: "pu" as WalletItemProps["status"],
  },
  {
    id: 3,
    wallet: "0x4a5dbc1F68F0E415c20b174cf09D1b4E1539CBD9",
    status: "pr" as WalletItemProps["status"],
  },
];
interface WalletItemProps {
  pinnedWalletId: number;
  wallet: string;
  status: "pu" | "pr";
  id: number;
  setPinnedWalletId: Dispatch<SetStateAction<number>>;
}
const WalletItem = ({
  pinnedWalletId,
  status,
  wallet,
  id,
  setPinnedWalletId,
}: WalletItemProps) => {
  const [isPublic, setPublic] = useState(() =>
    status === "pr" ? false : true
  );
  const [isHover, setHover] = useState(false);

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
            {(isHover || pinnedWalletId === id) && (
              <Box
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                as={motion.div}
              >
                <TbPinnedFilled
                  fontSize="24px"
                  onClick={() => {
                    setPinnedWalletId(id);
                  }}
                />
              </Box>
            )}
          </AnimatePresence>
        </Box>
        <Text fontSize="md" fontWeight="700">
          {textTruncator(wallet)}
        </Text>
      </HStack>
      <Tag
        minWidth="75px"
        size="sm"
        variant={isPublic ? "lightOrange" : "darkOrange"}
        onClick={() => {
          setPublic((prev) => !prev);
        }}
        columnGap="8px"
      >
        <Box display="flex" alignItems="center" width="16px" height="16px">
          {isPublic ? <TbEye fontSize="16px" /> : <TbEyeOff fontSize="16px" />}
        </Box>
        <TagLabel>{isPublic ? "Public" : "Private"}</TagLabel>
      </Tag>
    </HStack>
  );
};

export const Wallet = () => {
  const [pinnedWalletId, setPinnedWalletId] = useState(1);

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
          onClick={() => {}}
        >
          Add Wallet
        </Button>
      </HStack>
      <VStack width="full" rowGap="16px">
        {walletData.map((item) => (
          <WalletItem
            setPinnedWalletId={setPinnedWalletId}
            key={item.id}
            id={item.id}
            pinnedWalletId={pinnedWalletId}
            status={item.status}
            wallet={item.wallet}
          />
        ))}
      </VStack>
    </VStack>
  );
};
