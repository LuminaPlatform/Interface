import { Avatar } from "@/components/AvatarText";
import { Button, chakra, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { TbPencil } from "react-icons/tb";
import { UserInfoEditable } from "../components/UserInfoEditable";
import { useEffect, useState } from "react";
import { useAuthorization } from "@/hooks/bases";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { Wallet } from "../components/Wallet";
import { AccountSecurity } from "../components/AccountSecurity";
import { Interests } from "../components/Interests";
import { settingsFormType } from "../types";

const ChakraForm = chakra("form");
export const Index = () => {
  const [isEditable, setEditable] = useState(false);
  const isAuthenticate = useAuthorization();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticate) router.replace("/404");
  }, [isAuthenticate]);

  // TODO should add default value
  const { ...methods } = useForm<settingsFormType>({
    mode: "onChange",
    defaultValues: {
      profile: null,
    },
  });

  return (
    <FormProvider {...methods}>
      <ChakraForm>
        <VStack rowGap="16px" width="full">
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
          <Wallet />
          <AccountSecurity />
          <Interests />
        </VStack>
      </ChakraForm>
    </FormProvider>
  );
};
