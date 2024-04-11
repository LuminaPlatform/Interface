import {
  Alert,
  AlertIcon,
  Box,
  Button,
  HStack,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { ConnectModal } from "./modals/Connect";
import { TbBell, TbSearch } from "react-icons/tb";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Alert
        mb="20px"
        display="flex"
        borderRadius="16px"
        status="warning"
        bg="orange.100"
      >
        <AlertIcon color="orange.400" />
        <Text fontSize="xs">
          Kindly note: The application is currently in development, and some
          functionalities may not be operational. We appreciate your
          understanding.
        </Text>
      </Alert>
      <HStack
        fontFamily="satoshi"
        justifyContent={{ base: "flex-start", md: "flex-end" }}
        columnGap="24px"
        width="full"
      >
        <InputGroup
          display={{ base: "none", md: "inline-block" }}
          width="311px"
          height="40ox"
        >
          <InputLeftElement>
            <TbSearch size={24} color="var(--chakra-colors-gray-100)" />
          </InputLeftElement>
          <Input
            px="16px"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            bg="gray.600"
            border="1px solid"
            borderColor="gray.200"
            _hover={{
              borderColor: "gray.300",
            }}
            _active={{ borderColor: "gray.400" }}
            _focus={{ borderColor: "gray.400" }}
            boxShadow="none !important"
            outline="none"
            fontFamily="satoshi"
            fontSize="md"
            color="gray.100"
            fontWeight="regular"
            _placeholder={{
              fontWeight: "regular",
              color: "gray.100",
            }}
            borderRadius="27px"
            placeholder="Search"
          />
        </InputGroup>
        <Box
          cursor="pointer"
          onClick={() => {
            console.log("clicked on notif");
          }}
          position="relative"
        >
          {false && (
            <Text
              textAlign="center"
              fontSize="10px"
              fontWeight="bold"
              margin="0px !important"
              padding="0px"
              lineHeight="16px"
              rounded="full"
              minHeight="16px"
              minWidth="16px"
              bg="red.300"
              color="gray.0"
              position="absolute"
              right="-5px"
              top="-5px"
            >
              1
            </Text>
          )}
          <TbBell size={24} color="var(--chakra-colors-gray-0)" />
        </Box>
        <HStack cursor="pointer" columnGap="8px">
          {true ? (
            <Button
              onClick={onOpen}
              borderRadius="8px"
              height="40px"
              px="28px"
              variant="primary"
            >
              Connect
            </Button>
          ) : (
            <>
              <Img
                rounded="full"
                width="32px"
                height="32px"
                border="1px solid"
                borderColor="gray.0"
                src="/assets/images/default-img.png"
                alt="user"
              />
              <Text color="gray.10" fontSize="md" fontWeight="200">
                Anonyms
              </Text>
            </>
          )}
        </HStack>
      </HStack>
      <ConnectModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Navbar;
