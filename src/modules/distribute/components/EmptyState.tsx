import { Button, Img, Text, VStack } from "@chakra-ui/react";
import { TbBookmarkPlus } from "react-icons/tb";

interface EmptyStateProps {
  onOpen: () => void;
}

export const EmptyState = ({ onOpen }: EmptyStateProps) => {
  return (
    <VStack rowGap="24px">
      <Img mt="24px" src="/assets/images/distribute/empty.png" />
      <Text textAlign="center" color="gray.50" fontWeight="600" fontSize="28px">
        Get Started with Voting
      </Text>
      <Text textAlign="center" color="gray.50" fontWeight="500" fontSize="lg">
        Ready to make your voice heard? Add projects below to cast your vote and
        shape our community!
      </Text>
      <Button
        leftIcon={<TbBookmarkPlus fontSize="20px" />}
        px="16px"
        variant="primary"
        size="md"
        onClick={onOpen}
      >
        Add Projects
      </Button>
    </VStack>
  );
};
