import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  UseDisclosureProps,
  VStack
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";
import {
  useCustomToast,
  useDispatchGlobalUserData,
  useGlobalUserData
} from "@/hooks/bases";
import { useState } from "react";
import { getCookie } from "cookies-next";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constant";
import { settingsFormType } from "../types";

type UserInfoModalProps = {
  onClose: UseDisclosureProps["onClose"];
};
export const UserInfoModalHeader = () => {
  return (
    <Text
      width="full"
      textAlign="center"
      color="gray.0"
      fontSize="xl"
      fontWeight="600"
      fontFamily="lexend"
    >
      Edit Profile
    </Text>
  );
};
export const UserInfoModal = ({ onClose }: UserInfoModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useFormContext<settingsFormType>();

  const [isLoading, setLoading] = useState(false);

  const globalUser = useGlobalUserData();
  const dispatchGlobalUser = useDispatchGlobalUserData();

  const toast = useCustomToast();

  return (
    <VStack mx="auto" maxWidth="371px" rowGap="8px" width="full">
      <FormControl
        width="full"
        alignItems="flex-start"
        as={VStack}
        rowGap="8px"
        pb="16px"
      >
        <FormLabel color="gray.40" fontSize="xs" fontWeight="500">
          Username *
        </FormLabel>
        <Input
          placeholder="Username"
          variant="outline"
          defaultValue={globalUser?.user?.username}
          {...register("username", {
            required: {
              value: true,
              message: "Username is a required field"
            }
          })}
        />
        {!!errors.username && (
          <Text fontSize="xs" color="red.200">
            {errors.username.message}
          </Text>
        )}
      </FormControl>
      <FormControl
        width="full"
        alignItems="flex-start"
        as={VStack}
        rowGap="8px"
        pb="16px"
      >
        <FormLabel color="gray.40" fontSize="xs" fontWeight="500">
          Nickname *
        </FormLabel>
        <Input
          placeholder="Nickname"
          variant="outline"
          defaultValue={globalUser?.user?.display_name}
          {...register("nickname", {
            required: {
              value: true,
              message: "Nickname is a required field"
            }
          })}
        />
        <Text fontSize="xs" color="gray.60" fontWeight="500">
          Your nickname will be displayed to others on Lumina
        </Text>
        {!!errors.nickname && (
          <Text fontSize="xs" color="red.200">
            {errors.nickname.message}
          </Text>
        )}
      </FormControl>
      <HStack columnGap="16px" width="full">
        <Button
          onClick={onClose}
          width="fit-content"
          size="md"
          variant="outline"
        >
          Cancel
        </Button>
        <Button
          isDisabled={isLoading}
          isLoading={isLoading}
          onClick={handleSubmit((values) => {
            setLoading(true);
            axiosClient
              .post(
                apiKeys.update,
                {
                  "0": {
                    model_name: "User",
                    params: {
                      username: values.username,
                      display_name: values.nickname
                    },
                    id: globalUser?.user?.id
                  }
                },
                {
                  headers: {
                    Authorization: `Bearer ${getCookie(ACCESS_TOKEN_COOKIE_KEY)}`
                  }
                }
              )
              .then((response) => {
                dispatchGlobalUser({
                  ...globalUser,
                  user: response.data[0],
                  wallet: globalUser.wallet
                });
                return toast({
                  status: "success",
                  description: "Your information is updated"
                });
              })
              .catch(() => {
                toast({
                  status: "error",
                  // TODO should fix error message
                  description: "error occurred"
                });
              })
              .finally(() => {
                reset();
                setLoading(false);
                onClose();
              });
          })}
          width="full"
          size="md"
          variant="primary"
        >
          Save Changes
        </Button>
      </HStack>
    </VStack>
  );
};
