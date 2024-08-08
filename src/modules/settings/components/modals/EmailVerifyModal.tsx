import {
  chakra,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  UseDisclosureProps,
  VStack
} from "@chakra-ui/react";
import { TbMail } from "react-icons/tb";
import { useFormContext } from "react-hook-form";
import { InputError } from "@/components/InputError";
import { Dispatch, SetStateAction, useState } from "react";
import { SettingsModalBody, SettingsModalsForm } from "../../types";
import { SettingsModalFooter } from "../EmailFooter";

interface EmailVerifyModalProps extends UseDisclosureProps {
  setModalBody: Dispatch<SetStateAction<SettingsModalBody>>;
}

const ChakraForm = chakra("form");
export const EmailVerifyModal = ({
  onClose
  // setModalBody,
}: EmailVerifyModalProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useFormContext<SettingsModalsForm>();

  const [isLoading] = useState(false);

  return (
    <ChakraForm rowGap="16px" as={VStack} width="full">
      <FormControl pb="32px">
        <FormLabel color="gray.60" fontSize="xs" fontWeight="500">
          Email *
        </FormLabel>
        <InputGroup>
          <InputLeftElement top="50%" transform="translateY(-50%)">
            <TbMail size={24} color="var(--chakra-colors-gray-100)" />
          </InputLeftElement>
          <Input
            type="email"
            variant="outline"
            height="52px"
            borderRadius="12px"
            placeholder="Example@gmail.com"
            {...register("email", {
              required: {
                value: true,
                message: "Email is a required field"
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid Email"
              }
            })}
          />
        </InputGroup>
        {!!errors.email && <InputError errorMessage={errors.email.message} />}
      </FormControl>
      <SettingsModalFooter
        isLoading={isLoading}
        cancelHandler={onClose}
        isDisabled={!!errors.email}
        mainButtonText="Submit Email"
        submitHandler={handleSubmit(() => {
          // setModalBody(SettingsModalBody.emailOTP);
        })}
      />
    </ChakraForm>
  );
};
