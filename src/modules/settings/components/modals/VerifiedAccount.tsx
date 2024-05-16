import { useDispatchModalSteps, useWalletModal } from "@/hooks/bases";
import { STEP_MODAL } from "@/types";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

export const VerifiedAccount = () => {
  const dispatchSteps = useDispatchModalSteps();
  const { onClose } = useWalletModal();
  return (
    <VStack rowGap="8px" width="full">
      <Image
        src="/assets/images/verifiedAccount/verified_account.png"
        alt="verified account"
        width={150}
        height={150}
        placeholder="blur"
        blurDataURL="/assets/images/verifiedAccount/verified_account.png"
      />
      <Text fontFamily="lexend" fontSize="xl" fontWeight="600" color="gray.0">
        Your Account is Verified!
      </Text>
      <Text
        textAlign="center"
        maxW="362px"
        color="gray.40"
        fontSize="xl"
        lineHeight="base"
      >
        Welcome to Lumina! Your account is now verified. Let&apos;s enhance your
        profile to personalize your experience.
      </Text>
      <HStack columnGap={4} mt={4}>
        <Button
          onClick={() => {
            onClose();
          }}
          variant="outline"
          size="md"
        >
          Skip for now
        </Button>
        <Button
          onClick={() => {
            dispatchSteps(STEP_MODAL.setupWizard);
          }}
          variant="primary"
          size="md"
        >
          Get Started
        </Button>
      </HStack>
    </VStack>
  );
};
