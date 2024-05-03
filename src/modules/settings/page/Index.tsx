import { Avatar } from "@/components/AvatarText";
import { Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { TbPencil } from "react-icons/tb";
import { UserInfoEditable } from "../components/UserInfoEditable";
import { useState } from "react";

export const Index = () => {
  const [isEditable, setEditable] = useState(false);
  return (
    <VStack width="full">
      <Text
        textAlign="left"
        width="full"
        color="gray.20"
        fontSize="2xl"
        fontWeight="600"
        fontFamily="lexend"
      >
        Account Setting
      </Text>
      <UserInfoEditable isEditable={isEditable} setEditable={setEditable} />
    </VStack>
  );
};
