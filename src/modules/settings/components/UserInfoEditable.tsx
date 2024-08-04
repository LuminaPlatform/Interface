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
import { Dispatch, SetStateAction } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { TbCameraPlus, TbEdit, TbPencil } from "react-icons/tb";
import { settingsFormType } from "../types";
import { ModalBase } from "@/components/ModalBase";
import { UserInfoModal, UserInfoModalHeader } from "./UserInfoModal";
import { useGlobalUserData } from "@/hooks/bases";

type UserInfoEditableProps = {
  isEditable: boolean;
  setEditable: Dispatch<SetStateAction<boolean>>;
};

export const UserInfoEditable = ({
  isEditable,
  setEditable,
}: UserInfoEditableProps) => {
  const handleSave = () => {};

  const { register, setValue, control } = useFormContext<settingsFormType>();
  const { profile } = useWatch<settingsFormType>({ control });

  const { isOpen, onClose, onOpen } = useDisclosure();

  const userInfo = useGlobalUserData();

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
                  typeof profile !== "string" && profile !== null
                    ? profile && URL.createObjectURL(profile)
                    : "/assets/images/default-avatar.png"
                }
                hasBadge={false}
                imageStyle={{
                  width: { base: "80px", md: "124px" },
                  height: { base: "80px", md: "124px" },
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
              handleSave();
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
