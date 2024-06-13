import {
  Box,
  Button,
  chakra,
  FormControl,
  FormLabel,
  GridItem,
  Img,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import { WizardContentBase } from "./Base";
import { TbCameraPlus, TbRestore } from "react-icons/tb";
import { Dispatch, SetStateAction, useState } from "react";
import { InputError } from "../InputError";
import { SetupWizardForm } from "@/types";
import { fileLimitation } from "@/config/fileLimitation";

const ChakraForm = chakra("form");
interface ProfileProps {
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}
export const Profile = ({ editMode, setEditMode }: ProfileProps) => {
  const {
    register,
    formState: { errors },
    setValue,
    control,
  } = useFormContext<SetupWizardForm>();

  const { profile } = useWatch({ control });
  return (
    <WizardContentBase>
      <GridItem justifyContent="center" as={VStack} rowGap="16px">
        <VStack
          rowGap="16px"
          borderRadius="12px"
          padding="24px"
          bg="#262629CC"
          width="236px"
          height="174px"
        >
          <Img
            rounded="full"
            width="86px"
            height="86px"
            src={
              profile
                ? URL.createObjectURL(profile)
                : "/assets/images/default-img.png"
            }
          />
          <Text color="gray.20" fontSize="md">
            Your Nickname
          </Text>
        </VStack>
        <Input
          maxW="0"
          maxH="0"
          id="profile"
          type="file"
          visibility="hidden"
          {...register("profile")}
          onChange={(e) => {
            setValue("profile", e.target.files[0]);
          }}
        />
        <Box columnGap="10px" display="flex" width="236px">
          {editMode ? (
            <>
              <Box
                height="32px"
                borderRadius="6px"
                borderColor="primary.50"
                border="1px solid"
                color="primary.50"
                justifyContent="center"
                alignItems="center"
                width="full"
                px="12px"
                display="flex"
                _hover={{
                  borderColor: "primary.300",
                  color: "primary.300",
                }}
              >
                <TbCameraPlus />
                <FormLabel
                  my="auto"
                  mx="auto"
                  fontSize="xs"
                  fontWeight="700"
                  htmlFor="profile"
                  width="full"
                  textAlign="center"
                >
                  Edit Photo
                </FormLabel>
              </Box>
              <Button
                width="full"
                size="sm"
                leftIcon={<TbRestore />}
                variant="outline"
                onClick={() => {
                  setEditMode(true);
                }}
              >
                Reset Photo
              </Button>
            </>
          ) : (
            <Button
              width="full"
              size="sm"
              leftIcon={<TbCameraPlus />}
              variant="outline"
              onClick={() => {
                setEditMode(true);
              }}
            >
              Edit Photo
            </Button>
          )}
        </Box>
      </GridItem>
      <GridItem as={VStack} rowGap="16px">
        <VStack>
          <Text
            mr="auto"
            color="gray.0"
            fontFamily="lexend"
            fontSize="xl"
            fontWeight="600"
          >
            Profile Information
          </Text>
          <Text fontSize="md" color="gray.0">
            Set up your profile by choosing a username and nickname. You can
            also upload a profile picture to personalize your profile.
          </Text>
        </VStack>
        <ChakraForm
          justifyContent="flex-start"
          width="full"
          as={VStack}
          rowGap="24px"
        >
          <FormControl isInvalid={!!errors.username} rowGap="8px">
            <FormLabel variant="primary" size="sm">
              Username *
            </FormLabel>
            <Input
              variant="outline"
              placeholder="username"
              {...register("username", {
                required: {
                  value: true,
                  message: "Username is a required field",
                },
              })}
            />
            {!!errors.username && (
              <InputError errorMessage={errors.username.message} />
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.nickname} rowGap="8px">
            <FormLabel variant="primary" size="sm">
              Nickname *
            </FormLabel>
            <Input
              variant="outline"
              placeholder="Enter your nickname (e.g., LuminaFan)"
              {...register("nickname", {
                required: {
                  value: true,
                  message: "Nickname is a required field",
                },
              })}
            />
            {!!errors.nickname && (
              <InputError errorMessage={errors.nickname.message} />
            )}
            <Text fontSize="xs" color="gray.60">
              Your nickname will be displayed to others on Lumina
            </Text>
          </FormControl>
        </ChakraForm>
      </GridItem>
    </WizardContentBase>
  );
};
