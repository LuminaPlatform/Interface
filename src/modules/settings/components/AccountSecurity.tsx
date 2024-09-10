import { ActionCard } from "@/components/ActionCard";
import { ModalBase } from "@/components/ModalBase";
import { Stack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { TbBrandX, TbLock, TbMail, TbPencil } from "react-icons/tb";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatchGlobalUserData, useGlobalUserData } from "@/hooks/bases";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";
import { getCookie } from "cookies-next";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constant";
import { handleStorageChange, handleTwitterLogin } from "@/utils";
import { EmailVerifyModal } from "./modals/EmailVerifyModal";
import { SettingsModalBody, SettingsModalsForm } from "../types";
import { EmailOTP } from "./modals/EmailOTPModal";
import { EditEmailModal } from "./modals/EditEmailModal";
import { SetPasswordModal } from "./modals/SetPasswordModal";
import { ChangePasswordModal } from "./modals/ChangePasswordModal";
import { PasswordOTPModal } from "./modals/PasswordOTPModal";
import { SettingsModalsHeader } from "./SettingsModalHeader";

type modalsBodyType = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  [key in SettingsModalBody]: { component: ReactNode; header: string };
};

export const AccountSecurity = () => {
  const userInfo = useGlobalUserData();
  const dispatchGlobalUser = useDispatchGlobalUserData();

  useEffect(() => {
    window.addEventListener("storage", () =>
      handleStorageChange(dispatchGlobalUser, userInfo)
    );

    return () => {
      window.removeEventListener("storage", () =>
        handleStorageChange(dispatchGlobalUser, userInfo)
      );
    };
  }, []);

  const methods = useForm<SettingsModalsForm>({
    mode: "all",
    reValidateMode: "onChange"
  });

  // TODO should fix this type
  const handleSetPublic = (dispatch: any) => {
    dispatch((prev: any) => ({ ...prev, isPublic: !prev.isPublic }));
  };

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [modalBody, setModalBody] = useState<SettingsModalBody | undefined>(
    undefined
  );

  const [email, setEmail] = useState({
    // TODO should give the status enum from back
    isVerified: userInfo?.user?.status === "ACTIVE",
    isPublic: !!userInfo?.user?.email_public,
    isLoading: false
  });
  const [twitter, setTwitter] = useState({
    isConnect: userInfo?.user?.x_username,
    isLoading: false
  });
  const [password, setPassword] = useState({
    isSet: !!userInfo?.user?.password
  });
  useEffect(() => {
    if (userInfo?.user?.x_username) {
      axiosClient
        .post(
          apiKeys.update,
          {
            "0": {
              model_name: "User",
              params: {
                x_username: userInfo.twitter?.data?.username
              },
              id: userInfo?.user?.id
            }
          },
          {
            headers: {
              Authorization: `Bearer ${getCookie(ACCESS_TOKEN_COOKIE_KEY)}`
            }
          }
        )
        .then(() => {
          setTwitter((prev) => ({
            ...prev,
            isConnect: userInfo?.user?.x_username,
            isLoading: false
          }));
        });
    }
  }, [userInfo.user.x_username]);

  const modals = useMemo<modalsBodyType>(() => {
    return {
      [SettingsModalBody.emailVerify]: {
        component: (
          <EmailVerifyModal onClose={onClose} setModalBody={setModalBody} />
        ),
        header: "Verify Your Email"
      },
      [SettingsModalBody.emailOTP]: {
        component: <EmailOTP onClose={onClose} setModalBody={setModalBody} />,
        header: "Verify Your Email"
      },
      [SettingsModalBody.changeEmail]: {
        component: <EditEmailModal onClose={onClose} />,
        header: "Edit Your Email"
      },
      [SettingsModalBody.changePassword]: {
        component: (
          <ChangePasswordModal onClose={onClose} setModalBody={setModalBody} />
        ),
        header: "Change Your Password"
      },
      [SettingsModalBody.setPassword]: {
        component: (
          <SetPasswordModal setPassword={setPassword} onClose={onClose} />
        ),
        header: "Set a Password"
      },
      [SettingsModalBody.passwordOTP]: {
        component: (
          <PasswordOTPModal onClose={onClose} setModalBody={setModalBody} />
        ),
        header: "Reset Password"
      }
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
            text="Connect to X"
            connect={{
              showConnect: true,
              isConnect: false,
              buttonText: twitter.isConnect ? "Edit" : "Connect",
              handleClick: () => {
                setTwitter((prev) => ({ ...prev, isLoading: true }));
                handleTwitterLogin();
              },
              ...(twitter.isConnect && {
                buttonIcon: <TbPencil fontSize="14px" />
              })
            }}
          />

          <ActionCard
            logo={TbMail}
            text={email.isVerified ? "Change Your Email" : "Verify Your Email"}
            secure={{
              isLoading: email.isLoading,
              isPublic: email.isPublic,
              setPublic: () => {
                setEmail((prev) => ({ ...prev, isLoading: true }));
                axiosClient
                  .post(
                    apiKeys.update,
                    {
                      "0": {
                        model_name: "User",
                        params: {
                          email_public: !email.isPublic
                        },
                        id: userInfo.user.id
                      }
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${getCookie(ACCESS_TOKEN_COOKIE_KEY)}`
                      }
                    }
                  )
                  .then(() => {
                    handleSetPublic(setEmail);
                  })
                  .finally(() =>
                    setEmail((prev) => ({ ...prev, isLoading: false }))
                  );
              },
              showPublic: email.isVerified
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
                buttonIcon: <TbPencil fontSize="14px" />
              })
            }}
          />
          <ActionCard
            logo={TbLock}
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
                buttonIcon: <TbPencil fontSize="14px" />
              })
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
