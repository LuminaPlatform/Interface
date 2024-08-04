import { Avatar } from "@/components/AvatarText";
import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { TbBrandX } from "react-icons/tb";

export const ImportedReviewBoxContent = () => {
  return (
    <>
      <HStack width="full">
        <HStack columnGap="8px" width="full">
          <Avatar
            hasBadge={false}
            imageStyle={{
              boxSize: "36px",
            }}
            badgeSize={0}
            src="/assets/images/default-avatar.png"
          />
          <Text fontSize="md" fontWeight="700" color="gray.40">
            X NickName
          </Text>
        </HStack>
        <TbBrandX color="var(--chakra-colors-gray-20)" fontSize="24px" />
      </HStack>
      <Box>
        <Text fontSize="lg" color="gray.40" lineHeight="28.8px">
          Lorem ipsum dolor sit amet consectetur. At quis viverra sit urna odio
          consectetur elementum nunc viverra. Aliquet tellus risus sed elit
          aliquet venenatis ut.
        </Text>
      </Box>
    </>
  );
};

interface ImportedReviewBoxProps {
  isChild: boolean;
}
export const ImportedReviewBox = ({}: // isChild
ImportedReviewBoxProps) => {
  return (
    <VStack rowGap="16px">
      <VStack
        bg="gray.600"
        border="0.5px solid"
        borderColor="rgba(255,255,255,0.2)"
        rowGap="12px"
        width="full"
        p="14px 16px"
        borderRadius="12px"
      >
        <ImportedReviewBoxContent />
      </VStack>
      <HStack width="full" justifyContent="flex-end">
        <Button variant="outline">Cancel</Button>
        <Button variant="primary">Confirm</Button>
      </HStack>
    </VStack>
  );
};
