import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useBoolean,
  UseDisclosureProps,
  VStack,
} from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";
import { SettingsModalsForm } from "../../types";
import { TbEye, TbEyeOff, TbMail } from "react-icons/tb";
import { InputError } from "@/components/InputError";
import { SettingsModalFooter } from "../EmailFooter";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface SetPasswordModalProps extends UseDisclosureProps {
  setPassword: Dispatch<
    SetStateAction<{
      isSet: boolean;
    }>
  >;
}

export const SetPasswordModal = ({
  onClose,
  setPassword,
}: SetPasswordModalProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useFormContext<SettingsModalsForm>();

  const [isShow, setShow] = useBoolean(false);

  const { password } = useWatch({ control });
  const [isLoading, setLoading] = useState(false);

  return (
    <VStack rowGap="16px" width="full">
      <FormControl pb="32px">
        <FormLabel color="gray.60" fontSize="xs" fontWeight="500">
          Password *
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
          Repeat Password *
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
      <SettingsModalFooter
        isLoading={isLoading}
        cancelHandler={onClose}
        isDisabled={!!errors.password || !!errors.rePassword}
        mainButtonText="Submit Password"
        submitHandler={handleSubmit((values) => {
          setPassword({
            isSet: true,
          });
        })}
      />
    </VStack>
  );
};
