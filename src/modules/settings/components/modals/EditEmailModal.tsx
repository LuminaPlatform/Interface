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
import { useState } from "react";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";
import {
  useCustomToast,
  useDispatchGlobalUserData,
  useGlobalUserData,
} from "@/hooks/bases";
import { AxiosError } from "axios";

interface EditEmailModalProps extends UseDisclosureProps {}
export const EditEmailModal = ({ onClose }: EditEmailModalProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<SettingsModalsForm>();
  const [isLoading, setLoading] = useState(false);
  const { wallet } = useGlobalUserData();

  const dispatchGlobalUser = useDispatchGlobalUserData();
  const toast = useCustomToast();
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
        isLoading={isLoading}
        cancelHandler={onClose}
        isDisabled={!!errors.email}
        mainButtonText="Submit Email"
        submitHandler={handleSubmit((values) => {
          setLoading(true);
          axiosClient
            .post(apiKeys.update, {
              "0": {
                model_name: "User",
                params: {
                  email: values.email,
                },
                id: 1,
              },
            })
            .then((response) => {
              dispatchGlobalUser({ user: response.data[0], wallet });
              onClose();
              return toast({
                status: "success",
                description: `Your email is updated`,
              });
            })
            .catch((errors: AxiosError<{ error_message: string }>) => {
              return toast({
                status: "error",
                description: errors.response.data?.error_message,
              });
            })
            .finally(() => {
              setLoading(false);
            });
        })}
      />
    </VStack>
  );
};
