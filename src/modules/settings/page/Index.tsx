import { chakra, Text, VStack } from "@chakra-ui/react";
import { UserInfoEditable } from "../components/UserInfoEditable";
import { useState } from "react";
import { useGlobalUserData } from "@/hooks/bases";
import { FormProvider, useForm } from "react-hook-form";
import { Wallet } from "../components/Wallet";
import { AccountSecurity } from "../components/AccountSecurity";
import { Interests } from "../components/Interests";
import { settingsFormType } from "../types";

const ChakraForm = chakra("form");
export const Index = () => {
  const [isEditable, setEditable] = useState(false);

  const { user } = useGlobalUserData();

  // TODO should add default value
  const { ...methods } = useForm<settingsFormType>({
    mode: "onChange",
    defaultValues: {
      profile: user.profile_picture,
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
