import { UseDisclosureProps, VStack } from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { SettingsModalBody, SettingsModalsForm } from "../../types";
import { OTP } from "@/components/modals/OTP";
import { useOTPVerification } from "@/hooks/auth";
import { useCustomToast } from "@/hooks/bases";

interface EmailOTPProps extends UseDisclosureProps {
  setModalBody: Dispatch<SetStateAction<SettingsModalBody>>;
}

export const EmailOTP = ({ onClose, setModalBody }: EmailOTPProps) => {
  const { control } = useFormContext<SettingsModalsForm>();
  const { email } = useWatch<SettingsModalsForm>({ control });
  const { mutate } = useOTPVerification();

  const toast = useCustomToast();

  return (
    <VStack rowGap="16px" width="full">
      <OTP
        handleClick={({ otp }) => {
          mutate(
            { code: otp.join(""), email },
            {
              onError: (error) => {
                return toast({
                  title: error.response.data.error_message,
                  description: error.response.data.error_detail,
                  status: "error",
                });
              },
              onSuccess: () => {
                setModalBody(undefined);
                onClose();
                return toast({
                  description: "You are logged in",
                  status: "success",
                });
              },
            }
          );
        }}
      />
    </VStack>
  );
};
