import {
  Box,
  HStack,
  Icon,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa";

const Navbar = () => {
  const [search, setSearch] = useState("");
  return (
    <HStack
      fontFamily="satoshi"
      justifyContent={{base:'flex-start',md:"center"}}
      columnGap="24px"
      width="full"
    >
      <InputGroup
        display={{ base: "none", md: "inline-block" }}
        width="311px"
        height="40ox"
      >
        <InputLeftElement>
          <CiSearch size={24} color="var(--chakra-colors-gray-100)" />
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
        <FaRegBell size={24} color="var(--chakra-colors-gray-0)" />
      </Box>
      <HStack cursor="pointer" columnGap="8px">
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
      </HStack>
    </HStack>
  );
};

export default Navbar;