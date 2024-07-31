import { Avatar } from "@/components/AvatarText";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import { TbCameraPlus, TbEdit, TbPencil } from "react-icons/tb";
import { settingsFormType } from "../types";
import { ModalBase } from "@/components/ModalBase";
import { UserInfoModal, UserInfoModalHeader } from "./UserInfoModal";
import { fileLimitation } from "@/config/fileLimitation";
import {
  useCustomToast,
  useDispatchGlobalUserData,
  useGlobalUserData,
} from "@/hooks/bases";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";
import { AxiosError } from "axios";

type UserInfoEditableProps = {
  isEditable: boolean;
  setEditable: Dispatch<SetStateAction<boolean>>;
  profileImageId: number;
};

export const UserInfoEditable = ({
  isEditable,
  setEditable,
  profileImageId,
}: UserInfoEditableProps) => {
  const userInfo = useGlobalUserData();

  const toast = useCustomToast();

  const {
    formState: { errors },
    register,
    setValue,
    control,
    resetField,
  } = useFormContext<settingsFormType>();
  const dispatchUserInfo = useDispatchGlobalUserData();

  const handleSave = async (file: File, setAvatar) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "proposal",
      JSON.stringify({
        model: "User",
        id: userInfo.user.id,
        field: "profile_id",
      })
    );
    axiosClient
      .post(apiKeys.file, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        toast({
          status: "success",
          description: "Your avatar is updated",
        });
        setAvatar(res.data.id);
        dispatchUserInfo({
          ...userInfo,
          user: {
            ...userInfo.user,
            profile_id: res.data.id,
          },
        });
        resetField("profile");
      })
      .catch((error: AxiosError<{ error_message: string }>) => {
        toast({
          status: "error",
          description: error.response.data.error_message,
        });
      });
  };

  const { profile } = useWatch<settingsFormType>({ control });
  const [avatarImage, setAvatarImage] = useState(profileImageId);

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Stack
        borderRadius="12px"
        zIndex={1}
        bg="gray.800"
        flexDirection={{ base: "column", md: "row" }}
        width="full"
        columnGap="24px"
        padding={{ base: "12px", md: "24px" }}
        alignItems={{ base: "center", md: "stretch" }}
        justifyContent={{ md: "space-between" }}
      >
        <HStack>
          <Box position="relative">
            <FormControl
              width={{ base: "80px", md: "124px" }}
              height={{ base: "80px", md: "124px" }}
            >
              <Avatar
                badgeSize="48px"
                src={
                  profile !== null
                    ? profile && URL.createObjectURL(profile)
                    : avatarImage
                      ? `${process.env.NEXT_PUBLIC_BASE_FILE_URL}/${avatarImage}`
                      : "/assets/images/default-avatar.png"
                }
                hasBadge={false}
                imageStyle={{
                  width: { base: "80px", md: "124px" },
                  height: { base: "80px", md: "124px" },
                  objectFit: "contain",
                }}
              />
              {isEditable && (
                <>
                  <FormLabel margin="0" padding={0} htmlFor="profile">
                    <Box
                      display="flex"
                      alignItems="center"
                      position="absolute"
                      top="0"
                      justifyContent="center"
                      width="full"
                      height="full"
                      bg="#26262999"
                      rounded="full"
                    >
                      <TbCameraPlus
                        color="var(--chakra-colors-gray-0)"
                        fontSize="37px"
                      />
                    </Box>
                  </FormLabel>
                  <Input
                    maxW="0"
                    maxH="0"
                    id="profile"
                    type="file"
                    visibility="hidden"
                    {...register("profile", {
                      // validate: fileLimitation,
                    })}
                    onChange={(e) => {
                      setValue("profile", e.target.files[0]);
                    }}
                  />
                </>
              )}
            </FormControl>
          </Box>
          <VStack rowGap="8px" alignItems="flex-start">
            <HStack columnGap="8px">
              <Text
                color="gray.10"
                fontSize="xl"
                fontWeight="600"
                fontFamily="lexend"
              >
                {userInfo.user.display_name}
              </Text>
              {isEditable && (
                <TbEdit
                  onClick={onOpen}
                  fontSize="20px"
                  color="var(--chakra-colors-gray-10)"
                />
              )}
            </HStack>
            <Text color="gray.60" fontSize="lg" fontWeight="500">
              {userInfo.user.username}
            </Text>
          </VStack>
        </HStack>
        <Button
          size="sm"
          borderRadius="17px"
          height="24px"
          leftIcon={
            isEditable ? (
              <TbEdit fontSize="14px" />
            ) : (
              <TbPencil fontSize="14px" />
            )
          }
          variant="outline"
          onClick={() => {
            if (isEditable) {
              if (!!profile) {
                handleSave(profile, setAvatarImage);
              }
              setEditable(false);
            } else {
              setEditable(true);
            }
          }}
        >
          {isEditable ? "Save Profile" : "Edit Profile"}
        </Button>
      </Stack>
      <ModalBase
        size="xl"
        isOpen={isOpen}
        modalBody={<UserInfoModal onClose={onClose} />}
        modalHeader={<UserInfoModalHeader />}
        onClose={onClose}
      />
    </>
  );
};
