import { AvatarText } from "@/components/AvatarText";
import {
  Button,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { TbSearch, TbUserCheck, TbUserPlus } from "react-icons/tb";

const UserFollowBox = ({ item }) => {
  const [isFollowed, setFollowed] = useState(false);
  return (
    <HStack px="24px" py="12px" width="full" justifyContent="space-between">
      <AvatarText
        badgeSize="18px"
        src="/assets/images/default-img.png"
        textStyle={{ fontSize: "md", fontWeight: "500", color: "gray.0" }}
        name={item}
        hasBadge
        imageStyle={{ width: "64px", height: "64px" }}
      />
      {isFollowed ? (
        <Button
          size="sm"
          leftIcon={<TbUserCheck />}
          background="gray.40"
          color="gray.500"
          onClick={() => {
            setFollowed(false);
          }}
        >
          Following
        </Button>
      ) : (
        <Button
          size="sm"
          onClick={() => {
            setFollowed(true);
          }}
          leftIcon={<TbUserPlus />}
          variant="primary"
        >
          Follow
        </Button>
      )}
    </HStack>
  );
};

const users = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
export const UsersModal = () => {
  const [search, setSearch] = useState("");
  const filteredUsers = useMemo(
    () => users.filter((item) => item.includes(search)),
    [search]
  );
  return (
    <>
      <InputGroup position="relative" mb="16px" width="full" >
        <InputLeftElement position='absolute' top="50%" transform='translateY(-50%)' >
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
          height="30px"
          placeholder="Search"
        />
      </InputGroup>
      <VStack
        maxHeight="632px"
        overflow="auto"
        borderRadius="10px"
        divider={<Divider borderColor="gray.600" opacity="0.5" />}
        bg="gray.700"
      >
        {filteredUsers.map((item) => (
          <UserFollowBox item={item} key={item} />
        ))}
      </VStack>
    </>
  );
};
