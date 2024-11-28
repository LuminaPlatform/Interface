import { ModalBase } from "@/components/ModalBase";
import { Box, Center, Img, useDisclosure } from "@chakra-ui/react";
import { TbMaximize, TbTrash } from "react-icons/tb";

interface PreviewSelectedMediaProps {
  media: File;
  handleRemoveMedia: (media: File) => void;
}
export const PreviewSelectedMedia = ({
  media,
  handleRemoveMedia
}: PreviewSelectedMediaProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        transition=""
        _hover={{
          ".media_tools": {
            zIndex: 1,
            opacity: 1
          }
        }}
        position="relative"
        key={media.type + media.name + media.size}
      >
        <Center
          transition="all 0.3s"
          zIndex={-1}
          opacity={0}
          className="media_tools"
          borderRadius="8px"
          width="full"
          height="full"
          bg="#26262999"
          position="absolute"
          top="0"
          left="0"
          columnGap="16px"
        >
          <TbTrash
            cursor="pointer"
            color="var(--chakra-colors-gray-20)"
            size="24px"
            onClick={() => handleRemoveMedia(media)}
          />
          <TbMaximize
            cursor="pointer"
            onClick={onOpen}
            color="var(--chakra-colors-gray-20)"
            size="24px"
          />
        </Center>
        <Img
          margin={0}
          borderRadius="8px"
          minW="124px"
          minH="70px"
          w="124px"
          h="70px"
          objectFit="cover"
          src={URL.createObjectURL(media)}
        />
      </Box>
      <ModalBase
        isOpen={isOpen}
        onClose={onClose}
        modalBody={
          <Img width="full" height="full" src={URL.createObjectURL(media)} />
        }
      />
    </>
  );
};
