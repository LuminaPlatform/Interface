import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  UseDisclosureProps,
  VStack,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
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
  } = useFormContext<settingsFormType>();

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
          {...register("username", {
            required: {
              value: true,
              message: "Username is a required field",
            },
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
          {...register("nickname", {
            required: {
              value: true,
              message: "Nickname is a required field",
            },
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
          isDisabled={!!errors.nickname || !!errors.username}
          onClick={handleSubmit((values) => {
            console.log({ values });
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
