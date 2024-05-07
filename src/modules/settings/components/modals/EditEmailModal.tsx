import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  UseDisclosureProps,
  VStack,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { SettingsModalsForm } from "../../types";
import { TbMail } from "react-icons/tb";
import { InputError } from "@/components/InputError";
import { SettingsModalFooter } from "../EmailFooter";

interface EditEmailModalProps extends UseDisclosureProps {}
export const EditEmailModal = ({ onClose }: EditEmailModalProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<SettingsModalsForm>();
  return (
    <VStack rowGap="16px" width="full">
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
                message: "Email is a required field",
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid Email",
              },
            })}
          />
        </InputGroup>
        {!!errors.email && <InputError errorMessage={errors.email.message} />}
      </FormControl>
      <SettingsModalFooter
        cancelHandler={onClose}
        isDisabled={!!errors.email}
        mainButtonText="Submit Email"
        submitHandler={handleSubmit((values) => {
          console.log({ values });
        })}
      />
    </VStack>
  );
};
