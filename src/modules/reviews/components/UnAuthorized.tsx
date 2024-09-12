import { useWalletModal } from "@/hooks/bases";
import { Button, Img, Text, VStack } from "@chakra-ui/react";

export const UnAuthorized = () => {
  const { onOpen } = useWalletModal();
  return (
    <VStack width="full" rowGap="24px">
      <Img src="/assets/images/reviews/unauhorized.png" />
      <Text color="gray.50" textAlign="center" fontSize="28px" fontWeight="600">
        Connect to Discover Followed Reviews
      </Text>
      <Text
        lineHeight="28.8px"
        color="gray.50"
        textAlign="center"
        fontSize="lg"
        fontWeight="500"
      >
        Oops! It seems you&apos;re not logged in. To access reviews from users
        you follow, simply log in to your account. Discover insights and
        opinions from your trusted network, tailored to your interests and
        preferences. Ready to explore? Log in now to unlock a personalized feed
        of reviews from the people you follow!
      </Text>
      <Button onClick={onOpen} size="md" variant="primary">
        Connect Now
      </Button>
    </VStack>
  );
};
