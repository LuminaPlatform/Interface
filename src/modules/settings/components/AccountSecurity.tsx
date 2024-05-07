import { ActionCard } from "@/components/ActionCard";
import { ModalBase } from "@/components/ModalBase";
import {
  Box,
  HStack,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { TbBrandX, TbLock, TbMail, TbPencil } from "react-icons/tb";
import { EmailVerifyModal } from "./modals/EmailVerifyModal";
import { SettingsModalBody, SettingsModalsForm } from "../types";
import { EmailOTP } from "./modals/EmailOTPModal";
import { FormProvider, useForm } from "react-hook-form";
import { EditEmailModal } from "./modals/EditEmailModal";
import { SetPasswordModal } from "./modals/SetPasswordModal";
import { ChangePasswordModal } from "./modals/ChangePasswordModal";
import { PasswordOTPModal } from "./modals/PasswordOTPModal";
import { SettingsModalsHeader } from "./SettingsModalHeader";



type modalsBodyType = {
  [key in SettingsModalBody]: { component: JSX.Element; header: string };
};

export const AccountSecurity = () => {
  const methods = useForm<SettingsModalsForm>({
    mode: "all",
    reValidateMode: "onChange",
  });

  const handleSetPublic = (dispatch) => {
    dispatch((prev) => ({ ...prev, isSecure: !prev.isSecure }));
  };

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [modalBody, setModalBody] = useState<SettingsModalBody | undefined>(
    undefined
  );

  const [email, setEmail] = useState({
    isVerified: true,
    isSecure: false,
  });
  const [twitter, setTwitter] = useState({
    isConnect: true,
    isSecure: false,
  });
  const [password, setPassword] = useState({
    isSet: false,
  });

  const modals = useMemo<modalsBodyType>(() => {
    return {
      [SettingsModalBody.emailVerify]: {
        component: (
          <EmailVerifyModal onClose={onClose} setModalBody={setModalBody} />
        ),
        header: "Verify Your Email",
      },
      [SettingsModalBody.emailOTP]: {
        component: <EmailOTP onClose={onClose} setModalBody={setModalBody} />,
        header: "Verify Your Email",
      },
      [SettingsModalBody.changeEmail]: {
        component: <EditEmailModal onClose={onClose} />,
        header: "Edit Your Email",
      },
      [SettingsModalBody.changePassword]: {
        component: (
          <ChangePasswordModal onClose={onClose} setModalBody={setModalBody} />
        ),
        header: "Change Your Password",
      },
      [SettingsModalBody.setPassword]: {
        component: <SetPasswordModal setPassword={setPassword} onClose={onClose} />,
        header: "Set a Password",
      },
      [SettingsModalBody.passwordOTP]: {
        component: (
          <PasswordOTPModal onClose={onClose} setModalBody={setModalBody} />
        ),
        header: "Reset Password",
      },
    };
  }, []);

  const handleOpenModal = (modalType: SettingsModalBody) => {
    setModalBody(modalType);
    onOpen();
  };

  return (
    <FormProvider {...methods}>
      <VStack
        zIndex={1}
        borderRadius="12px"
        width="full"
        p="24px"
        bg="gray.800"
      >
        <Text
          mb="24px"
          width="full"
          textAlign="left"
          color="gray.40"
          fontFamily="lexend"
          fontSize="xl"
          fontWeight="600"
        >
          Account & Security
        </Text>
        <Stack width="full" rowGap="16px">
          <ActionCard
            logo={TbBrandX}
            actionCardId={0}
            text="Connect to X"
            secure={{
              isPublic: !twitter.isSecure,
              setPublic: () => handleSetPublic(setTwitter),
              showPublic: twitter.isConnect,
            }}
            connect={{
              showConnect: true,
              isConnect: false,
              buttonText: twitter.isConnect ? "Edit" : "Connect",
              handleClick: () => {},
              ...(twitter.isConnect && {
                buttonIcon: <TbPencil fontSize="14px" />,
              }),
            }}
          />

          <ActionCard
            logo={TbMail}
            actionCardId={1}
            text="Verify Your Email"
            secure={{
              isPublic: !email.isSecure,
              setPublic: () => handleSetPublic(setEmail),
              showPublic: email.isVerified,
            }}
            connect={{
              showConnect: true,
              isConnect: false,
              buttonText: email.isVerified ? "Change" : "Verify",
              handleClick: () => {
                if (!email.isVerified) {
                  handleOpenModal(SettingsModalBody.emailVerify);
                } else {
                  handleOpenModal(SettingsModalBody.changeEmail);
                }
              },
              ...(email.isVerified && {
                buttonIcon: <TbPencil fontSize="14px" />,
              }),
            }}
          />
          <ActionCard
            logo={TbLock}
            actionCardId={3}
            text="Change Your Password"
            connect={{
              showConnect: true,
              isConnect: false,
              buttonText: password.isSet ? "Change" : "Set Pass",
              handleClick: () => {
                if (!password.isSet) {
                  handleOpenModal(SettingsModalBody.setPassword);
                } else {
                  handleOpenModal(SettingsModalBody.changePassword);
                }
              },
              ...(password.isSet && {
                buttonIcon: <TbPencil fontSize="14px" />,
              }),
            }}
          />
        </Stack>
      </VStack>
      {typeof modals[modalBody] !== "undefined" && (
        <ModalBase
          modalHeader={<SettingsModalsHeader text={modals[modalBody].header} />}
          isOpen={isOpen}
          modalBody={modals[modalBody].component}
          onClose={onClose}
        />
      )}
    </FormProvider>
  );
};
