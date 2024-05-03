import { Avatar } from "@/components/AvatarText";
import { Box, Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { TbCameraPlus, TbEdit, TbPencil } from "react-icons/tb";

type UserInfoEditableProps = {
  isEditable: boolean;
  setEditable: Dispatch<SetStateAction<boolean>>;
};


export const UserInfoEditable = ({
  isEditable,
  setEditable,
}: UserInfoEditableProps) => {
  const handleSave = () => {
    console.log("saveProfile");
  };


  const {}=useForm<>()

  return (
    <Stack
      flexDirection={{ base: "column", md: "row" }}
      width="full"
      columnGap="24px"
      padding={{ base: "12px", md: "24px" }}
      alignItems={{ base: "center", md: "stretch" }}
      justifyContent={{ md: "space-between" }}
    >
      <HStack>
        <Box position="relative" width="fit-content" height="fit-content">
          <Avatar
            badgeSize="48px"
            src="/assets/images/default-img.png"
            hasBadge={false}
            imageStyle={{
              width: { base: "80px", md: "124px" },
              height: { base: "80px", md: "124px" },
            }}
          />
          {isEditable && (
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
              <TbCameraPlus color='var(--chakra-colors-gray-0)' fontSize='37px' />
            </Box>
          )}
        </Box>
        <VStack rowGap="8px" alignItems="flex-start">
          <Text
            color="gray.10"
            fontSize="xl"
            fontWeight="600"
            fontFamily="lexend"
          >
            Nickname
          </Text>
          <Text color="gray.60" fontSize="lg" fontWeight="500">
            Username
          </Text>
        </VStack>
      </HStack>
      <Button
        size="sm"
        borderRadius="17px"
        height="24px"
        leftIcon={isEditable ? <TbEdit fontSize='14px' /> : <TbPencil fontSize='14px' />}
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
  );
};
