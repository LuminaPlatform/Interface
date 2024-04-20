import { useWalletModal } from "@/hooks/bases";
import { Button, Img, Text, VStack } from "@chakra-ui/react";

export const UnAuthorized = () => {
  const { onOpen } = useWalletModal();
  return (
    <VStack rowGap="24px">
      <Img mt="24px" src="/assets/images/distribute/unauthorized.png" />
      <Text textAlign='center' color="gray.50" fontWeight="600" fontSize="28px">
        Connect to Access Voting
      </Text>
      <Text textAlign="center" color="gray.50" fontWeight="500" fontSize="lg">
        Oops! It looks like you&apos;re not logged in yet. To participate in
        voting, simply log in to your account. Once logged in, you&apos;ll have
        the option to cast your vote on relevant topics and contribute to our
        community. Ready to make your voice heard? Log in now and let your voice
        count!
      </Text>
      <Button
        px="16px"
        variant="primary"
        size="md"
        onClick={onOpen}
      >
        Connect Now
      </Button>
    </VStack>
  );
};
