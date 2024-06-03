import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useBoolean,
  UseDisclosureProps,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";
import { SettingsModalBody, SettingsModalsForm } from "../../types";
import { TbEye, TbEyeOff, TbMail } from "react-icons/tb";
import { InputError } from "@/components/InputError";
import { SettingsModalFooter } from "../EmailFooter";
import { Dispatch, SetStateAction, useState } from "react";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";
import { useGlobalUserData } from "@/hooks/bases";
import { AxiosError } from "axios";

interface ChangePasswordModalProps extends UseDisclosureProps {
  setModalBody: Dispatch<SetStateAction<SettingsModalBody>>;
}

export const ChangePasswordModal = ({
  onClose,
  setModalBody,
}: ChangePasswordModalProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useFormContext<SettingsModalsForm>();

  const [isLoading, setLoading] = useState(false);
  const [isShow, setShow] = useBoolean(false);

  const userInfo = useGlobalUserData();

  const { password } = useWatch({ control });
  const toast = useToast();
  const handleChangePassword = (values) => {
    setLoading(true);
    axiosClient
      .post(apiKeys.update, {
        "0": {
          model_name: "User",
          params: {
            password: values.password,
          },
          id: userInfo?.user.id,
        },
      })
      .then(() => {
        return toast({
          status: "success",
          description: "Your password is changed.",
        });
      })
      .catch((error: AxiosError<{ error_message: string }>) => {
        console.log({ error });

        return toast({
          status: "error",
          description: error.response.data?.error_message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <VStack rowGap="16px" width="full">
      <FormControl pb="32px">
        <FormLabel color="gray.60" fontSize="xs" fontWeight="500">
          Current Password *
        </FormLabel>
        <InputGroup>
          <InputRightElement top="50%" transform="translateY(-50%)">
            {isShow ? (
              <TbEye
                onClick={() => {
                  setShow.off();
                }}
                size={24}
                color="var(--chakra-colors-gray-100)"
              />
            ) : (
              <TbEyeOff
                onClick={() => {
                  setShow.on();
                }}
                size={24}
                color="var(--chakra-colors-gray-100)"
              />
            )}
          </InputRightElement>
          <Input
            type={isShow ? "text" : "password"}
            variant="outline"
            height="52px"
            borderRadius="12px"
            placeholder="Enter your current password"
            {...register("currentPassword", {
              required: {
                value: true,
                message: "Current password is a required field",
              },
              minLength: {
                value: 8,
                message: "Current password must contain at least 8 characters",
              },
            })}
          />
        </InputGroup>
        {!!errors.currentPassword && (
          <InputError errorMessage={errors.currentPassword.message} />
        )}
      </FormControl>
      <FormControl pb="32px">
        <FormLabel color="gray.60" fontSize="xs" fontWeight="500">
          New Password *
        </FormLabel>
        <InputGroup>
          <InputRightElement top="50%" transform="translateY(-50%)">
            {isShow ? (
              <TbEye
                onClick={() => {
                  setShow.off();
                }}
                size={24}
                color="var(--chakra-colors-gray-100)"
              />
            ) : (
              <TbEyeOff
                onClick={() => {
                  setShow.on();
                }}
                size={24}
                color="var(--chakra-colors-gray-100)"
              />
            )}
          </InputRightElement>
          <Input
            type={isShow ? "text" : "password"}
            variant="outline"
            height="52px"
            borderRadius="12px"
            placeholder="Enter your password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is a required field",
              },
              minLength: {
                value: 8,
                message: "Password must contain at least 8 characters",
              },
            })}
          />
        </InputGroup>
        {!!errors.password && (
          <InputError errorMessage={errors.password.message} />
        )}
      </FormControl>
      <FormControl pb="32px">
        <FormLabel color="gray.60" fontSize="xs" fontWeight="500">
          Repeat New Password *
        </FormLabel>
        <InputGroup>
          <InputRightElement top="50%" transform="translateY(-50%)">
            {isShow ? (
              <TbEye
                onClick={() => {
                  setShow.off();
                }}
                size={24}
                color="var(--chakra-colors-gray-100)"
              />
            ) : (
              <TbEyeOff
                onClick={() => {
                  setShow.on();
                }}
                size={24}
                color="var(--chakra-colors-gray-100)"
              />
            )}
          </InputRightElement>
          <Input
            type={isShow ? "text" : "password"}
            variant="outline"
            height="52px"
            borderRadius="12px"
            placeholder="Enter your password"
            {...register("rePassword", {
              required: {
                value: true,
                message: "Password is a required field",
              },
              minLength: {
                value: 8,
                message: "Password must contain at least 8 characters",
              },
              validate: (value) => {
                if (value !== password) {
                  return "Your password must match with its confirmation ";
                }
              },
            })}
          />
        </InputGroup>
        {!!errors.rePassword && (
          <InputError errorMessage={errors.rePassword.message} />
        )}
      </FormControl>
      <HStack width="full">
        <Text color="gray.0" fontSize="md">
          Forgot your password?
        </Text>
        <Button
          onClick={() => setModalBody(SettingsModalBody.passwordOTP)}
          size="sm"
          fontSize="md"
          fontWeight="700"
          variant="ghost"
        >
          Reset Password
        </Button>
      </HStack>
      <SettingsModalFooter
        cancelHandler={onClose}
        isLoading={isLoading}
        isDisabled={
          !!errors.password ||
          !!errors.rePassword ||
          !!errors.currentPassword ||
          isLoading
        }
        mainButtonText="Submit Password"
        submitHandler={handleSubmit((values) => {
          handleChangePassword(values);
        })}
      />
    </VStack>
  );
};
